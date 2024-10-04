# Stock Trading Bot

A dynamic trading bot built with Node.js that simulates stock trading based on real-time market data fetched from the Finnhub API. The bot allows users to define buy and sell thresholds and tracks the performance of trades over multiple cycles.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Logging](#logging)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Features
- **Real-Time Price Fetching**: Fetches live stock prices using the Finnhub API for accurate trading decisions.
- **Dynamic Trading Logic**: Users can specify buying and selling thresholds for automated trading based on market fluctuations.
- **Detailed Trading Logs**: Keeps track of trades made, current balance, stock quantities, and portfolio value after each trading cycle.
- **User-Friendly GUI**: Built with Express.js, providing an intuitive interface for user interaction.
- **Summary Reports**: Displays a summary of trades made during the session, including total stocks bought and sold, and final balance.

## Technologies Used
- **Node.js**: Backend server environment.
- **Express.js**: Web framework for building the GUI and handling HTTP requests.
- **Finnhub API**: For fetching real-time stock price data.
- **Winston**: For logging application activity.
- **HTML/CSS**: For the frontend interface.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/trading-bot.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd trading-bot
    ```

3. **Install the dependencies**:
    ```bash
    npm install
    ```

4. **Create a `.env` file** in the root directory and add your Finnhub API key:
    ```plaintext
    API_KEY=your_finnhub_api_key
    ```

5. **Run the server**:
    ```bash
    npm start
    ```

6. **Access the application** by visiting `http://localhost:3000` in your browser.

## Usage

- Enter the stock symbol you wish to trade, along with your desired buy and sell thresholds in percentage.
- Click the "Submit" button to start trading.
- The bot will execute trades for 10 cycles and display a summary of actions taken.

## Logging
The bot uses the Winston logging library to record trading activity, including:
- Current price
- Actions taken (buy/sell)
- Updated balance and stock quantities
- Total portfolio value at the end of each cycle

Logs can be helpful for debugging and performance analysis.

## Future Enhancements
- Implement machine learning algorithms for predictive analytics on stock prices.
- Enhance user interface with real-time performance dashboards.
- Introduce a feature for users to set stop-loss and take-profit levels.
- Expand support for multiple stock symbols in a single trading session.

## Contributing
Contributions are welcome! If you have suggestions for improvements or want to report bugs, please open an issue or submit a pull request.
