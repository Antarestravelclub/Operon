#include <Trade\Trade.mqh>
#property version "4.00"
#property description "OperonTrader v4 - Trend Filter + ATR + Trailing Stop"

//--- Inputs
input group "=== EMA Settings ==="
input int      FastEMA        = 8;
input int      SlowEMA        = 21;
input int      TrendEMA       = 200;    // H1 trend filter

input group "=== RSI Settings ==="
input int      RSIPeriod      = 14;
input int      RSIOverbought  = 65;
input int      RSIOversold    = 35;

input group "=== ATR Risk Settings ==="
input int      ATRPeriod      = 14;
input double   ATR_SL_Mult    = 1.5;   // SL = 1.5x ATR
input double   ATR_TP_Mult    = 3.0;   // TP = 3.0x ATR (2:1 R:R)
input double   LotSize        = 0.01;
input int      MaxTrades      = 2;

input group "=== Trailing Stop ==="
input bool     UseTrailing    = true;
input double   BreakevenAt    = 150;   // Move SL to BE after 150 pts profit
input double   TrailDistance  = 100;   // Trail SL by 100 pts

input group "=== Session Filter ==="
input bool     UseSessionFilter = true;
input int      SessionStartHour = 7;    // UTC
input int      SessionEndHour   = 20;   // UTC

input group "=== News Filter ==="
input bool     UseNewsFilter  = true;
input int      NewsMinutes    = 30;    // Avoid trading 30 min around news

input int      MagicNumber    = 88888;

//--- Handles
CTrade trade;
int hFast, hSlow, hTrend, hRSI, hATR;
double fastBuf[], slowBuf[], trendBuf[], rsiBuf[], atrBuf[];

int OnInit()
{
   hFast  = iMA(_Symbol, PERIOD_M15, FastEMA,  0, MODE_EMA, PRICE_CLOSE);
   hSlow  = iMA(_Symbol, PERIOD_M15, SlowEMA,  0, MODE_EMA, PRICE_CLOSE);
   hTrend = iMA(_Symbol, PERIOD_H1,  TrendEMA, 0, MODE_EMA, PRICE_CLOSE);
   hRSI   = iRSI(_Symbol, PERIOD_M15, RSIPeriod, PRICE_CLOSE);
   hATR   = iATR(_Symbol, PERIOD_M15, ATRPeriod);

   ArraySetAsSeries(fastBuf,  true);
   ArraySetAsSeries(slowBuf,  true);
   ArraySetAsSeries(trendBuf, true);
   ArraySetAsSeries(rsiBuf,   true);
   ArraySetAsSeries(atrBuf,   true);

   trade.SetExpertMagicNumber(MagicNumber);
   trade.SetDeviationInPoints(10);

   Print("OperonTrader v4 initialized | Symbol=", _Symbol);
   Print("ATR SL Mult=", ATR_SL_Mult, " | ATR TP Mult=", ATR_TP_Mult);
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   IndicatorRelease(hFast);
   IndicatorRelease(hSlow);
   IndicatorRelease(hTrend);
   IndicatorRelease(hRSI);
   IndicatorRelease(hATR);
}

bool IsSessionActive()
{
   if(!UseSessionFilter) return true;
   MqlDateTime dt;
   TimeToStruct(TimeGMT(), dt);
   return (dt.hour >= SessionStartHour && dt.hour < SessionEndHour);
}

bool IsNewsTime()
{
   if(!UseNewsFilter) return false;
   // Simple time-based news avoidance
   // Avoids: 8:30, 13:30, 14:00, 15:00 UTC (common news times)
   MqlDateTime dt;
   TimeToStruct(TimeGMT(), dt);
   int mins = dt.hour * 60 + dt.min;
   int newsSlots[] = {510, 810, 840, 900}; // 8:30, 13:30, 14:00, 15:00
   for(int i = 0; i < ArraySize(newsSlots); i++)
   {
      if(MathAbs(mins - newsSlots[i]) <= NewsMinutes) return true;
   }
   return false;
}

int CountMyTrades()
{
   int count = 0;
   for(int i = 0; i < PositionsTotal(); i++)
   {
      ulong ticket = PositionGetTicket(i);
      if(PositionSelectByTicket(ticket))
         if(PositionGetString(POSITION_SYMBOL) == _Symbol &&
            PositionGetInteger(POSITION_MAGIC) == MagicNumber)
            count++;
   }
   return count;
}

