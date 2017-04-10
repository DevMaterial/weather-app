// Inspiration from Alberto Jerez
// http://codepen.io/ajerez/pen/KwYNWZ

$('document').ready(function() {
  // get location using IP API
  var location = "http://ip-api.com/json";
  $.getJSON(location, function(data) {
    var lat = data.lat;
    var lon = data.lon;
    var city = data.city;
    var country = data.country;

    // Use location data to get weather data from open weather API
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=5f7bcf238dc7056a7325948af9cb61be", function(data) {

      // Our Data
      var icon = deriveIcon(data.weather[0].icon);

      var tempInCelsius = Math.round(((data.main.temp) - 273.15 ));
      var tempInFarenheit = tempInCelsius + 32;
      tempInCelsius = tempInCelsius.toFixed(0);
      tempInFarenheit = tempInFarenheit.toFixed(0);

      var description = data.weather[0].description;

      // Apply Data To Page
      $(".weather").attr("class", icon);
      $("#city").text(city);
      $("#temperature").text(tempInCelsius + "°");

      $("#farenheit").on("click", function () {
        $("#farenheit").addClass("active");
        $("#celsius").removeClass("active");
        $("#temperature").text(tempInFarenheit + "°");
      });
      $("#celsius").on("click", function () {
        $("#celsius").addClass("active");
        $("#farenheit").removeClass("active");
        $("#temperature").text(tempInCelsius + "°");
      });
    });
  });
});

function deriveIcon(icon) {
// Determine which icon to use depending on the icon code returned
// by the API call.
  switch(icon) {
    case "01d": // clear sky, day
    case "03n": // scattered clouds, night
    case "04n": // broken clouds, night
      return "weather-icon sun";
    case "09d": // shower rain, day
      return "weather-icon cloudy";
    case "09n": // shower rain, night
      return "weather-icon cloudy";
    case "10d": // rain, day
    case "10n": // rain, night
      return "weather-icon cloud";
    case "11d": // thunderstorm, day
    case "11n": // thunderstorm, night
      return "weather-icon thunderstorm";
    case "13d": // snow, day
      return "weather-icon snow";
    case "13n": // snow, night
      return "weather-icon snow";
    case "50n": // mist, night
    case "50d": // mist, day
      return "weather-icon misty";
    default: // default sunny
      return "weather-icon sun";
  }
}
