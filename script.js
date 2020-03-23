// This is my scipt.


function renderCurrentWeather() {


let APIKey = 'fdd4402a2a16fa66299bd0a6a4043864'
let cityName = 'ottawa'

      // Here we are building the URL we need to query the database
      let queryURL =
        'https://api.openweathermap.org/data/2.5/weather?q='
         + cityName + 
         '&appid=' +
        APIKey



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
                document.getElementById('icon-day-1').previousSibling.textContent = " (" + moment().format("L") + ") ";
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

renderCurrentWeather();
            // console.log(document.getElementById('search-button').textcontent)