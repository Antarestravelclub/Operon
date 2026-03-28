#property copyright "OperonTrader"
#property version   "1.00"
#property strict

input double RiskPercent = 4.0;
input int FastEMA = 8;
input int SlowEMA = 21;
input int RSIPeriod = 14;
input double StopLoss = 300;
input double TakeProfit = 600;
input bool UseTrailingStop = true;

int fastHandle, slowHandle, rsiHandle;
double fastBuf[], slowBuf[], rsiBuf[];

int OnInit()
  {
   fastHandle = iMA(_Symbol,PERIOD_M15,FastEMA,0,MODE_EMA,PRICE_CLOSE);
   slowHandle = iMA(_Symbol,PERIOD_M15,SlowEMA,0,MODE_EMA,PRICE_CLOSE);
   rsiHandle  = iRSI(_Symbol,PERIOD_M15,RSIPeriod,PRICE_CLOSE);
   ArraySetAsSeries(fastBuf,true);
   ArraySetAsSeries(slowBuf,true);
   ArraySetAsSeries(rsiBuf,true);
   Print("OperonTrader Ready!");
   return(INIT_SUCCEEDED);
  }

void OnDeinit(const int reason)
  {
   IndicatorRelease(fastHandle);
   IndicatorRelease(slowHandle);
   IndicatorRelease(rsiHandle);
  }

void OnTick()
  {
   CopyBuffer(fastHandle,0,0,3,fastBuf);
   CopyBuffer(slowHandle,0,0,3,slowBuf);
   CopyBuffer(rsiHandle,0,0,3,rsiBuf);

   static datetime lastBar=0;
   datetime curBar=iTime(_Symbol,PERIOD_M15,0);
   if(curBar==lastBar) return;
   lastBar=curBar;

   if(PositionsTotal()>=3) return;

   double f0=fastBuf[0], f1=fastBuf[1];
   double s0=slowBuf[0], s1=slowBuf[1];
   double rsi=rsiBuf[0];

   if(f1<s1 && f0>s0 && rsi>50 && rsi<70) OpenTrade(ORDER_TYPE_BUY);
   if(f1>s1 && f0<s0 && rsi<50 && rsi>30) OpenTrade(ORDER_TYPE_SELL);
  }

void OpenTrade(ENUM_ORDER_TYPE type)
  {
   double ask=SymbolInfoDouble(_Symbol,SYMBOL_ASK);
   double bid=SymbolInfoDouble(_Symbol,SYMBOL_BID);
   double price=(type==ORDER_TYPE_BUY)?ask:bid;
   double sl,tp;

   if(type==ORDER_TYPE_BUY)
     {
      sl=price-StopLoss*Point;
      tp=price+TakeProfit*Point;
     }
   else
     {
      sl=price+StopLoss*Point;
      tp=price-TakeProfit*Point;
     }

   MqlTradeRequest req;
   MqlTradeResult  res;
   ZeroMemory(req);
   ZeroMemory(res);

   req.action  =TRADE_ACTION_DEAL;
   req.symbol  =_Symbol;
   req.volume  =0.01;
   req.type    =type;
   req.price   =price;
   req.sl      =sl;
   req.tp      =tp;
   req.deviation=5;
   req.magic   =99999;
   req.comment ="OperonTrader";
   req.type_filling=ORDER_FILLING_FOK;

   if(!OrderSend(req,res))
      Print("Error: ",res.retcode);
   else
      Print("Trade OK ticket=",res.order);
  }
