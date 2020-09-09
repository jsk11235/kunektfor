import React from "react";
//0=empty 1=red 2=black
export function Slot({ value,onClick }) {
  const styles = {
    piece: {
      height: 80,
      width: `${100/7}%`,
      backgroundColor:'yellow',
      padding: 12 ,
      boxSizing: 'border-box'
    },
    circle:{
      height: 60,
      width: 60,
      borderRadius:40
    }
  };

  return (
    <div
      style={{
        ...styles.piece,

      }}
      onClick={onClick}
    >
      <div style={{
        ...styles.circle,

        backgroundColor:
          !value
            ? "#ffffff"
            : value === 1
            ? "#ff0000"
            : "#000000",
      }}>

      </div>
    </div>
  );
}