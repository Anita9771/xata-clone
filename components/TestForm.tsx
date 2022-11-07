import { useState } from "react";
import dotenv from "dotenv";

export const TestForm = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");

  // fetch xata API
  const send = () => {
    fetch("api/submit-rec", {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.apiKey}`,
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
    // form to submit details
    <div className="">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(name, reason, email);
          send();
        }}
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
          placeholder="Message"
        />
        <button>SEND</button>
      </form>
    </div>
  );
};
