//+------------------------------------------------------------------+
//|                                          OperonTrader.mq5        |
//|                       MetaTrader 5 Expert Advisor                |
//|                                    for XAUUSD & EURUSD           |
//|                                                                  |
//| Strategy: EMA Crossover + RSI Filter                             |
//|                                                                  |
//| BUY Signal: Fast EMA crosses ABOVE Slow EMA, RSI 50-70            |
//| SELL Signal: Fast EMA crosses BELOW Slow EMA, RSI 30-50           |
//|                                                                  |
//| Risk Settings: Medium-High                                       |
//| - 4% Risk per trade                                              |
//| - Max 3 open trades (1 per symbol)                               |
//| - Trailing stop activates after 15 pips                          |
//+------------------------------------------------------------------+

//+------------------------------------------------------------------+
//| Installation Guide                                                |
//+------------------------------------------------------------------+
//| 1. Copy this file to MT5 Data Folder → MQL5 → Experts            |
//| 2. Compile in MetaEditor (press F7)                              |
//| 3. Drag onto XAUUSD M15 chart                                    |
//| 4. Set TradeBothSymbols = true                                   |
//| 5. Enable AutoTrading button in MT5                              |
//+------------------------------------------------------------------+

#property copyright "OperonTrader"
#property version   "1.0.0"
#property description "EMA Crossover + RSI Filter EA for XAUUSD & EURUSD"
#property description "M15 Timeframe, Medium-High Risk Settings"
#property strict

//+------------------------------------------------------------------+
//| Input Parameters                                                 |
//+------------------------------------------------------------------+
input double RiskPercent = 4.0;            // Risk % per trade (Medium-High)
input int FastEMA = 8;                     // Fast EMA period
input int SlowEMA = 21;                    // Slow EMA period  
input int RSIPeriod = 14;                  // RSI period
input double SL_Pips_EURUSD = 30;          // Stop Loss pips EURUSD
input double TP_Pips_EURUSD = 60;          // Take Profit pips EURUSD
input double SL_Points_Gold = 300;         // Stop Loss points Gold
input double TP_Points_Gold = 600;         // Take Profit points Gold
input bool UseTrailingStop = true;         // Use trailing stop
input bool TradeBothSymbols = true;        // Trade both XAUUSD and EURUSD

//+------------------------------------------------------------------+
//| Global Variables                                                 |
//+------------------------------------------------------------------+
int fastEmaHandle, slowEmaHandle, rsiHandle;
double fastEmaBuffer[], slowEmaBuffer[], rsiBuffer[];
string eaName = "OperonTrader";
datetime lastTradeTime = 0;

//+------------------------------------------------------------------+
//| OnInit - Initialize indicators and validate settings             |
//+------------------------------------------------------------------+
int OnInit()
{
    // Initialize indicators
    fastEmaHandle = iMA(_Symbol, PERIOD_M15, FastEMA, 0, MODE_EMA, PRICE_CLOSE);
    slowEmaHandle = iMA(_Symbol, PERIOD_M15, SlowEMA, 0, MODE_EMA, PRICE_CLOSE);
    rsiHandle = iRSI(_Symbol, PERIOD_M15, RSIPeriod, PRICE_CLOSE);
    
    if(fastEmaHandle == INVALID_HANDLE || slowEmaHandle == INVALID_HANDLE || rsiHandle == INVALID_HANDLE)
    {
        Print("Error creating indicators!");
        return(INIT_FAILED);
    }
    
    // Set indicator buffers
    ArraySetAsSeries(fastEmaBuffer, true);
    ArraySetAsSeries(slowEmaBuffer, true);
    ArraySetAsSeries(rsiBuffer, true);
    
    // Copy recent data
    CopyBuffer(fastEmaHandle, 0, 0, 3, fastEmaBuffer);
    CopyBuffer(slowEmaHandle, 0, 0, 3, slowEmaBuffer);
    CopyBuffer(rsiHandle, 0, 0, 3, rsiBuffer);
    
    Print(eaName, " initialized on ", _Symbol, " M15");
    Print("Risk: ", RiskPercent, "% per trade");
    Print("Max trades: 3 (1 per symbol)");
    Print("Trailing stop activates after 15 pips profit");
    
    return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| OnDeinit - Cleanup                                               |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
    // Release indicator handles
    if(fastEmaHandle != INVALID_HANDLE) IndicatorRelease(fastEmaHandle);
    if(slowEmaHandle != INVALID_HANDLE) IndicatorRelease(slowEmaHandle);
    if(rsiHandle != INVALID_HANDLE) IndicatorRelease(rsiHandle);
    
    Print(eaName, " deinitialized. Reason: ", reason);
}

