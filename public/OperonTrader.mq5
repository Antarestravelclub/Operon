#include <Trade\Trade.mqh>
#property version "4.00"
input int FastEMA=8;
input int SlowEMA=21;
input int TrendEMA=200;
input int RSIPeriod=14;
input int RSIOverbought=65;
input int RSIOversold=35;
input int ATRPeriod=14;
input double ATR_SL=1.5;
input double ATR_TP=3.0;
input double Lots=0.01;
input int MaxTrades=2;
input bool UseTrailing=true;
input double BreakevenAt=150;
input double TrailDistance=100;
input bool UseSession=true;
input int StartHour=7;
input int EndHour=20;
input int Magic=88888;
CTrade trade;
int hF,hS,hT,hR,hA;
double fB[],sB[],tB[],rB[],aB[];
int OnInit(){
hF=iMA(_Symbol,PERIOD_M15,FastEMA,0,MODE_EMA,PRICE_CLOSE);
hS=iMA(_Symbol,PERIOD_M15,SlowEMA,0,MODE_EMA,PRICE_CLOSE);
hT=iMA(_Symbol,PERIOD_H1,TrendEMA,0,MODE_EMA,PRICE_CLOSE);
hR=iRSI(_Symbol,PERIOD_M15,RSIPeriod,PRICE_CLOSE);
hA=iATR(_Symbol,PERIOD_M15,ATRPeriod);
ArraySetAsSeries(fB,true);ArraySetAsSeries(sB,true);
ArraySetAsSeries(tB,true);ArraySetAsSeries(rB,true);
ArraySetAsSeries(aB,true);
trade.SetExpertMagicNumber(Magic);
trade.SetDeviationInPoints(10);
Print("OperonTrader v4 ready on ",_Symbol);
return INIT_SUCCEEDED;}
void OnDeinit(const int r){IndicatorRelease(hF);IndicatorRelease(hS);IndicatorRelease(hT);IndicatorRelease(hR);IndicatorRelease(hA);}
bool Session(){if(!UseSession)return true;MqlDateTime d;TimeToStruct(TimeGMT(),d);return(d.hour>=StartHour&&d.hour<EndHour);}
int MyTrades(){int c=0;for(int i=0;i<PositionsTotal();i++){ulong t=PositionGetTicket(i);if(PositionSelectByTicket(t))if(PositionGetString(POSITION_SYMBOL)==_Symbol&&PositionGetInteger(POSITION_MAGIC)==Magic)c++;}return c;}
void Trail(){if(!UseTrailing)return;double pt=SymbolInfoDouble(_Symbol,SYMBOL_POINT);for(int i=0;i<PositionsTotal();i++){ulong t=PositionGetTicket(i);if(!PositionSelectByTicket(t))continue;if(PositionGetString(POSITION_SYMBOL)!=_Symbol)continue;if(PositionGetInteger(POSITION_MAGIC)!=Magic)continue;double op=PositionGetDouble(POSITION_PRICE_OPEN);double sl=PositionGetDouble(POSITION_SL);double tp=PositionGetDouble(POSITION_TP);long pt2=PositionGetInteger(POSITION_TYPE);if(pt2==POSITION_TYPE_BUY){double bid=SymbolInfoDouble(_Symbol,SYMBOL_BID);double prf=(bid-op)/pt;if(prf>=BreakevenAt&&sl<op)trade.PositionModify(t,op+pt,tp);else if(prf>=BreakevenAt+TrailDistance){double ns=bid-TrailDistance*pt;if(ns>sl)trade.PositionModify(t,NormalizeDouble(ns,_Digits),tp);}}else if(pt2==POSITION_TYPE_SELL){double ask=SymbolInfoDouble(_Symbol,SYMBOL_ASK);double prf=(op-ask)/pt;if(prf>=BreakevenAt&&sl>op)trade.PositionModify(t,op-pt,tp);else if(prf>=BreakevenAt+TrailDistance){double ns=ask+TrailDistance*pt;if(ns<sl)trade.PositionModify(t,NormalizeDouble(ns,_Digits),tp);}}}}
void Buy(double atr){double ask=SymbolInfoDouble(_Symbol,SYMBOL_ASK);double sl=NormalizeDouble(ask-ATR_SL*atr,_Digits);double tp=NormalizeDouble(ask+ATR_TP*atr,_Digits);if(trade.Buy(Lots,_Symbol,ask,sl,tp,"OT4"))Print("BUY ok ask=",ask," sl=",sl," tp=",tp);else Print("BUY fail err=",GetLastError());}
void Sell(double atr){double bid=SymbolInfoDouble(_Symbol,SYMBOL_BID);double sl=NormalizeDouble(bid+ATR_SL*atr,_Digits);double tp=NormalizeDouble(bid-ATR_TP*atr,_Digits);if(trade.Sell(Lots,_Symbol,bid,sl,tp,"OT4"))Print("SELL ok bid=",bid," sl=",sl," tp=",tp);else Print("SELL fail err=",GetLastError());}
void OnTick(){
Trail();
static datetime lb=0;datetime cb=iTime(_Symbol,PERIOD_M15,0);if(cb==lb)return;lb=cb;
if(!Session())return;
if(MyTrades()>=MaxTrades)return;
if(CopyBuffer(hF,0,0,3,fB)<3)return;if(CopyBuffer(hS,0,0,3,sB)<3)return;
if(CopyBuffer(hT,0,0,2,tB)<2)return;if(CopyBuffer(hR,0,0,3,rB)<3)return;
if(CopyBuffer(hA,0,0,2,aB)<2)return;
double fc=fB[0],fp=fB[1],sc=sB[0],sp=sB[1];
double rsi=rB[0],tr=tB[0],atr=aB[0];
double price=SymbolInfoDouble(_Symbol,SYMBOL_BID);
bool up=(price>tr);bool dn=(price<tr);
bool bs=(fp<sp&&fc>sc&&rsi>50&&rsi<RSIOverbought&&up);
bool ss=(fp>sp&&fc<sc&&rsi<50&&rsi>RSIOversold&&dn);
if(bs){Print("BUY SIGNAL RSI=",rsi," ATR=",atr);Buy(atr);}
if(ss){Print("SELL SIGNAL RSI=",rsi," ATR=",atr);Sell(atr);}
}
