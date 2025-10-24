import React, { useState } from "react";
import axios from "axios";
import Chat from "./Chat";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // ✅ This handles both Login and Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    const endpoint = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    try {
      const res = await axios.post(endpoint, { username, password });

      if (isRegister) {
        setMessage("✅ Registration successful! You can now log in.");
        setStatus("success");
        setIsRegister(false);
      } else {
        setMessage("🎉 Login successful!");
        setStatus("success");
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true); // ✅ Switch to chat screen
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Login or registration failed. Please try again.");
      setStatus("error");
    }
  };

  // ✅ If logged in → go to chat
  if (loggedIn) {
    return <Chat username={username} />;
  }

  // ✅ Otherwise show login/register screen
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = "#384BC1")}
            onMouseOut={(e) => (e.target.style.background = "#5563DE")}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "20px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor:
                status === "success"
                  ? "rgba(76,175,80,0.1)"
                  : "rgba(244,67,54,0.1)",
              color: status === "success" ? "#4CAF50" : "#F44336",
            }}
          >
            {message}
          </div>
        )}

        <div
          style={styles.toggle}
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}
        >
          {isRegister
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #74ABE2, #5563DE)",
    fontFamily: "'Poppins', sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    textAlign: "center",
    width: "320px",
  },
  input: {
    width: "90%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#5563DE",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "15px",
    color: "#5563DE",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default App;
