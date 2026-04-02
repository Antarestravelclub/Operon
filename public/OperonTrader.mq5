//+------------------------------------------------------------------+
//|  OperonTrader v5 — Clean Compile Edition                         |
//|  EURUSD / GOLD / BTCUSD  M15                                     |
//|  Magic: 88888                                                     |
//+------------------------------------------------------------------+
#property copyright "Operon"
#property version   "5.00"

#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>

//--- Inputs
input double   Lots          = 0.01;
input int      MaxTrades     = 1;
input double   ATR_SL        = 1.5;
input double   ATR_TP        = 3.0;
input int      FastEMA       = 9;
input int      SlowEMA       = 21;
input int      TrendEMA      = 200;
input int      RSIPeriod     = 14;
input double   RSIOversold   = 40;
input double   RSIOverbought = 60;
input bool     UseTrailing   = true;
input double   BreakevenAt   = 150;
input double   TrailDistance = 100;
input bool     UseSession    = true;
input int      SessionStart  = 7;
input int      SessionEnd    = 20;
input int      Magic         = 88888;

//--- Globals
CTrade trade;
int    hFast, hSlow, hTrend, hRSI, hATR;
double fB[3], sB[3], tB[2], rB[3], aB[2];

//+------------------------------------------------------------------+
int OnInit()
{
   trade.SetExpertMagicNumber(Magic);
   trade.SetDeviationInPoints(30);

   hFast  = iMA(_Symbol, PERIOD_M15, FastEMA,  0, MODE_EMA, PRICE_CLOSE);
   hSlow  = iMA(_Symbol, PERIOD_M15, SlowEMA,  0, MODE_EMA, PRICE_CLOSE);
   hTrend = iMA(_Symbol, PERIOD_H1,  TrendEMA, 0, MODE_EMA, PRICE_CLOSE);
   hRSI   = iRSI(_Symbol, PERIOD_M15, RSIPeriod, PRICE_CLOSE);
   hATR   = iATR(_Symbol, PERIOD_M15, 14);

   if(hFast == INVALID_HANDLE || hSlow == INVALID_HANDLE ||
      hTrend == INVALID_HANDLE || hRSI == INVALID_HANDLE || hATR == INVALID_HANDLE)
   {
      Print("ERROR: Failed to create indicators. Check symbol name.");
      return INIT_FAILED;
   }

   Print("OperonTrader v5 initialized on ", _Symbol);
   return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   IndicatorRelease(hFast);
   IndicatorRelease(hSlow);
   IndicatorRelease(hTrend);
   IndicatorRelease(hRSI);
   IndicatorRelease(hATR);
}

//+------------------------------------------------------------------+
bool Session()
{
   if(!UseSession) return true;
   MqlDateTime t;
   TimeToStruct(TimeGMT(), t);
   return (t.hour >= SessionStart && t.hour < SessionEnd);
}

//+------------------------------------------------------------------+
int MyTrades()
{
   int c = 0;
   for(int i = 0; i < PositionsTotal(); i++)
   {
      ulong ticket = PositionGetTicket(i);
      if(PositionSelectByTicket(ticket))
         if(PositionGetString(POSITION_SYMBOL) == _Symbol &&
            PositionGetInteger(POSITION_MAGIC) == Magic)
            c++;
   }
   return c;
}

//+------------------------------------------------------------------+
void Trail()
{
   if(!UseTrailing) return;
   double pt = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   for(int i = 0; i < PositionsTotal(); i++)
   {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      if(PositionGetString(POSITION_SYMBOL) != _Symbol) continue;
      if(PositionGetInteger(POSITION_MAGIC) != Magic) continue;

      double op   = PositionGetDouble(POSITION_PRICE_OPEN);
      double sl   = PositionGetDouble(POSITION_SL);
      double tp   = PositionGetDouble(POSITION_TP);
      long   type = PositionGetInteger(POSITION_TYPE);

      if(type == POSITION_TYPE_BUY)
      {
         double bid  = SymbolInfoDouble(_Symbol, SYMBOL_BID);
         double prf  = (bid - op) / pt;
         if(prf >= BreakevenAt && sl < op)
            trade.PositionModify(ticket, op + pt, tp);
         else if(prf >= BreakevenAt + TrailDistance)
         {
            double ns = bid - TrailDistance * pt;
            if(ns > sl)
               trade.PositionModify(ticket, NormalizeDouble(ns, _Digits), tp);
         }
      }
      else if(type == POSITION_TYPE_SELL)
      {
         double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
         double prf = (op - ask) / pt;
         if(prf >= BreakevenAt && sl > op)
            trade.PositionModify(ticket, op - pt, tp);
         else if(prf >= BreakevenAt + TrailDistance)
         {
            double ns = ask + TrailDistance * pt;
            if(ns < sl)
               trade.PositionModify(ticket, NormalizeDouble(ns, _Digits), tp);
         }
      }
   }
}

