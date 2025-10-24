import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });
      alert("Registration successful! You can now log in.");
      setUsername("");
      setPassword("");
    } catch (err) {
      alert("Registration failed. Try a different username.");
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Register</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={register}>Register</button>
    </div>
  );
}
