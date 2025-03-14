function getWeather() { 
    const apiKey = 'e503f6013bf33362a2d777a5b7646392';
    const city = document.getElementById('city').value.trim();

    if (!city){
        alert("Please enter a city!");
        return 
    }
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200){
                alert(data.message);
                return
            }
            // console.log(data);

            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `🌡️ ${data.main.temp}°C`;
            document.getElementById('humidity').textContent = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `💨 Wind: ${data.wind.speed} m/s`;
            document.getElementById('description').textContent = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            localStorage.setItem("lastCity", city);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Could not fetch weather data. Please try again.');
        });
}

window.onload = () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        document.getElementById('city').value = lastCity;
        getWeather();
    }
};
