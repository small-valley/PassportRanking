import React from "react";

function CountrySelector(props) {
  const handleClick = (e) => {
    // Call the callback function passed from the parent
    props.onChildEvent(e.target.value, props.index);
  };

  return (
    <div>
      <select name="country" placeholder="country" onChange={handleClick}>
        {optionCreator()}
      </select>
    </div>
  );
}

function optionCreator() {
  const countryData = require("./data/coutries.json");
  return countryData.map((country, index) => {
    return (
      <option key={index} value={index}>
        {country}
      </option>
    );
  });
}

export default CountrySelector;
