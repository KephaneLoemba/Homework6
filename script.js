// This is my scipt.

let previousCity;
let newCity;
let buttonList = [];
let addCityButton = document.getElementById("search-button");

addCityButton.addEventListener("click", createCityButton);

renderButtonHistory();

function createCityButton() {
  newCity = document.getElementById("search-input").value;
  newCity = newCity.trim();
  newCity = capitalizeFirstLetter(newCity);

  if (newCity === "") {
    alert("enter a city, and try again!");
  } else if (buttonList.includes(newCity)) {
    alert(
      "This city is allready among your search history. Add a different one! :)"
    );
  } else {
    buttonList.push(newCity);

    renderButtonHistory();
    renderCurrentWeather(newCity)
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateUVcolor(anAmount) {
  UVspan = document.getElementById("uv-index");
  ourNumber = parseInt(anAmount);
  if (ourNumber <= 2) {
    UVspan.classList.remove("bg-danger", "bg-warning");
    UVspan.classList.add("bg-success");
  } else if (ourNumber > 2 && ourNumber < 8) {
    UVspan.classList.remove("bg-danger", "bg-success");
    UVspan.classList.add("bg-warning");
  } else {
    UVspan.classList.remove("bg-success", "bg-warning");
    UVspan.classList.add("bg-danger");
  }
}

function renderButtonHistory() {
  if (buttonList.length > 0) {
    let historyDiv = document.getElementById("buttons-div");

    historyDiv.textContent = "";

    for (let i = 0; buttonList.length > i; i++) {
      let newButton = document.createElement("button");
      newButton.classList.add(
        "btn",
        "btn-light",
        "btn-lg",
        "btn-block",
        "text-left"
      );
      newButton.setAttribute("data-city", buttonList[i]);
      newButton.innerHTML = buttonList[i];

      newButton.addEventListener("click", renderCurrentWeather);

      historyDiv.appendChild(newButton);
    }
  }
}

function renderCurrentWeather(aNewCity) {


  let APIKey = "fdd4402a2a16fa66299bd0a6a4043864";
  let cityName

  if (this !== window) {
    cityName = this.getAttribute("data-city") 
  } else if (aNewCity) {
    cityName = aNewCity
  } else {
    cityName = previousCity
  }

  // Here we are building the URLs we need to query the database
  let queryURL3 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial&appid=" +
    APIKey;

  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let temps = data.main.temp;
      document.getElementById("icon-day-1").previousSibling.innerHTML =
        "<b>" + cityName + "</b>" + " (" + moment().format("L") + ") ";
      document.getElementById("icon-day-1").src =
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      document.getElementById("temp").textContent = temps.toFixed(2);
      document.getElementById("humid").textContent = data.main.humidity;
      document.getElementById("wind-speed").textContent = data.wind.speed;

      return data.coord;
    })
    .then(function(coords) {
      let thatLat = coords.lat;
      let thatLon = coords.lon;

      let queryURL2 =
        "https://api.openweathermap.org/data/2.5/uvi?appid=" +
        APIKey +
        "&lat=" +
        thatLat +
        "&lon=" +
        thatLon;

      fetch(queryURL2)
        .then(function(responseUV) {
          return responseUV.json();
        })
        .then(function(dataUV) {
          let UVnumber = dataUV.value;
          updateUVcolor(UVnumber);

          document.getElementById("uv-index").textContent = dataUV.value;
        });
    });

    fetch(queryURL3)
        .then(function(response){
            return response.json()
        })
        .then(function(dataForecast) {
            console.log(dataForecast)
            let forecastCards = document.querySelectorAll('.forecast');
            let advanceDays = 1
            let dayIndex = 7

            for (let thatCard of forecastCards) {
                thatCard.children[0].textContent = moment().add(advanceDays, 'days').format("L")
                thatCard.children[1].src =
                "https://openweathermap.org/img/wn/" + dataForecast.list[dayIndex].weather[0].icon + ".png"
                thatCard.children[2].textContent = 'Temp: ' + dataForecast.list[dayIndex].main.temp +'°F'
                thatCard.children[3].textContent = 'Humidity: ' + dataForecast.list[dayIndex].main.humidity +'%'

                advanceDays++;
                dayIndex += 8;

            }
        })
}

// console.log(document.getElementById('search-button').textcontent)
