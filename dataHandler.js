import https from 'https';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

function getStockPrice(stockSymbol) {
    return new Promise((resolve, reject) => {
        const url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${process.env.API_KEY}`;

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const stockData = JSON.parse(data);
                    console.log("API Response:", stockData);  // Log the full API response
                    if (stockData && stockData.c !== undefined) {
                        const currentPrice = stockData.c;  // 'c' is the current price field
                        resolve(currentPrice);  // Return the current price
                    } else {
                        console.error("Invalid response from Finnhub API:", stockData);
                        reject(new Error("Invalid response from Finnhub API."));
                    }
                } catch (error) {
                    console.error("Error parsing API response:", error);
                    reject(error);
                }
            });
        }).on('error', (error) => {
            console.error("Error fetching stock price:", error);
            reject(error);
        });
    });
}

export { getStockPrice };