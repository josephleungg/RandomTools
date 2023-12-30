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
        console.log(data);
    }

    try {
        getStockData();
    } catch (error) {
        console.error(error);
    }

    // for debugging
    console.log(symbol);
    console.log(url);
});