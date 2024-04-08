const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
let searchInfo = document.getElementById("searchInfo");
let Rain = document.getElementById("Rain");
let Sun = document.getElementById("Sun");

// searchInfo.innerHTML =
//   "<button onclick='upDate()'> Click here for Info </button>";

Rain.innerHTML = "<button onclick='onRain()'> it's Raining ...</button>";
function onRain() {
  Rain.innerHTML += "<h5> Grab Your Umbrella &#9748 </h5>";
  if (!Rain.disabled) {
    Rain.disabled = true;
    Rain.innerHTML = "Processing....";
    Rain.remove += "";
    setTimeout(function () {
      Rain.disabled = false;
      Rain.innerHTML = "";
      Rain.innerHTML += "<h5> Grab Your Umbrella &#9748 </h5>";
    }, 1000);
  }
}

Sun.innerHTML = "<button onclick=' onTime()'> it's Sunny... </button>";
function onTime() {
  Sun.innerHTML += "<h5> Grab Your Umbrella &#9748 </h5>";
  if (!Sun.disabled) {
    Sun.disabled = true;
    Sun.innerHTML = "Processing....";
    Sun.remove += "";
    setTimeout(function () {
      Sun.disabled = false;
      Sun.innerHTML = "";
      Sun.innerHTML += "<h5> Wear Your Sunglasses. &#128526 </h5>";
    }, 1000);
  }
}

// function upDate() {
//   let weather = prompt("how is the weather?");
//   if (weather == "Raining") {
//     searchInfo.innerHTML += "<h1> Grab your umbrella </h1>";
//   } else if (weather == "Sunny") {
//     searchInfo.innerHTML += "<h1> wear your sunglasses </h1>";
//   } else {
//     searchInfo.innerHTML += "<h1> Stay Home!</h1>";
//   }
// }

searchBtn.addEventListener("click", () => {
  getWeatherData(searchBox.value);
});

//  Event listener to get the location input
document
  .getElementById("location-input")
  .addEventListener("change", async () => {
    // get the user enter location
    const location = document.getElementById("location-input").value;

    // fetch the weather data
    const weatherData = await getWeatherData(location);

    //  disaplay the weather data on the page
    displayWeatherData(weatherData);
  });

const getWeatherData = async (location) => {
  if (!location) {
    return {};
  }

  const apiKey = "ed06302f089b0b640b4eece986bf85d2";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  );
  const data = await response.json();

  return data;
};

function getBackgroundColor(temperature) {
  if (temperature < 0) {
    return "red";
  } else if (temperature < 10) {
    return "blue";
  } else if (temperature < 20) {
    return "yellow";
  } else if (temperature < 30) {
    return "green";
  } else {
    return "orange";
  }
}

const displayWeatherData = (data) => {
  const weatherDataElement = document.getElementById("weather-data");

  if (Object.keys(data).length === 0) {
    weatherDataElement.innerHTML;
  } else {
    const backgroundColor = getBackgroundColor(
      Math.floor(data.main.temp - 273.15)
    );
    weatherDataElement.style.backgroundColor = backgroundColor;

    weatherDataElement.innerHTML = `
    <h3>${data.name}</h3>
     <p>Temperature:${Math.floor(data.main.temp - 273.15)}°C</p>
     <p>Humdity: ${data.main.humidity}%</p>    
     <p>Wind speed: ${data.wind.speed}m/s</p>   
    `;
  }
};

window.onload = async () => {
  const weatherData = await getWeatherData();
  displayWeatherData(weatherData);
};
