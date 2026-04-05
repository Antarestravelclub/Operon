//+------------------------------------------------------------------+
//|  OperonTrader v7 — Professional Edition                          |
//|  EMA Crossover + RSI + ATR Stops + Trail + Session Filter        |
//+------------------------------------------------------------------+
#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>

//--- Inputs
input double Lots          = 0.01;   // Lot size
input int    MaxTrades     = 1;      // Max open trades per symbol
input int    Magic         = 202507; // Magic number
input int    FastEMA       = 9;      // Fast EMA period
input int    SlowEMA       = 21;     // Slow EMA period
input int    RSIPeriod     = 14;     // RSI period
input double RSIBuyMax     = 65;     // RSI max for buy signal
input double RSISellMin    = 35;     // RSI min for sell signal
input double ATRMult_SL    = 1.5;    // ATR multiplier for stop loss
input double ATRMult_TP    = 3.0;    // ATR multiplier for take profit
input double TrailATR      = 1.0;    // ATR multiplier for trail
input bool   UseSession    = true;   // Filter by trading session
input int    SessionStart  = 8;      // Session start hour (server time)
input int    SessionEnd    = 20;     // Session end hour (server time)

//--- Globals
CTrade trade;
int    hFast, hSlow, hRSI, hATR;

//+------------------------------------------------------------------+
int OnInit()
{
   trade.SetExpertMagicNumber(Magic);
   trade.SetDeviationInPoints(30);

   hFast = iMA(_Symbol, PERIOD_M15, FastEMA, 0, MODE_EMA, PRICE_CLOSE);
   hSlow = iMA(_Symbol, PERIOD_M15, SlowEMA, 0, MODE_EMA, PRICE_CLOSE);
   hRSI  = iRSI(_Symbol, PERIOD_M15, RSIPeriod, PRICE_CLOSE);
   hATR  = iATR(_Symbol, PERIOD_M15, 14);

   if(hFast == INVALID_HANDLE || hSlow == INVALID_HANDLE ||
      hRSI  == INVALID_HANDLE || hATR  == INVALID_HANDLE)
   {
      Print("ERROR: Failed to create indicator handles");
      return INIT_FAILED;
   }

   Print("✅ OperonTrader v7 initialized on ", _Symbol);
   return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   IndicatorRelease(hFast);
   IndicatorRelease(hSlow);
   IndicatorRelease(hRSI);
   IndicatorRelease(hATR);
}

//+------------------------------------------------------------------+
bool InSession()
{
   if(!UseSession) return true;
   int hour = TimeHour(TimeCurrent());
   return (hour >= SessionStart && hour < SessionEnd);
}

//+------------------------------------------------------------------+
int MyTrades()
{
   int count = 0;
   for(int i = PositionsTotal()-1; i >= 0; i--)
      if(PositionGetSymbol(i) == _Symbol &&
         PositionGetInteger(POSITION_MAGIC) == Magic) count++;
   return count;
}

//+------------------------------------------------------------------+
void TrailStops()
{
   double atrBuf[1];
   if(CopyBuffer(hATR, 0, 0, 1, atrBuf) < 1) return;
   double atr = atrBuf[0];
   double trail = atr * TrailATR;

   for(int i = PositionsTotal()-1; i >= 0; i--)
   {
      if(PositionGetSymbol(i) != _Symbol) continue;
      if(PositionGetInteger(POSITION_MAGIC) != Magic) continue;

      ulong  ticket = PositionGetInteger(POSITION_TICKET);
      double sl     = PositionGetDouble(POSITION_SL);
      double tp     = PositionGetDouble(POSITION_TP);
      long   type   = PositionGetInteger(POSITION_TYPE);

      if(type == POSITION_TYPE_BUY)
      {
         double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
         double newSL = NormalizeDouble(bid - trail, _Digits);
         if(newSL > sl + _Point)
            trade.PositionModify(ticket, newSL, tp);
      }
      else if(type == POSITION_TYPE_SELL)
      {
         double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
         double newSL = NormalizeDouble(ask + trail, _Digits);
         if(newSL < sl - _Point || sl == 0)
            trade.PositionModify(ticket, newSL, tp);
      }
   }
}

//+------------------------------------------------------------------+
void OpenBuy(double atr)
{
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double sl  = NormalizeDouble(ask - atr * ATRMult_SL, _Digits);
   double tp  = NormalizeDouble(ask + atr * ATRMult_TP, _Digits);

   if(trade.Buy(Lots, _Symbol, ask, sl, tp, "OT7"))
      Print("✅ BUY opened | Price=", ask, " SL=", sl, " TP=", tp);
   else
      Print("❌ BUY failed: ", trade.ResultRetcodeDescription());
}

//+------------------------------------------------------------------+
void OpenSell(double atr)
{
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double sl  = NormalizeDouble(bid + atr * ATRMult_SL, _Digits);
   double tp  = NormalizeDouble(bid - atr * ATRMult_TP, _Digits);

   if(trade.Sell(Lots, _Symbol, bid, sl, tp, "OT7"))
      Print("✅ SELL opened | Price=", bid, " SL=", sl, " TP=", tp);
   else
      Print("❌ SELL failed: ", trade.ResultRetcodeDescription());
}

//+------------------------------------------------------------------+
void OnTick()
{
   // Trail existing positions on every tick
   if(MyTrades() > 0) TrailStops();

   // Only check for new signals on new bar
   static datetime lastBar = 0;
   datetime curBar = iTime(_Symbol, PERIOD_M15, 0);
   if(curBar == lastBar) return;
   lastBar = curBar;

   // Session filter
   if(!InSession()) return;

   // Max trades check
   if(MyTrades() >= MaxTrades) return;

   // Get indicator values
   double fB[3], sB[3], rB[1], aB[1];
   if(CopyBuffer(hFast, 0, 0, 3, fB) < 3) { Print("ERR: FastEMA"); return; }
   if(CopyBuffer(hSlow, 0, 0, 3, sB) < 3) { Print("ERR: SlowEMA"); return; }
   if(CopyBuffer(hRSI,  0, 0, 1, rB) < 1) { Print("ERR: RSI");     return; }
   if(CopyBuffer(hATR,  0, 0, 1, aB) < 1) { Print("ERR: ATR");     return; }

   double fastCur  = fB[0], fastPrev = fB[1];
   double slowCur  = sB[0], slowPrev = sB[1];
   double rsi      = rB[0];
   double atr      = aB[0];

   // Skip if ATR too low (low volatility — bad spreads)
   double minATR = SymbolInfoDouble(_Symbol, SYMBOL_POINT) * 50;
   if(atr < minATR) return;

   // BUY: fast crosses above slow + RSI not overbought
   bool buySignal  = (fastPrev < slowPrev && fastCur > slowCur && rsi < RSIBuyMax);

   // SELL: fast crosses below slow + RSI not oversold
   bool sellSignal = (fastPrev > slowPrev && fastCur < slowCur && rsi > RSISellMin);

   if(buySignal)
   {
      Print(">>> BUY SIGNAL | RSI=", DoubleToString(rsi,1),
            " Fast=", DoubleToString(fastCur,5),
            " Slow=", DoubleToString(slowCur,5),
            " ATR=", DoubleToString(atr,5));
      OpenBuy(atr);
   }
   else if(sellSignal)
   {
      Print(">>> SELL SIGNAL | RSI=", DoubleToString(rsi,1),
            " Fast=", DoubleToString(fastCur,5),
            " Slow=", DoubleToString(slowCur,5),
            " ATR=", DoubleToString(atr,5));
      OpenSell(atr);
   }
}
//+------------------------------------------------------------------+
