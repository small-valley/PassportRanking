import React from "react";
import { useState } from "react";
import { VectorMap } from "react-jvectormap";

import CountrySelector from "./CountrySelector";

let mapData = {};
let mapData1 = {};
let mapData2 = {};

const countryData = require("./data/data.json");

const handleClick = (e, countryCode) => {
  console.log(countryCode);
};

const createMapData = (data, index) => {
  mapData = {};
  const country1Color = 1;
  const country2Color = 2;
  const countryBothColor = 3;
  data.default.forEach((country, i) => {
    if (country.pivot.is_visa_free === 1) {
      mapData[country.code] = index === 1 ? country1Color : country2Color;
    }
  });

  mapData1 = index === 1 ? mapData : mapData1;
  mapData2 = index === 2 ? mapData : mapData2;

  let mergedMapData = mapData;
  const mergeTargetData = index === 1 ? mapData2 : mapData1;

  for (const key in mergeTargetData) {
    if (mergedMapData[key]) {
      mergedMapData[key] = countryBothColor;
    } else {
      mergedMapData[key] = index === 1 ? country2Color : country1Color;
    }
  }

  console.log(mapData1, mapData2);
  return mergedMapData;
};

function App() {
  const [mapData, changeMapData] = useState({});

  const handleChildEvent = (eventData, index) => {
    changeMapData(createMapData(countryData[eventData], index));
  };

  return (
    <div className="App">
      <div id="map">
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent" //change it to ocean blue: #0077be
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "520px",
          }}
          onRegionClick={handleClick} //gets the country code
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "#e4e4e4",
              "fill-opacity": 0.9,
              stroke: "none",
              "stroke-width": 0,
              "stroke-opacity": 0,
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: "pointer",
            },
            selected: {
              fill: "#2938bc", //color for the clicked country
            },
            selectedHover: {},
          }}
          regionsSelectable={true}
          series={{
            regions: [
              {
                values: mapData, //this is your data
                scale: ["#146804", "#ff0000"], //your color game's here
                normalizeFunction: "polynomial",
              },
            ],
          }}
        />
      </div>
      <CountrySelector onChildEvent={handleChildEvent} index={1} />
      <CountrySelector onChildEvent={handleChildEvent} index={2} />
    </div>
  );
}

export default App;
