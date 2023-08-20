function ColorSelector(props) {
  const handleClick = (e) => {
    // Call the callback function passed from the parent
    props.onChildEvent(e.target.value, props.index);
  };

  const displayValue = props.index === 2 ? "" : "none";

  return (
    <div>
      <label for={props.index} style={{ display: displayValue }}>
        Both country
      </label>
      <input
        id={props.index}
        class="country-select-box"
        type="color"
        onChange={handleClick}
        value={props.defaultColor}
      ></input>
    </div>
  );
}

export default ColorSelector;
