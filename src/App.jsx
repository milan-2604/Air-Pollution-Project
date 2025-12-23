import { useEffect, useState } from 'react'
import './App.css'

function App() {
 const [cityName,setCityName] = useState("");
 const [stateCode,setStateCode] = useState("");
 const [countryCode,setCountryCode] = useState("");
 const [GeoCodeData , setGeoCodeData] = useState([]);
 const [AirPollutionData, setAirPollutionData] = useState([]);
 const [search,setSearch] = useState(false);
 //fetch geocodedata
//  useEffect(()=>{
//    if(!search) return ;
//    if(!cityName || !stateCode || !countryCode) return;
//   const fetchData = async ()=>{
//     try {
//      const response = await fetch(`${process.env.GEOCODING_API}?q=${cityName.trim()},${stateCode.trim()},${countryCode.trim()}&limit=1&appid=${process.env.API_KEY}`);
//      if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
//      const data = await response.json();
//      setGeoCodeData(data);
//     } catch (error) {
//       console.log(`Unable to fetch data ${error.message}`) ;
//     }
//   }
//    fetchData();
//  },[search])

const searchData = ()=>{
  if(!cityName || !stateCode || !countryCode) return;
  const fetchData = async ()=>{
    try {
     const response = await fetch(`${process.env.GEOCODING_API}?q=${cityName.trim()},${stateCode.trim()},${countryCode.trim()}&limit=1&appid=${process.env.API_KEY}`);
     if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
     const data = await response.json();
     setGeoCodeData(data);
    } catch (error) {
      console.log(`Unable to fetch data ${error.message}`) ;
    }
  }
   fetchData();
}

 //accessing lat and lon form fetched GeoCodeData
 const lat = GeoCodeData[0]?.lat;
 const lon = GeoCodeData[0]?.lon;


 //fetching air pollution data
 useEffect(()=>{
  if(!lat || !lon) return;
  const fetchData = async ()=>{
    try {
     const response = await fetch(`${process.env.AIR_POLLUTION_API}?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`);
    if(!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    setAirPollutionData(data) 
    } catch (error) {
     console.log(`Unable to fetch data ${error.message}`) ; 
    }
  }
  fetchData();
 },[lat,lon])



  return (
    <>
    <input type="text" value={cityName} placeholder='City Name' onChange={(e)=>setCityName(e.target.value)}/>
    <input type="text" value={stateCode} placeholder='State Code' onChange={(e)=>setStateCode(e.target.value)} />
    <input type="text" value={countryCode} placeholder='Country Code' onChange={(e)=>setCountryCode(e.target.value)} />
    <button onClick={()=>searchData()}>Search</button>
    </>
  )
}

export default App
