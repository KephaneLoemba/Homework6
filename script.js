// This is my scipt.


let previousCity
let newCity
let buttonList = []
let addCityButton = document.getElementById('search-button')

addCityButton.addEventListener('click', createCityButton);

renderButtonHistory();

function createCityButton(){

    newCity = document.getElementById('search-input').value
    console.log(newCity)
    newCity = newCity.trim();

    if (newCity === "") {
        alert("enter a city, and try again!")
    }
    else if (buttonList.includes(newCity)) {
        alert("This city is allready among your search history. Add a different one! :)")
    }
    else {
        buttonList.push(newCity)
        console.log("a new city has been pushed!")
        console.log(buttonList)

        renderButtonHistory()
    }


}

function renderButtonHistory() {
    if (buttonList.length > 0) {

        let historyDiv = document.getElementById('buttons-div')

        historyDiv.textContent = ''

        for (let i = 0; buttonList.length > i; i++) {
        
        let newButton = document.createElement('button')
        newButton.classList.add('btn', 'btn-light', 'btn-lg', 'btn-block')
        newButton.setAttribute('data-city', buttonList[i]);
        newButton.innerHTML = buttonList[i]

        newButton.addEventListener('click', renderCurrentWeather)

        
        historyDiv.appendChild(newButton)
        console.log("button should be appended, now!")
        
        }

    }
}


function renderCurrentWeather() {
    console.log(this.getAttribute('data'))


let APIKey = 'fdd4402a2a16fa66299bd0a6a4043864'
let cityName = this.getAttribute('data-city') || previousCity

      // Here we are building the URL we need to query the database
      let queryURL =
        'https://api.openweathermap.org/data/2.5/weather?q='
         + cityName + 
         '&appid=' +
        APIKey  

        console.log(cityName)

        fetch(queryURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data.main.temp)
                console.log(data.main.humidity)
                console.log(data.wind.speed)
                console.log(data.weather[0].icon)
                let temps = data.main.temp-273.15;
                document.getElementById('icon-day-1').previousSibling.textContent = cityName + " (" + moment().format("L") + ") ";
                document.getElementById('icon-day-1').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'
                document.getElementById('temp').textContent = temps.toFixed(2)
                document.getElementById('humid').textContent = data.main.humidity
                document.getElementById('wind-speed').textContent = data.wind.speed
               
                return data.coord
            })
            .then(function(coords){
                let thatLat = coords.lat
                let thatLon = coords.lon

                let queryURL2 =
                'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey +
                '&lat=' + thatLat + '&lon=' + thatLon

                fetch(queryURL2)
                    .then(function(responseUV){
                        return responseUV.json()
                    })
                    .then(function(dataUV){
                        console.log(dataUV.value) 
                        document.getElementById('uv-index').textContent = dataUV.value
                    })
                    


            })

}            


            // console.log(document.getElementById('search-button').textcontent)