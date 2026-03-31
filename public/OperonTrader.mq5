#include <Trade\Trade.mqh>
#property version "3.00"
#property description "OperonTrader v3 - EMA Cross + RSI Filter"

//--- Inputs
input group "=== EMA Settings ==="
input int      FastEMA     = 8;
input int      SlowEMA     = 21;

input group "=== RSI Settings ==="
input int      RSIPeriod   = 14;
input int      RSIOverbought = 65;   // Was 70 - relaxed for more signals
input int      RSIOversold   = 35;   // Was 30 - relaxed for more signals

input group "=== Risk Settings ==="
input double   LotSize     = 0.01;
input double   SL_Points   = 300;   // Stop Loss in points
input double   TP_Points   = 600;   // Take Profit in points (2:1 R:R)
input int      MaxTrades   = 2;     // Max open trades at once

input group "=== Trade Filter ==="
input bool     UseSessionFilter = true;  // Only trade London/NY session
input int      SessionStartHour = 7;     // UTC hour to start trading
input int      SessionEndHour   = 20;    // UTC hour to stop trading
input int      MagicNumber      = 88888;

//--- Global handles
CTrade trade;
int hFast, hSlow, hRSI;
double fastBuf[], slowBuf[], rsiBuf[];

int OnInit()
{
   hFast = iMA(_Symbol, PERIOD_M15, FastEMA, 0, MODE_EMA, PRICE_CLOSE);
   hSlow = iMA(_Symbol, PERIOD_M15, SlowEMA, 0, MODE_EMA, PRICE_CLOSE);
   hRSI  = iRSI(_Symbol, PERIOD_M15, RSIPeriod, PRICE_CLOSE);
   
   ArraySetAsSeries(fastBuf, true);
   ArraySetAsSeries(slowBuf, true);
   ArraySetAsSeries(rsiBuf,  true);
   
   trade.SetExpertMagicNumber(MagicNumber);
   trade.SetDeviationInPoints(10);
   
   Print("OperonTrader v3 initialized on ", _Symbol);
   Print("SL=", SL_Points, " pts | TP=", TP_Points, " pts | Lot=", LotSize);
   
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   IndicatorRelease(hFast);
   IndicatorRelease(hSlow);
   IndicatorRelease(hRSI);
}

bool IsSessionActive()
{
   if(!UseSessionFilter) return true;
   MqlDateTime dt;
   TimeToStruct(TimeGMT(), dt);
   return (dt.hour >= SessionStartHour && dt.hour < SessionEndHour);
}

int CountMyTrades()
{
   int count = 0;
   for(int i = 0; i < PositionsTotal(); i++)
   {
      if(PositionGetSymbol(i) == _Symbol && 
         PositionGetInteger(POSITION_MAGIC) == MagicNumber)
         count++;
   }
   return count;
}

void DoBuy()
{
   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   double sl = ask - SL_Points * point;
   double tp = ask + TP_Points * point;
   
   // Normalize prices
   sl = NormalizeDouble(sl, _Digits);
   tp = NormalizeDouble(tp, _Digits);
   
   if(trade.Buy(LotSize, _Symbol, ask, sl, tp, "OperonTrader v3"))
      Print("✅ BUY opened | Ask=", ask, " SL=", sl, " TP=", tp);
   else
      Print("❌ BUY failed | Error=", GetLastError());
}

void DoSell()
{
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   double sl = bid + SL_Points * point;
   double tp = bid - TP_Points * point;
   
   sl = NormalizeDouble(sl, _Digits);
   tp = NormalizeDouble(tp, _Digits);
   
   if(trade.Sell(LotSize, _Symbol, bid, sl, tp, "OperonTrader v3"))
      Print("✅ SELL opened | Bid=", bid, " SL=", sl, " TP=", tp);
   else
      Print("❌ SELL failed | Error=", GetLastError());
}

void OnTick()
{
   // Only act on new M15 candle
   static datetime lastBar = 0;
   datetime currentBar = iTime(_Symbol, PERIOD_M15, 0);
   if(currentBar == lastBar) return;
   lastBar = currentBar;
   
   // Check session
   if(!IsSessionActive()) return;
   
   // Check max trades
   if(CountMyTrades() >= MaxTrades) return;
   
   // Get indicator values
   if(CopyBuffer(hFast, 0, 0, 3, fastBuf) < 3) return;
   if(CopyBuffer(hSlow, 0, 0, 3, slowBuf) < 3) return;
   if(CopyBuffer(hRSI,  0, 0, 3, rsiBuf)  < 3) return;
   
   double fastPrev = fastBuf[1];
   double slowPrev = slowBuf[1];
   double fastCurr = fastBuf[0];
   double slowCurr = slowBuf[0];
   double rsi      = rsiBuf[0];
   
   // BUY signal: EMA8 crosses above EMA21 + RSI not overbought
   bool buySignal = (fastPrev < slowPrev) && 
                    (fastCurr > slowCurr) && 
                    (rsi > 50) && 
                    (rsi < RSIOverbought);
   
   // SELL signal: EMA8 crosses below EMA21 + RSI not oversold
   bool sellSignal = (fastPrev > slowPrev) && 
                     (fastCurr < slowCurr) && 
                     (rsi < 50) && 
                     (rsi > RSIOversold);
   
   if(buySignal)
   {
      Print("📈 BUY signal | EMA8=", fastCurr, " EMA21=", slowCurr, " RSI=", rsi);
      DoBuy();
   }
   
   if(sellSignal)
   {
      Print("📉 SELL signal | EMA8=", fastCurr, " EMA21=", slowCurr, " RSI=", rsi);
      DoSell();
   }
}
