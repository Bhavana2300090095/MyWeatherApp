async function getWeather() {
    let city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    // Fetch latitude & longitude using Open-Meteo Geocoding API
    let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    let geoResponse = await fetch(geoUrl);
    let geoData = await geoResponse.json();

    if (!geoData.results) {
        document.getElementById("weather-result").innerHTML = "City not found!";
        return;
    }

    let lat = geoData.results[0].latitude;
    let lon = geoData.results[0].longitude;

    // Fetch weather using Open-Meteo API
    let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    let weatherResponse = await fetch(weatherUrl);
    let weatherData = await weatherResponse.json();

    let weather = weatherData.current_weather;

    document.getElementById("weather-result").innerHTML = `
        <h3>Weather in ${city}</h3>
        <p>🌡️ Temperature: ${weather.temperature}°C</p>
        <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
        <p>🌍 Latitude: ${lat}, Longitude: ${lon}</p>
    `;
}
