#include <Trade\Trade.mqh>
#property copyright "OperonTrader"
#property version   "1.00"

input int    FastEMA    = 8;
input int    SlowEMA    = 21;
input int    RSIPeriod  = 14;
input double StopLoss   = 300;
input double TakeProfit = 600;

CTrade trade;
int fH, sH, rH;
double fB[], sB[], rB[];

int OnInit()
{
   fH = iMA(_Symbol, PERIOD_M15, FastEMA, 0, MODE_EMA, PRICE_CLOSE);
   sH = iMA(_Symbol, PERIOD_M15, SlowEMA, 0, MODE_EMA, PRICE_CLOSE);
   rH = iRSI(_Symbol, PERIOD_M15, RSIPeriod, PRICE_CLOSE);
   ArraySetAsSeries(fB, true);
   ArraySetAsSeries(sB, true);
   ArraySetAsSeries(rB, true);
   trade.SetExpertMagicNumber(88888);
   Print("OperonTrader Ready!");
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   IndicatorRelease(fH);
   IndicatorRelease(sH);
   IndicatorRelease(rH);
}

void OnTick()
{
   CopyBuffer(fH, 0, 0, 3, fB);
   CopyBuffer(sH, 0, 0, 3, sB);
   CopyBuffer(rH, 0, 0, 3, rB);

   static datetime t = 0;
   datetime curBar = iTime(_Symbol, PERIOD_M15, 0);
   if(curBar == t) return;
   t = curBar;

   if(PositionsTotal() >= 2) return;

   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double slBuy  = ask - StopLoss * Point;
   double tpBuy  = ask + TakeProfit * Point;
   double slSell = bid + StopLoss * Point;
   double tpSell = bid - TakeProfit * Point;

   bool buySignal  = (fB[1] < sB[1] && fB[0] > sB[0] && rB[0] > 50 && rB[0] < 70);
   bool sellSignal = (fB[1] > sB[1] && fB[0] < sB[0] && rB[0] < 50 && rB[0] > 30);

   if(buySignal)
      trade.Buy(0.01, _Symbol, ask, slBuy, tpBuy, "OperonTrader");

   if(sellSignal)
      trade.Sell(0.01, _Symbol, bid, slSell, tpSell, "OperonTrader");
}
