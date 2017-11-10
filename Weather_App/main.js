$(document).ready(function () {
  let usrLatitude
  let usrLongitude
  // User Geolocation:
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      usrLatitude = position.coords.latitude
      usrLongitude = position.coords.longitude
      console.log(usrLatitude)
      console.log(usrLongitude)

      // API Call:
      let APILink = 'https://api.openweathermap.org/data/2.5/weather?lat=' + usrLatitude + '&lon=' + usrLongitude + '&appid=2be16b4f9b9e0645e776071c8092b02e'
      $.ajax({
        url: APILink,
        success: function (json) {
          console.log(json.main.temp)
          console.log(json.weather[0].main)
          console.log(json.name)
          console.log(json.sys.country)
        }
      })
    })
  } else {
    console.log('Geolocation Not Available')
  }
})
