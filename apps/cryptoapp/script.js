// getting ticker from search box
const form = document.getElementById("crypto-form");
const input = document.getElementById("symbol-input");

// api-key
const options = {
    headers: {
      'x-access-token': 'coinrankinga5ea8ae95e56786fdcdcff1eb22a8dd8aced2f636db57f80',
    },
};

// main function used to select which crypto the user wanted to search for
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let sectionSelect = document.getElementById('card-section');
    const crypto = input.value;

    // constant declaration
    const url = 'https://api.coinranking.com/v2/search-suggestions?query=' + crypto;

    // function for searching through coins list based on search form
    async function searchCoin(){
        // fetching results from api
        let response = await fetch(url, options);
        let results = await response.json();

        // variables selecting elements for displaynig data
        const errorMsgElement = document.getElementById("error-check");
        sectionSelect.innerHTML = ""; // resetting the page after every submit
    
        // testing if there are any coins related to the one requested, also change number of results
        try {
            if(results.data.coins.length === 0){
                throw new Error("Crypto not found");
            }

            document.getElementById('num-results').innerHTML = results.data.coins.length + " results found";
            errorMsgElement.innerHTML = "";
        }catch (error) {
            document.getElementById('num-results').innerHTML = "0 results found";
            console.error("Error fetching crypto data: ", error);
            errorMsgElement.innerHTML = "Error fetching crypto data";
            return;
        }

        
        // for looping through all of the coins
        for(let i = 0; i < results.data.coins.length; i++){
            let cryptoPrice = parseFloat(results.data.coins[i].price).toFixed(0);
            sectionSelect.innerHTML += `
            <div class="crypto-result">
                <div class="card-row">
                    <p><span class="fw-bold">Crypto Name</span><br><span>${results.data.coins[i].name}</span></p>
                    <p><span class="fw-bold">Symbol</span><br><span>${results.data.coins[i].symbol}</span></p>
                </div>

                <div class="card-row">
                    <p><span class="fw-bold">Price</span><br><span>$${cryptoPrice}</span></p>
                    <div class="cryptoID" id="crypto${i}" data-variable1="${results.data.coins[i].uuid}" onclick="getCryptoInfo(this)">view more...</div>
                </div>
            </div>
        `;
        }

        console.log(results);
    }
    searchCoin();

});

// function used to grab all of the crypto data from the UUID given in the div from the form submit
function getCryptoInfo(div){

    // resetting results div
    document.getElementById('num-results').innerHTML = "";

    // grabbing the selected div uuid
    const selectedCryptoDiv = document.getElementById(div.id);

    // fetching coinranking coin details from api
    async function coinDetails() {
        const url = "https://api.coinranking.com/v2/coin/" +  selectedCryptoDiv.dataset.variable1;
        let response = await fetch(url, options);
        let results = await response.json();

        // setting variables from coin details
        const coinName = results.data.coin.name;
        const coinSymb = results.data.coin.symbol;
        const coinPrice = parseInt(parseFloat(results.data.coin.price).toFixed(0)).toLocaleString();
        const percentChange = parseFloat(results.data.coin.change);
        // checking if the percentage is negative or positive
        let changeSymbol = "";
        if(percentChange < 0){
            changeSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
          </svg>`;
        }else if(percentChange > 0){
            changeSymbol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
          </svg>`;
        };
        const marketCap = parseInt(results.data.coin.marketCap, 10).toLocaleString();
        const volume = parseInt(results.data.coin["24hVolume"]).toLocaleString();
        const ath = parseInt(parseFloat(results.data.coin.allTimeHigh.price).toFixed(0)).toLocaleString();
        let circulatingSupply = parseInt(results.data.coin.supply.circulating);
        let supplyPercent = (circulatingSupply/parseInt(results.data.coin.supply.max) * 100).toFixed(0);
        circulatingSupply = circulatingSupply.toLocaleString();

        // checking if the max supply is infinite
        if(isNaN(supplyPercent)){
            supplyPercent = "ꝏ Supply";
        }else{
            supplyPercent = String(supplyPercent) + "%";
        }

        // selecting card section to display the coin's info
        let sectionSelect = document.getElementById('card-section');

        // displaying coin details
        sectionSelect.innerHTML = `            
        <div class="col-md-4">
            <div id="crypto-details">
                <div class="card-row">
                    <p><span class="fs-2 fw-bold">${coinName}</span><span class="fs-5 fw-normal ms-2">${coinSymb}</span></p>
                    <p><span class="fs-2 fw-bold">$${coinPrice}</span><span class="ms-2">${changeSymbol}${percentChange}% (1d)</span></p>
                </div>

                <div class="card-row">
                    <p><span class="fw-bold">Market Cap</span><span class="ms-4">$${marketCap}</span></p>
                    <p><span class="fw-bold">Volume (24h)</span><span class="ms-3">$${volume}</span></p>
                    <p><span class="fw-bold">All Time High</span><span class="ms-3">$${ath}</span></p>
                </div>

                <div class="card-row">
                    <p><span class="fw-bold">Circulating Supply</span><br><span>${circulatingSupply} ${coinSymb} (${supplyPercent})</span></p>
                </div>
            </div>
        </div>

        <!-- column that displays chart -->
        <div class="col-md-8">
            <div class="tradingview-widget-container">
                <div id="chart"></div>
                <div class="tradingview-widget-copyright">
                    <a href="http://www.tradingview.com/" target="_blank" rel="noopener">
                        <span>Track all Markets on Tradingview</span>
                    </a>
                </div>
            </div>
        </div>
        `;

        // creating a new tradingview object once a user selects a coin
        new TradingView.widget(
            {
                "autosize": true,
                "symbol": "BINANCE:" + coinSymb + "USD",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "hide_legend": true,
                "withdateranges": true,
                "allow_symbol_change": true,
                "support_host": "https://www.tradingview.com",
                "container_id":"chart",
                "show_popup_button":true,
                "popup_width":"1000",
                "popup_height":"650",
            }
        );
        console.log(results);
        
    }

    coinDetails();
};
