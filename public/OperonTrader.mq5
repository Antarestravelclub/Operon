#property copyright "OperonTrader"
#property version   "1.00"
#property description "EMA Crossover + RSI Filter EA"
#property strict

input double RiskPercent = 4.0;
input int FastEMA = 8;
input int SlowEMA = 21;
input int RSIPeriod = 14;
input double SL_Pips_EURUSD = 30;
input double TP_Pips_EURUSD = 60;
input double SL_Points_Gold = 300;
input double TP_Points_Gold = 600;
input bool UseTrailingStop = true;

int fastEmaHandle, slowEmaHandle, rsiHandle;
double fastEmaBuffer[], slowEmaBuffer[], rsiBuffer[];

int OnInit()
{
   fastEmaHandle = iMA(_Symbol, PERIOD_M15, FastEMA, 0, MODE_EMA, PRICE_CLOSE);
   slowEmaHandle = iMA(_Symbol, PERIOD_M15, SlowEMA, 0, MODE_EMA, PRICE_CLOSE);
   rsiHandle = iRSI(_Symbol, PERIOD_M15, RSIPeriod, PRICE_CLOSE);
   
   if(fastEmaHandle == INVALID_HANDLE || slowEmaHandle == INVALID_HANDLE || rsiHandle == INVALID_HANDLE)
   {
      Print("Error creating indicators!");
      return(INIT_FAILED);
   }
   
   ArraySetAsSeries(fastEmaBuffer, true);
   ArraySetAsSeries(slowEmaBuffer, true);
   ArraySetAsSeries(rsiBuffer, true);
   
   Print("OperonTrader initialized!");
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   IndicatorRelease(fastEmaHandle);
   IndicatorRelease(slowEmaHandle);
   IndicatorRelease(rsiHandle);
}

void OnTick()
{
   CopyBuffer(fastEmaHandle, 0, 0, 3, fastEmaBuffer);
   CopyBuffer(slowEmaHandle, 0, 0, 3, slowEmaBuffer);
   CopyBuffer(rsiHandle, 0, 0, 3, rsiBuffer);
   
   if(UseTrailingStop) ManageTrailingStop();
   
   static datetime lastBarTime = 0;
   datetime currentBarTime = iTime(_Symbol, PERIOD_M15, 0);
   
   if(currentBarTime == lastBarTime) return;
   lastBarTime = currentBarTime;
   
   if(PositionsTotal() >= 3) return;
   
   int signal = CheckSignal();
   if(signal == 1) OpenTrade(ORDER_TYPE_BUY);
   else if(signal == -1) OpenTrade(ORDER_TYPE_SELL);
}

int CheckSignal()
{
   if(ArraySize(fastEmaBuffer) < 3 || ArraySize(slowEmaBuffer) < 3 || ArraySize(rsiBuffer) < 3) return(0);
   
   double fastPrev = fastEmaBuffer[1];
   double fastCurr = fastEmaBuffer[0];
   double slowPrev = slowEmaBuffer[1];
   double slowCurr = slowEmaBuffer[0];
   double rsiVal = rsiBuffer[0];
   
   if(fastPrev < slowPrev && fastCurr > slowCurr && rsiVal > 50 && rsiVal < 70) return(1);
   if(fastPrev > slowPrev && fastCurr < slowCurr && rsiVal < 50 && rsiVal > 30) return(-1);
   
   return(0);
}

void OpenTrade(ENUM_ORDER_TYPE type)
{
   double price = (type == ORDER_TYPE_BUY) ? SymbolInfoDouble(_Symbol, SYMBOL_ASK) : SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double sl, tp, pip;
   
   if(StringFind(_Symbol, "XAU") >= 0 || StringFind(_Symbol, "GOLD") >= 0)
   {
      sl = (type == ORDER_TYPE_BUY) ? price - SL_Points_Gold * Point : price + SL_Points_Gold * Point;
      tp = (type == ORDER_TYPE_BUY) ? price + TP_Points_Gold * Point : price - TP_Points_Gold * Point;
   }
   else
   {
      double pip2 = 10 * Point;
      sl = (type == ORDER_TYPE_BUY) ? price - SL_Pips_EURUSD * pip2 : price + SL_Pips_EURUSD * pip2;
      tp = (type == ORDER_TYPE_BUY) ? price + TP_Pips_EURUSD * pip2 : price - TP_Pips_EURUSD * pip2;
   }
   
   MqlTradeRequest req;
   MqlTradeResult res;
   ZeroMemory(req);
   ZeroMemory(res);
   
   req.action   = TRADE_ACTION_DEAL;
   req.symbol   = _Symbol;
   req.volume   = 0.01;
   req.type     = type;
   req.price    = price;
   req.sl       = sl;
   req.tp       = tp;
   req.deviation = 5;
   req.magic    = 12345;
   req.comment  = "OperonTrader";
   req.type_filling = ORDER_FILLING_FOK;
   
   if(!OrderSend(req, res))
      Print("Trade failed: ", res.retcode);
   else
      Print("Trade opened: ", EnumToString(type), " Ticket: ", res.order);
}

void ManageTrailingStop()
{
   double pip = 10 * Point;
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      if(PositionGetInteger(POSITION_MAGIC) != 12345) continue;
      
      double trail = 15 * pip;
      double price = PositionGetDouble(POSITION_PRICE_CURRENT);
      double sl = PositionGetDouble(POSITION_SL);
      double tp = PositionGetDouble(POSITION_TP);
      long type = PositionGetInteger(POSITION_TYPE);
      
      MqlTradeRequest req;
      MqlTradeResult res;
      ZeroMemory(req);
      ZeroMemory(res);
      
      req.action   = TRADE_ACTION_SLTP;
      req.symbol   = _Symbol;
      req.position = ticket;
      req.tp       = tp;
      
      if(type == POSITION_TYPE_BUY && price - trail > sl)
      {
         req.sl = price - trail;
         OrderSend(req, res);
      }
      else if(type == POSITION_TYPE_SELL && (sl == 0 || price + trail < sl))
      {
         req.sl = price + trail;
         OrderSend(req, res);
      }
   }
}
