#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>
input double Lots=0.01;
input int MaxTrades=1;
input int Magic=202507;
input int FastEMA=9;
input int SlowEMA=21;
input int RSIPeriod=14;
input double RSIBuyMax=65;
input double RSISellMin=35;
input double ATRMult_SL=1.5;
input double ATRMult_TP=3.0;
input double TrailATR=1.0;
input bool UseSession=true;
input int SessionStart=8;
input int SessionEnd=20;
CTrade trade;
int hFast,hSlow,hRSI,hATR;
int OnInit(){
   trade.SetExpertMagicNumber(Magic);
   trade.SetDeviationInPoints(30);
   hFast=iMA(_Symbol,PERIOD_M15,FastEMA,0,MODE_EMA,PRICE_CLOSE);
   hSlow=iMA(_Symbol,PERIOD_M15,SlowEMA,0,MODE_EMA,PRICE_CLOSE);
   hRSI=iRSI(_Symbol,PERIOD_M15,RSIPeriod,PRICE_CLOSE);
   hATR=iATR(_Symbol,PERIOD_M15,14);
   if(hFast==INVALID_HANDLE||hSlow==INVALID_HANDLE||hRSI==INVALID_HANDLE||hATR==INVALID_HANDLE){Print("Handle error!");return INIT_FAILED;}
   Print("OperonTrader v7 initialized on ",_Symbol);
   return INIT_SUCCEEDED;
}
void OnDeinit(const int reason){IndicatorRelease(hFast);IndicatorRelease(hSlow);IndicatorRelease(hRSI);IndicatorRelease(hATR);}
bool InSession(){if(!UseSession)return true;MqlDateTime dt;TimeToStruct(TimeCurrent(),dt);return(dt.hour>=SessionStart&&dt.hour<SessionEnd);}
int MyTrades(){int c=0;for(int i=PositionsTotal()-1;i>=0;i--)if(PositionGetSymbol(i)==_Symbol&&PositionGetInteger(POSITION_MAGIC)==Magic)c++;return c;}
void TrailStops(){double aB[1];if(CopyBuffer(hATR,0,0,1,aB)<1)return;double trail=aB[0]*TrailATR;for(int i=PositionsTotal()-1;i>=0;i--){if(PositionGetSymbol(i)!=_Symbol)continue;if(PositionGetInteger(POSITION_MAGIC)!=Magic)continue;ulong ticket=PositionGetInteger(POSITION_TICKET);double sl=PositionGetDouble(POSITION_SL);double tp=PositionGetDouble(POSITION_TP);long type=PositionGetInteger(POSITION_TYPE);if(type==POSITION_TYPE_BUY){double bid=SymbolInfoDouble(_Symbol,SYMBOL_BID);double nsl=NormalizeDouble(bid-trail,_Digits);if(nsl>sl+_Point)trade.PositionModify(ticket,nsl,tp);}else{double ask=SymbolInfoDouble(_Symbol,SYMBOL_ASK);double nsl=NormalizeDouble(ask+trail,_Digits);if(sl==0||nsl<sl-_Point)trade.PositionModify(ticket,nsl,tp);}}}
void OpenBuy(double atr){double ask=SymbolInfoDouble(_Symbol,SYMBOL_ASK);double sl=NormalizeDouble(ask-atr*ATRMult_SL,_Digits);double tp=NormalizeDouble(ask+atr*ATRMult_TP,_Digits);if(trade.Buy(Lots,_Symbol,ask,sl,tp,"OT7"))Print("BUY opened ",ask);else Print("BUY failed: ",trade.ResultRetcodeDescription());}
void OpenSell(double atr){double bid=SymbolInfoDouble(_Symbol,SYMBOL_BID);double sl=NormalizeDouble(bid+atr*ATRMult_SL,_Digits);double tp=NormalizeDouble(bid-atr*ATRMult_TP,_Digits);if(trade.Sell(Lots,_Symbol,bid,sl,tp,"OT7"))Print("SELL opened ",bid);else Print("SELL failed: ",trade.ResultRetcodeDescription());}
void OnTick(){
   if(MyTrades()>0)TrailStops();
   static datetime lastBar=0;
   datetime curBar=iTime(_Symbol,PERIOD_M15,0);
   if(curBar==lastBar)return;
   lastBar=curBar;
   if(!InSession())return;
   if(MyTrades()>=MaxTrades)return;
   double fB[3],sB[3],rB[1],aB[1];
   if(CopyBuffer(hFast,0,0,3,fB)<3)return;
   if(CopyBuffer(hSlow,0,0,3,sB)<3)return;
   if(CopyBuffer(hRSI,0,0,1,rB)<1)return;
   if(CopyBuffer(hATR,0,0,1,aB)<1)return;
   double rsi=rB[0],atr=aB[0];
   if(atr<SymbolInfoDouble(_Symbol,SYMBOL_POINT)*50)return;
   bool buy=(fB[1]<sB[1]&&fB[0]>sB[0]&&rsi<RSIBuyMax);
   bool sell=(fB[1]>sB[1]&&fB[0]<sB[0]&&rsi>RSISellMin);
   if(buy){Print("BUY SIGNAL RSI=",rsi);OpenBuy(atr);}
   else if(sell){Print("SELL SIGNAL RSI=",rsi);OpenSell(atr);}
}