//+------------------------------------------------------------------+
//| OnTick - Main trading logic                                      |
//+------------------------------------------------------------------+
void OnTick()
{
    // Update indicator data
    CopyBuffer(fastEmaHandle, 0, 0, 3, fastEmaBuffer);
    CopyBuffer(slowEmaHandle, 0, 0, 3, slowEmaBuffer);
    CopyBuffer(rsiHandle, 0, 0, 3, rsiBuffer);
    
    // Manage trailing stops for all open positions
    ManageTrailingStop();
    
    // Check trade signals on new candle
    static datetime lastBarTime = 0;
    datetime currentBarTime = iTime(_Symbol, PERIOD_M15, 0);
    
    if(currentBarTime != lastBarTime)
    {
        lastBarTime = currentBarTime;
        
        // Skip trading during high-impact news window (Friday 17:00-18:00 server time)
        if(IsNewsTime())
        {
            return;
        }
        
        // Check if we can open new trades (max 3 trades, 1 per symbol)
        if(CanOpenTrade())
        {
            int signal = CheckSignal();
            
            if(signal == BUY)
            {
                OpenTrade(OP_BUY);
            }
            else if(signal == SELL)
            {
                OpenTrade(OP_SELL);
            }
        }
    }
}

//+------------------------------------------------------------------+
//| CheckSignal - Returns BUY, SELL, or NONE                         |
//+------------------------------------------------------------------+
int CheckSignal()
{
    // Need at least 3 bars of data for crossover detection
    if(ArraySize(fastEmaBuffer) < 3 || ArraySize(slowEmaBuffer) < 3 || ArraySize(rsiBuffer) < 3)
        return(0);
    
    double fastPrev = fastEmaBuffer[1];
    double fastCurr = fastEmaBuffer[0];
    double slowPrev = slowEmaBuffer[1];
    double slowCurr = slowEmaBuffer[0];
    double rsiValue = rsiBuffer[0];
    
    // Check for BUY signal
    // Fast EMA crosses ABOVE Slow EMA AND RSI between 50-70 (not overbought)
    if(fastPrev < slowPrev && fastCurr > slowCurr)
    {
        if(rsiValue > 50 && rsiValue < 70)
        {
            return(BUY);
        }
    }
    
    // Check for SELL signal
    // Fast EMA crosses BELOW Slow EMA AND RSI between 30-50 (not oversold)
    if(fastPrev > slowPrev && fastCurr < slowCurr)
    {
        if(rsiValue < 50 && rsiValue > 30)
        {
            return(SELL);
        }
    }
    
    return(0); // No signal
}

//+------------------------------------------------------------------+
//| OpenTrade - Opens trade with proper SL/TP and lot size           |
//+------------------------------------------------------------------+
void OpenTrade(int tradeType)
{
    double lotSize = CalculateLotSize(tradeType);
    double price = (tradeType == OP_BUY) ? Ask : Bid;
    double sl = 0, tp = 0;
    
    // Calculate SL/TP based on symbol
    if(_Symbol == "XAUUSD" || _Symbol == "GOLD")
    {
        double slPoints = SL_Points_Gold;
        double tpPoints = TP_Points_Gold;
        
        if(tradeType == OP_BUY)
        {
            sl = price - slPoints * Point;
            tp = price + tpPoints * Point;
        }
        else
        {
            sl = price + slPoints * Point;
            tp = price - tpPoints * Point;
        }
    }
    else // EURUSD or other currency pairs
    {
        double slPips = SL_Pips_EURUSD;
        double tpPips = TP_Pips_EURUSD;
        double pipSize = (Digits == 3 || Digits == 5) ? 10 * Point : Point;
        
        if(tradeType == OP_BUY)
        {
            sl = price - slPips * pipSize;
            tp = price + tpPips * pipSize;
        }
        else
        {
            sl = price + slPips * pipSize;
            tp = price - tpPips * pipSize;
        }
    }
    
    // Prepare trade request
    MqlTradeRequest request = {0};
    MqlTradeResult result = {0};
    
    request.action = TRADE_ACTION_DEAL;
    request.symbol = _Symbol;
    request.volume = lotSize;
    request.type = (tradeType == OP_BUY) ? ORDER_TYPE_BUY : ORDER_TYPE_SELL;
    request.price = price;
    request.sl = sl;
    request.tp = tp;
    request.deviation = 5;
    request.magic = 12345;
    request.comment = eaName;
    request.type_filling = ORDER_FILLING_FOK;
    
    // Send trade request
    if(OrderSend(request, result))
    {
        Print("Trade opened: ", (tradeType == OP_BUY ? "BUY" : "SELL"), 
              " ", _Symbol, " lots: ", lotSize);
        lastTradeTime = TimeCurrent();
    }
    else
    {
        Print("Trade failed: ", result.retcode, " - ", GetLastError());
    }
}

