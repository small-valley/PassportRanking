import React from "react";
import { ChangeEvent } from "react";

type Props = {
  defaultColor: string | number | readonly string[] | undefined;
  onChildEvent: any,
  index: number,
}

export default function ColorSelector(props: Props) {
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    // Call the callback function passed from the parent
    props.onChildEvent(e.target.value, props.index);
  };

  const displayValue = props.index === 2 ? "" : "none";

  return (
    <div>
      <label htmlFor={`${props.index}`} style={{ display: displayValue }}>
        Both country
      </label>
      <input
        id={`${props.index}`}
        className="country-select-box"
        type="color"
        onChange={handleClick}
        value={props.defaultColor}
      ></input>
    </div>
  );
};