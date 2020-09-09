import React from "react";

export function Circle({ value }) {
  const styles = {
    circle: {
      height: 20,
      width: 20,
      borderRadius: 40,
      backgroundColor: value === 1 ? "#FF0000" : "#000000",
      display: 'inline-block'
    },
  };
  return <div style={styles.circle} />;
}