//+------------------------------------------------------------------+
//| CalculateLotSize - Risk-based lot calculation                     |
//+------------------------------------------------------------------+
double CalculateLotSize(int tradeType)
{
    double accountBalance = AccountInfoDouble(ACCOUNT_BALANCE);
    double riskAmount = accountBalance * (RiskPercent / 100.0);
    
    double slDistance = 0;
    
    if(_Symbol == "XAUUSD" || _Symbol == "GOLD")
    {
        slDistance = SL_Points_Gold * Point;
    }
    else
    {
        double pipSize = (Digits == 3 || Digits == 5) ? 10 * Point : Point;
        slDistance = SL_Pips_EURUSD * pipSize;
    }
    
    // Calculate lot size: riskAmount / (slDistance * tickValue)
    double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
    double lotStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
    double minLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
    double maxLot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
    
    if(tickValue <= 0 || slDistance <= 0) return minLot;
    
    double lots = riskAmount / (slDistance * tickValue);
    
    // Normalize lot size
    lots = MathFloor(lots / lotStep) * lotStep;
    lots = MathMax(minLot, MathMin(lots, maxLot));
    
    return lots;
}

//+------------------------------------------------------------------+
//| ManageTrailingStop - Updates trailing stop on open positions     |
//+------------------------------------------------------------------+
void ManageTrailingStop()
{
    if(!UseTrailingStop) return;
    
    double trailingDistance = 0;
    double profitTrigger = 0;
    
    // Set trailing parameters based on symbol
    if(_Symbol == "XAUUSD" || _Symbol == "GOLD")
    {
        trailingDistance = 150 * Point;  // 150 points = 15 pips
        profitTrigger = 15 * Point * 10; // 15 pips trigger
    }
    else
    {
        double pipSize = (Digits == 3 || Digits == 5) ? 10 * Point : Point;
        trailingDistance = 15 * pipSize;  // 15 pips
        profitTrigger = 15 * pipSize;     // 15 pips trigger
    }
    
    // Loop through open positions
    for(int i = PositionsTotal() - 1; i >= 0; i--)
    {
        if(PositionSelect(_Symbol))
        {
            if(PositionGetInteger(POSITION_MAGIC) != 12345) continue;
            
            double currentSL = PositionGetDouble(POSITION_SL);
            double currentPrice = PositionGetDouble(POSITION_PRICE_CURRENT);
            double openPrice = PositionGetDouble(POSITION_PRICE_OPEN);
            long type = PositionGetInteger(POSITION_TYPE);
            
            if(type == POSITION_TYPE_BUY)
            {
                double newSL = currentPrice - trailingDistance;
                double profit = currentPrice - openPrice;
                
                if(profit >= profitTrigger && newSL > currentSL)
                {
                    MqlTradeRequest request = {0};
                    MqlTradeResult result = {0};
                    
                    request.action = TRADE_ACTION_SLTP;
                    request.symbol = _Symbol;
                    request.sl = newSL;
                    request.position = PositionGetInteger(POSITION_TICKET);
                    
                    OrderSend(request, result);
                }
            }
            else if(type == POSITION_TYPE_SELL)
            {
                double newSL = currentPrice + trailingDistance;
                double profit = openPrice - currentPrice;
                
                if(profit >= profitTrigger && (currentSL == 0 || newSL < currentSL))
                {
                    MqlTradeRequest request = {0};
                    MqlTradeResult result = {0};
                    
                    request.action = TRADE_ACTION_SLTP;
                    request.symbol = _Symbol;
                    request.sl = newSL;
                    request.position = PositionGetInteger(POSITION_TICKET);
                    
                    OrderSend(request, result);
                }
            }
        }
    }
}

//+------------------------------------------------------------------+
//| CanOpenTrade - Check if we can open new trade                    |
//+------------------------------------------------------------------+
bool CanOpenTrade()
{
    int totalXAU = 0;
    int totalEUR = 0;
    int totalTrades = 0;
    
    for(int i = PositionsTotal() - 1; i >= 0; i--)
    {
        if(PositionSelectByTicket(PositionGetTicket(i)))
        {
            string symbol = PositionGetString(POSITION_SYMBOL);
            long magic = PositionGetInteger(POSITION_MAGIC);
            
            if(magic == 12345)
            {
                totalTrades++;
                if(symbol == "XAUUSD" || symbol == "GOLD") totalXAU++;
                else if(symbol == "EURUSD") totalEUR++;
            }
        }
    }
    
    // Max 3 trades total, 1 per symbol
    if(totalTrades >= 3) return false;
    if(totalXAU >= 1) return false;
    if(totalEUR >= 1) return false;
    
    return true;
}

//+------------------------------------------------------------------+
//| IsNewsTime - Check if trading is paused (Friday news)            |
//+------------------------------------------------------------------+
bool IsNewsTime()
{
    MqlDateTime dt;
    TimeToStruct(TimeCurrent(), dt);
    
    // Friday 17:00-18:00 server time
    if(dt.day_of_week == 5 && dt.hour >= 17 && dt.hour < 18)
    {
        return true;
    }
    
    return false;
}
//+------------------------------------------------------------------+
