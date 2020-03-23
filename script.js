// This is my scipt.




let APIKey = 'fdd4402a2a16fa66299bd0a6a4043864'
let cityName = 'Ottawa'

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
                console.log(data)
            })