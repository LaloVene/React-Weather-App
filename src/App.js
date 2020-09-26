import React, { useState } from 'react';
const api = {
  key: "ef830b862fb9e9e42b0d1fdbe66a174b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    //let year = d.getFullYear();

    return `${day} ${date} ${month}`
  }

  const hour = (d) => {
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}${ampm}`
  }

  const clima = (d) =>{
    switch (d)
    {
      case "Mist":
        return "img/mist.png";
      case "Clouds":
        return "img/cloud.png";
      case "Haze":
        return "img/mist.png";
      case "Rain":
        return "img/rain.png";
      case "Snow":
        return "img/snow.png";
      case "Storm":
        return "img/light.png";
      default:
        let t = weather.dt + weather.timezone + 18000;
        let d = new Date(t * 1000);
        return ((d.getHours() >= 7) & (d.getHours() <= 20)) ? 'img/sunny.png' : 'img/moon.png';
    }
  }
  const Time = (t) => {
    var date = new Date(t * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ampm;

    return formattedTime;
  }
  const date = (t) => {
    let months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"]

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"];

    var d = new Date(t * 1000);

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    //let year = d.getFullYear();

    return `${day} ${date} ${month}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (((new Date((weather.dt + weather.timezone + 18000) * 1000)).getHours() >= 7) & ((new Date((weather.dt + weather.timezone + 18000) * 1000)).getHours() <= 20) ? ((weather.main.temp > 20) ? "app warm" : "app"): "app normal") : "app normal"}>
      <main>

        <div className="search-box">
          <input
          type = "text"
          className = "search-bar"
          placeholder = "Search..."
          onChange = {e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          />
        </div> {/* search-box */}

        {(typeof weather.main != "undefined") ?(
        <div className="box">
          <div className="location-box">
              <div className="date">{date(weather.dt + weather.timezone + 18000)}</div>
            <div className="hour">{Time(weather.dt + weather.timezone + 18000)}</div>
            <div className="location">{weather.name}, {weather.sys.country}</div>
          </div> {/* location-box */}

          <div className="weather-box">
              <img src={clima(weather.weather[0].main)} className="img" alt = "img"/>
            <div className="temp">
              {Math.round(weather.main.temp)}°
            </div> {/* temp */}
            <div className="weather">
              {weather.weather[0].main}
            </div> {/* weather */}
          </div> {/* weather-box */}
        </div>
        ): (
            <div className = "box">
              <div className="location-box">
                <div className="date">{dateBuilder(new Date())}</div>
                <div className="hour">{hour(new Date())}</div>
              </div> {/* location-box */}
              <div className="weather-box">
                <img src="img/search_info.png" className="img-info" alt="img" />
                <div className="info">Search a City</div>
              </div>
            </div>
        )}
      </main>
    </div>
  );
}

export default App;
