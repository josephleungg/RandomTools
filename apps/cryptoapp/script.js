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
    console.log(div.id);

    // grabbing the selected div uuid
    const selectedCryptoDiv = document.getElementById(div.id);
    console.log(selectedCryptoDiv.dataset.variable1);

    // https://developers.coinranking.com/api/documentation/coins
    // display all the coins details
    // show the coins rank, percentage change next to the symbol or name, put the price, marketcap, 24h volume
    // let user select the change percentage for 1h, 3h, 12h, 24h, 7d, 30d, 3m, 1y, 3y, 5y, in price history
};
