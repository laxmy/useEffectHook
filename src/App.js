import React,{useEffect, useState} from 'react';
import './App.css';
export const WeatherUrlPrefix = 'https://api.openweathermap.org/data/2.5/forecast'

function App() {
  const [weather, setWeather] = useState({})
  const [input,setInput]=useState('London')
  const [city,setCity]=useState('London')

  useEffect(()=> {
    const fetchWeather = async()=> {
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}&units=metric`
       try{
         let result = await fetch(url);
         let data = await result.json()
         setWeather(data.list[0].main)
       }
       catch(err){
         console.log(err)
       }
    }
     fetchWeather();
  },[city])

  const changeCity =(e)=>{
      e.preventDefault()
      setCity(input)
  }

  return (
    <div className="App">
      <header className="App-header">
        Simple Weather App using React hooks
      </header>
      <div className="container">
        <form onSubmit={(e)=>changeCity(e)}>
          <input 
            className="city-input" 
            type="text"
            value={input}
            name="city"
            onChange={(e)=> setInput(e.target.value)}/>
          <button type="submit">Enter</button>
        </form>
        { weather && <div className="weather-main">
          <h4>Temp : {weather.temp} °C</h4>
          <h5>Feels like : {weather.feels_like} °C</h5>
        </div>}
      </div>
    </div>
  );
}

export default App;
