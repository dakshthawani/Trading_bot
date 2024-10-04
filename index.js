import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getStockPrice } from './dataHandler.js';
import { trade } from './tradingLogic.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON

// Serve the HTML file for input
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle form submission
// Handle form submission
app.post("/", async (req, res) => {
    const stockSymbol = req.body.stockSymbol;
    const thresholdBuy = parseFloat(req.body.thresholdBuy);
    const thresholdSell = parseFloat(req.body.thresholdSell);
    let currentBalance = 1000; // Starting balance
    let stockQuantity = 0; // Starting stock quantity

    try {
        const initialPrice = await getStockPrice(stockSymbol);
        if (!initialPrice) {
            return res.send("Error fetching stock price.");
        }

        let tradingSummary = []; // To store trading actions for the summary

        // Start trading loop
        for (let i = 0; i < 10; i++) {
            console.log(`Trading cycle ${i + 1}`);
            const result = await trade(stockSymbol, initialPrice, thresholdBuy, thresholdSell, currentBalance, stockQuantity);
            currentBalance = result.currentBalance;
            stockQuantity = result.stockQuantity;

            // Log total value of the portfolio
            const totalValue = currentBalance + (stockQuantity * (await getStockPrice(stockSymbol)));
            console.log(`Total Portfolio Value: $${totalValue.toFixed(2)}`);

            // Store the summary of actions taken
            tradingSummary.push(`Cycle ${i + 1}: Balance: $${currentBalance.toFixed(2)}, Stocks: ${stockQuantity}, Action: ${result.action || "No action taken"}`);
        }

        // After the trading loop
        // let tradingSummary = [];
        let totalBought = 0;
        let totalSold = 0;


        res.send(`
            <h3>Trading Completed!</h3>
            <p>${tradingSummary.join('</p><p>')}</p>
            <p>Total Stocks Bought: ${totalBought}</p>
            <p>Total Stocks Sold: ${totalSold}</p>
            <p>Final Balance: $${currentBalance.toFixed(2)}</p>
        `);

    } catch (error) {
        console.error("Error during trading:", error);
        res.send("Error during trading.");
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
