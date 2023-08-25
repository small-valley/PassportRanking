import "./App.css";

import React from "react";
import { useState } from "react";
import { VectorMap } from "react-jvectormap";

import CountrySelector from "./CountrySelector";
import ColorSelector from "./ColorSelector";

let scale = ["#ff9f1c", "#2ec4b6", "#9a031e"];
let mapData: {[key: string]: number} = {};
let mapData1 = {};
let mapData2 = {};
let country1 = "";
let country2 = "";
const country1Color = 1;
const country2Color = 2;
const countryBothColor = 3;

const countryData = require("./data/data.json");

const handleClick = (e: any, countryCode: string) => {
  console.log(countryCode);
};

const createMapData = (data: any, index: number) => {
  mapData = {};
  if (data !== undefined) {
    data.default.forEach((country: any, i: number) => {
      if (country.pivot.is_visa_free === 1) {
        mapData[country.code] = index === 1 ? country1Color : country2Color;
      }
    });
  }

  mapData1 = index === 1 ? mapData : mapData1;
  mapData2 = index === 2 ? mapData : mapData2;

  let result = JSON.parse(JSON.stringify(mapData));
  const mergeTargetData = index === 1 ? mapData2 : mapData1;

  for (const key in mergeTargetData) {
    if (result[key]) {
      result[key] = countryBothColor;
    } else {
      result[key] = index === 1 ? country2Color : country1Color;
    }
  }
  //for default setting
  result["01"] = 1;
  result["02"] = 2;
  result["03"] = 3;

  console.log(mapData1, mapData2, result);
  return result;
};

const setColor = (color: string, index: number) => {
  scale[index] = color;
};

function App() {
  const [mapData, changeMapData] = useState({});

  const handleChildEvent = (eventData: any, index: number) => {
    country1 = index === 1 ? eventData : country1;
    country2 = index === 2 ? eventData : country2;
    changeMapData(createMapData(countryData[eventData], index));
  };

  const handleChildColorChangeEvent = (eventData: any, index: number) => {
    setColor(eventData, index);
    const country = index === 1 ? country1 : country2;
    changeMapData(createMapData(countryData[country], index));
  };

  return (
    <div className="App">
      <h1>Passport Ranking Visualizer 2023</h1>
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
            fill: "#e4e4e4", //color for the clicked country
          },
          selectedHover: {},
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: scale, //your color game's here
              normalizeFunction: "linear",
            },
          ],
        }}
      />
      <div className="country-selector-container">
        {
          [0, 1].map((i) => {
            return <div className="country-selector" key={i}>
            <CountrySelector onChildEvent={handleChildEvent} index={i + 1} />
            <ColorSelector
              onChildEvent={handleChildColorChangeEvent}
              index={i}
              defaultColor={scale[i]}
            />
          </div>
          })
        }
        <div className="country-selector">
          <ColorSelector
            onChildEvent={handleChildColorChangeEvent}
            index={2}
            defaultColor={scale[2]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
