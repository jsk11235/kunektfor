import React, { useState } from "react";
import "./App.css";
import { Button } from "./Button";
import {Contact} from "./Contact";

function dropNextCoin (row,array){

}
function App() {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState([]);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const n =1
  const styles = {
    error: {
      color: "#ff0000",
    },
    contactsList:{
      marginBottom:8
    },
    container:{
      padding: 12
    }
  };

  console.log(contacts);
  return (
    <div style={styles.container}>
      {error ? <div style={styles.error}>{error}</div> : null}
      <input
        type={"text"}
        onChange={(event) => setName(event.target.value)}
        placeholder={"name"}
        value={name}
      />
      <input
        type={"text"}
        onChange={(event) => setPhone(event.target.value)}
        placeholder={"phone number"}
        value={phone}
      />
      <div style={styles.contactsList}>{!contacts.length ? (
        <div> no contacts </div>
      ) : (
        contacts.map((contact, i) => (
          <Contact name={contact.name} phoneNumber={contact.phone} onDelete={() =>
             setContacts(contacts.filter((element, index) => index !== i))}/>
        ))
      )}
      </div>
      <Button
        title = 'add contact'
        onClick={() => {
          if (!name || !phone) {
            setError("error you didnt put a name or phone");
            return;
          }

          setContacts([...contacts, {name: name, phone: phone}]);
          setName("");
          setPhone("");
          setError("");
        }}

      />

    </div>
  );
}

export default App;
