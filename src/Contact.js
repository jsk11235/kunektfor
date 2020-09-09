import React from "react";
import {Button} from "./Button";

export function Contact({name, phoneNumber, onDelete}) {
  return <div>{name}{phoneNumber}<Button title={'delete'} onClick={onDelete} isRed={true}/></div>
}