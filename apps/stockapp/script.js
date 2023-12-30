// getting ticker from search box
const form = document.getElementById("ticker-form");
const input = document.getElementById("symbol-input");

// submitting to 
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const symbol = input.value.toUpperCase();

    // url with symbol
    const url = 'https://alpha-vantage.p.rapidapi.com/query?function=GLOBAL_QUOTE&symbol=' + symbol + '&datatype=json';
    // rapidAPI alpha vantage key
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '659deefe92msh1a6566e84b747d8p12adb6jsn80582ea718c7',
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    // function calling from api
    async function getStockData() {
        const response = await fetch(url, options);
        const data = await response.json();
        const errorMsgElement = document.getElementById("error-check");
        console.log(data);

        // checking if the ticker exists
        try {
            if(!data["Global Quote"]["01. symbol"]){
                throw new Error("Symbol not found");
            }

            errorMsgElement.innerHTML = "";
        }catch (error) {
            console.error("Error fetching stock data: ", error);
            errorMsgElement.innerHTML = "Error fetching stock data: " + error.message;
        }

        // setting constants to hold data values
        const tickerSymbol = data["Global Quote"]["01. symbol"];
        const lastPrice = parseFloat(data["Global Quote"]["05. price"]).toFixed(1);
        const dailyHigh = parseFloat(data["Global Quote"]["03. high"]).toFixed(1);
        const dailyLow = parseFloat(data["Global Quote"]["04. low"]).toFixed(1);
        let changeSymbol = "+";
        let changeNum = parseFloat(data["Global Quote"]["09. change"]).toFixed(2);
        let changePerc = parseFloat(data["Global Quote"]["10. change percent"]).toFixed(2);
        // checking if the price change is negative
        if (data["Global Quote"]["09. change"].substring(0,1) === "-") {
            changeSymbol = data["Global Quote"]["09. change"].substring(0,1);
            changeNum = parseFloat(data["Global Quote"]["09. change"].substring(1)).toFixed(2);
            changePerc = parseFloat(data["Global Quote"]["10. change percent"].substring(1)).toFixed(2);
        }

        // getting card section
        let cardSection = document.getElementById("card-section");

        // checking if the stock is a gainer or loser for the day
        // if (changeNum > 0) {
        //     document.getElementById("change-amount").style.color = "#00a300";
        //     document.getElementById("change-percent").style.color = "#00a300";
        // } else if (changeNum < 0) {
        //     document.getElementById("change-amount").style.color = "#cc0000";
        //     document.getElementById("change-percent").style.color = "#cc0000";
        // }

        // adding cards
        cardSection.innerHTML += `
        <div class="cards">
                        
            <p id="ticker-symbol">Ticker Symbol<br><span>${tickerSymbol}</span></p>
            <p id="last-price">Last Price<br><span>$${lastPrice}</span></p>

            <div class="card-row">
                <p><span class="bold-titles">Daily High</span><br><span>$${dailyHigh}</span></p>
                <p><span class="bold-titles">Daily Low</span><br><span>$${dailyLow}</span></p>
            </div>

            <div class="card-row">
                <p><span class="bold-titles">Change</span><br><span id="change-amount">${changeSymbol}$${changeNum}</span></p>
                <p><span class="bold-titles">% Change</span><br><span id="change-percent">${changeSymbol}${changePerc}%</span></p>
            </div>
        
        </div>
        `;
    }

    getStockData();

    // for debugging
    console.log(symbol);
    console.log(url);
});