//+------------------------------------------------------------------+
void Buy(double atr)
{
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double sl  = NormalizeDouble(ask - ATR_SL * atr, _Digits);
   double tp  = NormalizeDouble(ask + ATR_TP * atr, _Digits);

   if(trade.Buy(Lots, _Symbol, ask, sl, tp, "OT5"))
      Print("BUY ok  ask=", ask, " sl=", sl, " tp=", tp);
   else
      Print("BUY FAILED err=", GetLastError(), " ask=", ask);
}

//+------------------------------------------------------------------+
void Sell(double atr)
{
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double sl  = NormalizeDouble(bid + ATR_SL * atr, _Digits);
   double tp  = NormalizeDouble(bid - ATR_TP * atr, _Digits);

   if(trade.Sell(Lots, _Symbol, bid, sl, tp, "OT5"))
      Print("SELL ok  bid=", bid, " sl=", sl, " tp=", tp);
   else
      Print("SELL FAILED err=", GetLastError(), " bid=", bid);
}

//+------------------------------------------------------------------+
void OnTick()
{
   Trail();

   // Only run on new M15 bar
   static datetime lastBar = 0;
   datetime curBar = iTime(_Symbol, PERIOD_M15, 0);
   if(curBar == lastBar) return;
   lastBar = curBar;

   // Session check
   if(!Session()) return;

   // Max trades check
   if(MyTrades() >= MaxTrades) return;

   // Copy indicator buffers
   if(CopyBuffer(hFast,  0, 0, 3, fB) < 3) { Print("ERR: FastEMA buffer"); return; }
   if(CopyBuffer(hSlow,  0, 0, 3, sB) < 3) { Print("ERR: SlowEMA buffer"); return; }
   if(CopyBuffer(hTrend, 0, 0, 2, tB) < 2) { Print("ERR: TrendEMA buffer"); return; }
   if(CopyBuffer(hRSI,   0, 0, 3, rB) < 3) { Print("ERR: RSI buffer"); return; }
   if(CopyBuffer(hATR,   0, 0, 2, aB) < 2) { Print("ERR: ATR buffer"); return; }

   double fastCur  = fB[0], fastPrev = fB[1];
   double slowCur  = sB[0], slowPrev = sB[1];
   double trend    = tB[0];
   double rsi      = rB[0];
   double atr      = aB[0];
   double price    = SymbolInfoDouble(_Symbol, SYMBOL_BID);

   bool aboveTrend = (price > trend);
   bool belowTrend = (price < trend);

   // BUY: fast crosses above slow, RSI in range, price above 200 EMA
   bool buySignal  = (fastPrev < slowPrev && fastCur > slowCur &&
                      rsi > RSIOversold && rsi < RSIOverbought && aboveTrend);

   // SELL: fast crosses below slow, RSI in range, price below 200 EMA
   bool sellSignal = (fastPrev > slowPrev && fastCur < slowCur &&
                      rsi < (100 - RSIOversold) && rsi > (100 - RSIOverbought) && belowTrend);

   if(buySignal)
   {
      Print(">>> BUY SIGNAL | RSI=", rsi, " ATR=", atr, " Price=", price, " Trend=", trend);
      Buy(atr);
   }

   if(sellSignal)
   {
      Print(">>> SELL SIGNAL | RSI=", rsi, " ATR=", atr, " Price=", price, " Trend=", trend);
      Sell(atr);
   }
}
//+------------------------------------------------------------------+
