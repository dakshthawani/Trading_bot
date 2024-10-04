import { getStockPrice } from './dataHandler.js';

// Function to simulate trading logic
async function trade(stockSymbol, initialPrice, thresholdBuy, thresholdSell, currentBalance, stockQuantity) {
    try {
        const currentPrice = await getStockPrice(stockSymbol);
        const priceFluctuation = Math.random() * 0.1 - 0.05;
        const currentPriceWithFluctuation = currentPrice + currentPrice * priceFluctuation;

        const buyLimit = initialPrice * (1 - thresholdBuy / 100);
        const sellLimit = initialPrice * (1 + thresholdSell / 100);

        console.log(`Current Price: ${currentPriceWithFluctuation.toFixed(4)}`);
        console.log(`Buy Limit: ${buyLimit.toFixed(4)}, Sell Limit: ${sellLimit.toFixed(4)}`);
        console.log(`Current Balance: $${currentBalance.toFixed(2)}, Stock Quantity: ${stockQuantity}`);

        if (currentPriceWithFluctuation < buyLimit && currentBalance >= currentPriceWithFluctuation) {
            const buyQuantity = Math.floor(currentBalance / currentPriceWithFluctuation);
            currentBalance -= buyQuantity * currentPriceWithFluctuation;
            stockQuantity += buyQuantity;
            console.log(`Bought ${buyQuantity} units at $${currentPriceWithFluctuation.toFixed(2)}`);
        } else if (currentPriceWithFluctuation > sellLimit && stockQuantity > 0) {
            currentBalance += stockQuantity * currentPriceWithFluctuation;
            console.log(`Sold ${stockQuantity} units at $${currentPriceWithFluctuation.toFixed(2)}`);
            stockQuantity = 0;
        }

        console.log(`Updated Balance: $${currentBalance.toFixed(2)}`);
        console.log(`Updated Stock Quantity: ${stockQuantity}`);

        return { currentBalance, stockQuantity };
    } catch (error) {
        console.error("Error during trading:", error);
    }
}


export { trade };
