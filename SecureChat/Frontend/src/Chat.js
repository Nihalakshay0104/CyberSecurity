import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Chat({ username }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("join", username);

    socket.on("loadMessages", (messages) => setChat(messages));
    socket.on("message", (data) => setChat((prev) => [...prev, data]));
    socket.on("onlineUsers", (users) => setOnlineUsers(users));

    return () => {
      socket.off("loadMessages");
      socket.off("message");
      socket.off("onlineUsers");
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("message", { sender: username, text: message });
    setMessage("");
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          💬 Secure Chat
          <span style={styles.userTag}>Hi, {username}</span>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.usersList}>
            <h4 style={{ margin: "10px 0" }}>Online</h4>
            {onlineUsers.map((user, i) => (
              <div key={i} style={styles.userItem}>
                <span style={styles.dot}></span> {user}
              </div>
            ))}
          </div>

          <div style={styles.chatArea}>
            <div style={styles.messages}>
              {chat.map((msg, i) => (
                <div
                  key={i}
                  style={
                    msg.sender === username ? styles.msgRight : styles.msgLeft
                  }
                  title={`Sent at ${formatTime(msg.timestamp)}`}
                >
                  <b>{msg.sender}:</b> {msg.text}
		  <div style={styles.time}>
     			 {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
   		  </div>
                  <div style={styles.time}>{formatTime(msg.timestamp)}</div>
                </div>
              ))}
            </div>

            <form style={styles.form} onSubmit={sendMessage}>
              <input
                style={styles.input}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button style={styles.button}>Send</button>
            </form>
          </div>
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
    background: "linear-gradient(135deg, #5563DE, #74ABE2)",
    fontFamily: "'Poppins', sans-serif",
  },
  chatBox: {
    background: "#fff",
    width: "700px",
    height: "550px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    background: "#5563DE",
    color: "#fff",
    padding: "15px",
    fontWeight: "600",
    fontSize: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userTag: { fontSize: "14px", color: "#dbe4ff" },
  mainContent: { display: "flex", flex: 1 },
  usersList: {
    width: "150px",
    borderRight: "1px solid #ddd",
    padding: "10px",
    background: "#f7f8ff",
    overflowY: "auto",
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "6px",
    fontSize: "14px",
  },
  dot: {
    height: "10px",
    width: "10px",
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    marginRight: "6px",
  },
  chatArea: { flex: 1, display: "flex", flexDirection: "column" },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  msgLeft: {
    alignSelf: "flex-start",
    background: "#f1f1f1",
    margin: "5px",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "80%",
    wordWrap: "break-word",
    position: "relative",
  },
  msgRight: {
    alignSelf: "flex-end",
    background: "#5563DE",
    color: "#fff",
    margin: "5px",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "80%",
    wordWrap: "break-word",
    position: "relative",
  },
  time: {
    fontSize: "10px",
    marginTop: "3px",
    opacity: 0.6,
    textAlign: "right",
  },
  form: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginRight: "8px",
    fontSize: "15px",
  },
  button: {
    background: "#5563DE",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
