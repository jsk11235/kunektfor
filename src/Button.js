import React from "react";

export function Button({title, onClick,isRed}) {
  const styles = {
    container:{
      color: '#FFFFFF' ,
      backgroundColor: isRed?'#FF0000':'#0000FF',
      display: 'inline-block',
      padding: 4 ,
      cursor: 'pointer',
      borderRadius:4
    }
  }
  return <div style={styles.container} onClick={onClick}>{title}</div>;

}