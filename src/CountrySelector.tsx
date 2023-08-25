import React from "react";

type Props = {
  onChildEvent: any,
  index: number,
}

function CountrySelector(props: Props) {
  const handleClick = (e: any) => {
    // Call the callback function passed from the parent
    props.onChildEvent(e.target.value, props.index);
  };

  return (
    <div>
      <label htmlFor={`${props.index}`}>Country{props.index}</label>
      <select
        id={`${props.index}`}
        className="country-select-box"
        name="country"
        placeholder="country"
        onChange={handleClick}
      >
        <option key="-1">Select Country</option>
        {optionCreator()}
      </select>
    </div>
  );
}

function optionCreator() {
  const countryData = require("./data/coutries.json");
  return countryData.map((country: any, index: number) => {
    return (
      <option key={index} value={index}>
        {country}
      </option>
    );
  });
}

export default CountrySelector;
