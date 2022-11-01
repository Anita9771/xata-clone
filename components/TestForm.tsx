import { useState } from "react";
import dotenv from "dotenv";
import '../styles/test-form.module.css'
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
        Authorization: `Basic ${Buffer.from(process.env.apiKey).toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        reason: reason,
        name: name,
      }),
    }).then(() => window.location.reload());
  };

  return (
    <div className="" >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(name, reason, email);
          send();
          //   console.log(process.env)
        }}
        action=""
      >
        <p>Need us!</p>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="text"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          placeholder="Reason"
        />
        <button>SEND</button>
      </form>
    </div>
  );
};
