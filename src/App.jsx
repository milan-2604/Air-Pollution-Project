import { useState } from "react";
import "./App.css";

function App() {
  //importing api key and endpoints
  const GEOCODING_API = import.meta.env.VITE_GEOCODING_API;
  const AIR_POLLUTION_API = import.meta.env.VITE_AIR_POLLUTION_API;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [cityName, setCityName] = useState("");
  const [geoCodeData, setGeoCodeData] = useState([]);
  const [airPollutionData, setAirPollutionData] = useState([]);

  const searchData = () => {
    const city = cityName.trim();
    if (!city) return;
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${GEOCODING_API}?q=${city}&limit=1&appid=${API_KEY}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGeoCodeData(data);
        console.log("geocodedata: ",data)
        //checking if data is present
        if (!data[0]) {
          setAirPollutionData([]);
          console.log("Data doesnt exist");
          return;
        }
        //accessing lat and lon form fetched GeoCodeData
        const lat = data[0]?.lat;
        const lon = data[0]?.lon;

        if (lat && lon) {
          const airResponse = await fetch(
            `${AIR_POLLUTION_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}`
          );
          if (!airResponse.ok)
            throw new Error(`HTTP error! status: ${airResponse.status}`);
          const data = await airResponse.json();
          setAirPollutionData(data);
          console.log("airpollutiondata: ",data)
        }
      } catch (error) {
        console.log(`Unable to fetch data ${error.message}`);
      }
    };
    fetchData();
  };

  return (
    <>
      <input
        type="text"
        value={cityName}
        placeholder="City Name"
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={() => searchData()}>Search</button>
    </>
  );
}

export default App;
