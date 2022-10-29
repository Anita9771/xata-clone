import { useState } from "react";
import dotenv from "dotenv"
// dotenv.config();
// import bcrypt from "bcrypt";
// import {promisify} from "util";
// import fetch from 'node-fetch';



export const TestForm = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  
  const send = () => {
    fetch("api/submit-rec", {
      method: "POST",
      headers: {
        Authorization: `Bearer xau_uzhMDDgbL6E223PELWfvZjTr5nkVEfvq2`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        reason: reason,
        name: name
      }),
    }).then(() => window.location.reload());
  };

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
           console.log(name, reason, email);
          send();
          //   console.log(process.env)
        }}
        action=""
      >
        Need us!
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="email"
        />
        <input
          type="text"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          placeholder="reason"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