void ManageTrailing()
{
   if(!UseTrailing) return;
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   for(int i = 0; i < PositionsTotal(); i++)
   {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      if(PositionGetString(POSITION_SYMBOL) != _Symbol) continue;
      if(PositionGetInteger(POSITION_MAGIC) != MagicNumber) continue;

      double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
      double currentSL = PositionGetDouble(POSITION_SL);
      long posType = PositionGetInteger(POSITION_TYPE);

      if(posType == POSITION_TYPE_BUY)
      {
         double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
         double profit = (bid - openPrice) / point;

         // Move to breakeven
         if(profit >= BreakevenAt && currentSL < openPrice)
         {
            trade.PositionModify(ticket, openPrice + point, PositionGetDouble(POSITION_TP));
            Print("⚡ Breakeven set for BUY #", ticket);
         }
         // Trail stop
         else if(profit >= BreakevenAt + TrailDistance)
         {
            double newSL = bid - TrailDistance * point;
            if(newSL > currentSL)
            {
               trade.PositionModify(ticket, NormalizeDouble(newSL, _Digits), PositionGetDouble(POSITION_TP));
               Print("📈 Trail SL updated BUY #", ticket, " → ", newSL);
            }
         }
      }
      else if(posType == POSITION_TYPE_SELL)
      {
         double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
         double profit = (openPrice - ask) / point;

         if(profit >= BreakevenAt && currentSL > openPrice)
         {
            trade.PositionModify(ticket, openPrice - point, PositionGetDouble(POSITION_TP));
            Print("⚡ Breakeven set for SELL #", ticket);
         }
         else if(profit >= BreakevenAt + TrailDistance)
         {
            double newSL = ask + TrailDistance * point;
            if(newSL < currentSL)
            {
               trade.PositionModify(ticket, NormalizeDouble(newSL, _Digits), PositionGetDouble(POSITION_TP));
               Print("📉 Trail SL updated SELL #", ticket, " → ", newSL);
            }
         }
      }
   }
}

void DoBuy(double atr)
{
   double ask   = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   double sl    = NormalizeDouble(ask - ATR_SL_Mult * atr, _Digits);
   double tp    = NormalizeDouble(ask + ATR_TP_Mult * atr, _Digits);

   if(trade.Buy(LotSize, _Symbol, ask, sl, tp, "OT_v4"))
      Print("✅ BUY | Ask=", ask, " SL=", sl, " TP=", tp, " ATR=", atr);
   else
      Print("❌ BUY FAILED | Error=", GetLastError());
}

void DoSell(double atr)
{
   double bid   = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   double sl    = NormalizeDouble(bid + ATR_SL_Mult * atr, _Digits);
   double tp    = NormalizeDouble(bid - ATR_TP_Mult * atr, _Digits);

   if(trade.Sell(LotSize, _Symbol, bid, sl, tp, "OT_v4"))
      Print("✅ SELL | Bid=", bid, " SL=", sl, " TP=", tp, " ATR=", atr);
   else
      Print("❌ SELL FAILED | Error=", GetLastError());
}

void OnTick()
{
   // Manage trailing stops on every tick
   ManageTrailing();

   // Only act on new M15 candle
   static datetime lastBar = 0;
   datetime currentBar = iTime(_Symbol, PERIOD_M15, 0);
   if(currentBar == lastBar) return;
   lastBar = currentBar;

   // Filters
   if(!IsSessionActive()) return;
   if(IsNewsTime()) { Print("⏸ News filter active - skipping"); return; }
   if(CountMyTrades() >= MaxTrades) return;

   // Get indicator values
   if(CopyBuffer(hFast,  0, 0, 3, fastBuf)  < 3) return;
   if(CopyBuffer(hSlow,  0, 0, 3, slowBuf)  < 3) return;
   if(CopyBuffer(hTrend, 0, 0, 2, trendBuf) < 2) return;
   if(CopyBuffer(hRSI,   0, 0, 3, rsiBuf)   < 3) return;
   if(CopyBuffer(hATR,   0, 0, 2, atrBuf)   < 2) return;

   double fastPrev  = fastBuf[1];
   double slowPrev  = slowBuf[1];
   double fastCurr  = fastBuf[0];
   double slowCurr  = slowBuf[0];
   double rsi       = rsiBuf[0];
   double trend     = trendBuf[0];
   double atr       = atrBuf[0];
   double price     = SymbolInfoDouble(_Symbol, SYMBOL_BID);

   // Trend direction (H1 200 EMA)
   bool upTrend   = (price > trend);
   bool downTrend = (price < trend);

   // BUY: EMA cross up + RSI bullish + uptrend
   bool buySignal = (fastPrev < slowPrev) &&
                    (fastCurr > slowCurr) &&
                    (rsi > 50) &&
                    (rsi < RSIOverbought) &&
                    upTrend;

   // SELL: EMA cross down + RSI bearish + downtrend
   bool sellSignal = (fastPrev > slowPrev) &&
                     (fastCurr < slowCurr) &&
                     (rsi < 50) &&
                     (rsi > RSIOversold) &&
                     downTrend;

   if(buySignal)
   {
      Print("📈 BUY SIGNAL | Fast=", fastCurr, " Slow=", slowCurr, 
            " RSI=", rsi, " Trend=", trend, " ATR=", atr);
      DoBuy(atr);
   }

   if(sellSignal)
   {
      Print("📉 SELL SIGNAL | Fast=", fastCurr, " Slow=", slowCurr, 
            " RSI=", rsi, " Trend=", trend, " ATR=", atr);
      DoSell(atr);
   }
}
