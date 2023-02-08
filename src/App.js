import React, { useState } from 'react';
import "./App.css";
import HotelList from "./HotelList";
import { getData } from "./function";

const App = () => {
  const [hotelsData , setData]=useState(null);

  const a = async () => {
    const ret = await getData("./data.json");
    setData(ret);
  }
  a();
    
  return (
    <div className="main-container">
      <h1>Q HOTEL</h1>
      { 
        hotelsData ? 
          <HotelList hotels={hotelsData.results} /> : 
        <p>No data</p>
      }
    </div>
  );
};

export default App;
