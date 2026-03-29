#include <Trade\Trade.mqh>
#property version "1.00"

input int FastEMA=8;
input int SlowEMA=21;
input int RSI=14;
input double SL=300;
input double TP=600;

CTrade ct;
int h1,h2,h3;
double b1[],b2[],b3[];

int OnInit()
{
   h1=iMA(_Symbol,PERIOD_M15,FastEMA,0,MODE_EMA,PRICE_CLOSE);
   h2=iMA(_Symbol,PERIOD_M15,SlowEMA,0,MODE_EMA,PRICE_CLOSE);
   h3=iRSI(_Symbol,PERIOD_M15,RSI,PRICE_CLOSE);
   ArraySetAsSeries(b1,true);
   ArraySetAsSeries(b2,true);
   ArraySetAsSeries(b3,true);
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   IndicatorRelease(h1);
   IndicatorRelease(h2);
   IndicatorRelease(h3);
}

void OnTick()
{
   CopyBuffer(h1,0,0,3,b1);
   CopyBuffer(h2,0,0,3,b2);
   CopyBuffer(h3,0,0,3,b3);
   static datetime t=0;
   if(iTime(_Symbol,PERIOD_M15,0)==t) return;
   t=iTime(_Symbol,PERIOD_M15,0);
   if(PositionsTotal()>=2) return;
   double a=SymbolInfoDouble(_Symbol,SYMBOL_ASK);
   double b=SymbolInfoDouble(_Symbol,SYMBOL_BID);
   if(b1[1]<b2[1]&&b1[0]>b2[0]&&b3[0]>50&&b3[0]<70)
      ct.Buy(0.01,_Symbol,a,a-SL*Point,a+TP*Point);
   if(b1[1]>b2[1]&&b1[0]<b2[0]&&b3[0]<50&&b3[0]>30)
      ct.Sell(0.01,_Symbol,b,b+SL*Point,b-TP*Point);
}
