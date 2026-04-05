//+------------------------------------------------------------------+
//|  OperonTrader v6 — Simplified Signal Edition                     |
//|  Trades on EMA crossover + RSI confirmation only                 |
//+------------------------------------------------------------------+
#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>

input double Lots         = 0.01;
input int    MaxTrades    = 1;
input int    Magic        = 202506;
input int    FastEMA      = 9;
input int    SlowEMA      = 21;
input int    RSIPeriod    = 14;
input double StopPips     = 30.0;
input double TakePips     = 60.0;

CTrade trade;
int    hFast, hSlow, hRSI, hATR;

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
   { Print("Handle error!"); return INIT_FAILED; }
   Print("OperonTrader v6 initialized on ", _Symbol);
   return INIT_SUCCEEDED;
}

void OnDeinit(const int reason)
{
   IndicatorRelease(hFast);
   IndicatorRelease(hSlow);
   IndicatorRelease(hRSI);
   IndicatorRelease(hATR);
}

int MyTrades()
{
   int count = 0;
   for(int i = PositionsTotal()-1; i >= 0; i--)
      if(PositionGetSymbol(i) == _Symbol &&
         PositionGetInteger(POSITION_MAGIC) == Magic) count++;
   return count;
}

void Buy()
{
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double pt  = StopPips * _Point * 10;
   double sl  = ask - pt;
   double tp  = ask + pt * 2;
   if(trade.Buy(Lots, _Symbol, ask, sl, tp, "OT6"))
      Print("✅ BUY opened at ", ask);
   else
      Print("❌ BUY failed: ", trade.ResultRetcodeDescription());
}

void Sell()
{
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double pt  = StopPips * _Point * 10;
   double sl  = bid + pt;
   double tp  = bid - pt * 2;
   if(trade.Sell(Lots, _Symbol, bid, sl, tp, "OT6"))
      Print("✅ SELL opened at ", bid);
   else
      Print("❌ SELL failed: ", trade.ResultRetcodeDescription());
}

void OnTick()
{
   // Only trade on new bar
   static datetime lastBar = 0;
   datetime curBar = iTime(_Symbol, PERIOD_M15, 0);
   if(curBar == lastBar) return;
   lastBar = curBar;

   if(MyTrades() >= MaxTrades) return;

   double fB[3], sB[3], rB[3];
   if(CopyBuffer(hFast, 0, 0, 3, fB) < 3) return;
   if(CopyBuffer(hSlow, 0, 0, 3, sB) < 3) return;
   if(CopyBuffer(hRSI,  0, 0, 3, rB) < 3) return;

   double fastCur  = fB[0], fastPrev = fB[1];
   double slowCur  = sB[0], slowPrev = sB[1];
   double rsi      = rB[0];

   // BUY: fast crosses above slow + RSI not overbought
   bool buySignal  = (fastPrev < slowPrev && fastCur > slowCur && rsi < 65);

   // SELL: fast crosses below slow + RSI not oversold  
   bool sellSignal = (fastPrev > slowPrev && fastCur < slowCur && rsi > 35);

   if(buySignal)
   {
      Print(">>> BUY SIGNAL | RSI=", rsi, " Fast=", fastCur, " Slow=", slowCur);
      Buy();
   }
   else if(sellSignal)
   {
      Print(">>> SELL SIGNAL | RSI=", rsi, " Fast=", fastCur, " Slow=", slowCur);
      Sell();
   }
}
//+------------------------------------------------------------------+
