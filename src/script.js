/////////////////////////////////////////////
// welcome message
let time = new Date().toLocaleString('en-CA', { hour: 'numeric', hour12: false});
time = parseInt(time);

// changing welcome message based on what time it is during the day
if (time >= 6 && time < 12) {
    document.getElementById("welcome-message").innerHTML = "GoodMorning";
} else if (time >= 12 && time < 18) {
    document.getElementById("welcome-message").innerHTML = "Good Afternoon";
} else if (time >= 18 && time < 22) {
    document.getElementById("welcome-message").innerHTML = "Good Evening";
} else {
    document.getElementById("welcome-message").innerHTML = "GoodNight";
}

// handling form submitting name
if (localStorage.getItem("name")){
    document.getElementById("name-box").innerHTML = "<p id='name-text'>" + localStorage.getItem("name") + "</p>";
} else {
    // event listener looking for submit button
    document.getElementById("name-form").addEventListener("submit", function(event){
        event.preventDefault();
        let nameInput = document.getElementById("name-input").value;
        if (nameInput.trim() !== '') {
            localStorage.setItem("name",nameInput);
            document.getElementById("name-box").innerHTML = "<p id='name-text'>" + localStorage.getItem("name") + "</p>";
        } else {
            alert('Please enter your name.');
        }
    })
}

// used for debugging form changing name
// localStorage.setItem("name", "");
// console.log(localStorage.getItem("name"));

/////////////////////////////////////////////
// weather widget
const apiKey = "a24caf6011181e9d5988c02c90573ad8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=toronto,ca";

async function checkWeather(){
    // fetching weather api
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    let data = await response.json();

    // displaying weather info
    document.getElementById("city").innerHTML = data.name + ", " + data.sys.country;
    document.getElementById("wicon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    document.getElementById("temp").innerHTML = Math.ceil(data.main.temp - 273) + "°C" + " " + data.weather[0].main;
    document.getElementById("humidity").innerHTML = "humidity <br>" + data.main.humidity + "%";
    document.getElementById("feels-like").innerHTML = "feels like <br>" + Math.ceil(data.main.feels_like - 273) + "°C";

    // displaying json info
    console.log(data);
}

checkWeather();

/////////////////////////////////////////////
// menu functions

// functions for changing query string on click
function homeQuery() {
    let queryStringIndex = window.location.href.indexOf('?');
    if (queryStringIndex !== -1) {
        let homeUrl = window.location.href.substring(0, queryStringIndex);
        window.location.href = homeUrl;
    }
}

function aboutQuery() {
    let queryStringIndex = window.location.href.indexOf('?');
    let homeUrl = window.location.href.substring(0, queryStringIndex);
    let newUrl = homeUrl + "?param=about";
    window.location.href = newUrl;
}

function contactQuery() {
    let queryStringIndex = window.location.href.indexOf('?');
    let homeUrl = window.location.href.substring(0, queryStringIndex);
    let newUrl = homeUrl + "?param=contact";
    window.location.href = newUrl;
}

// function that checks the current query string and displays the content depending on the query string
function displayContent() {
    // variable holding the query string
    let queryString = window.location.search;

    // variables that hold the html elements
    const aboutString = `
    <div class="row">
      <div class="col-md-6">
        <div class="about-box">
          <p>
            I created this website to compile the various tools and apps I developed while learning Javascript. 
            These projects don't fit into specific categories but are practical tools I use daily. 
            The site serves as a repository for my work and a convenient way for me to access these tools whenever I need them. 
            Additionally, sharing these tools publicly allows others to benefit from my work and potentially learn from the code.
            If there are any recommendations or bugs that you would like to report, my contact information can be found <span onclick="contactQuery()" id="clickable-text">here</span>.
          </p>
        </div>
      </div>
      <div class="col-md-6 languages">
        <div class="text-center">languages & frameworks used</div>
        <div class="language-pics">
          <img id="html" src="./src/images/html-logo.png" alt="html">
          <img id="css" src="./src/images/css-logo.png" alt="css">
          <img id="js" src="./src/images/javascript-logo.png" alt="js">     
          <img id="bootstrap" src="./src/images/bootstrap-logo.png" alt="bootstrap">
          <img id="openweather" src="./src/images/openweathermap-logo.png" alt="openweathermap">            
        </div>
      </div>
    </div>
  `;

    const contactString = `
    <div class="row">
        <div class="col-md-12">
            <div class="contact-box">
                <h1 id="contact-header">Contact Info</h1>
                <p>
                    Feel free to contact me through email or Linkedin if you have any feedback or suggestions
                </p>

                <p>
                    <br>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4"/>
                    </svg>
                    <a href="https://www.linkedin.com/in/josephleung1/" target="_blank" class="text-decoration-none">LinkedIn</a>
                </p>

                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                    <a href="https://github.com/josephleungg" target="_blank" class="text-decoration-none">Github</a>
                </p>

                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                    </svg>
                    <a href="mailto:codingapiburner@gmail.com" class="text-decoration-none">codingapiburner@gmail.com</a>
                </p>
            </div>
        </div>
    </div>
    `;

    const homeString = ``;

    if (queryString.includes("param=about")) {
        document.getElementById("content").innerHTML = aboutString;
    }else if (queryString.includes("param=contact")) {
        document.getElementById("content").innerHTML = contactString;
    }else {
        document.getElementById("content").innerHTML = "";
    }
}

displayContent();

