import React from "react";

//0=empty 1=red 2=black
export function Slot({ value, onClick, selected }) {
  const styles = {
    piece: {
      height: 80,
      width: `${100 / 7}%`,
      backgroundColor: "yellow",
      padding: 12,
      boxSizing: "border-box",
    },
    circle: {
      height: 60,
      width: 60,
      borderRadius: 40,
      border: `3px solid ${selected ? "#00FF00" : "yellow"}`,
      boxShadow: 'inset 1px 2px 3px #000000'
    },
  };

  return (
    <div
      style={{
        ...styles.piece,
      }}
      onClick={onClick}
    >
      <div
        style={{
          ...styles.circle,

          backgroundColor: !value
            ? "#ffffff"
            : value === 1
            ? "#ff0000"
            : "#000000",
        }}
      ></div>
    </div>
  );
}
