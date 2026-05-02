import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const [clientID, setClientID] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [token, setToken] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const registerClient = async () => {
    try {
      const res = await fetch("http://20.207.122.201/evaluation-service/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, mobileNo, githubUsername, rollNo, accessCode }),
      });

      const data = await res.json();
      setClientID(data.clientID || "");
      setClientSecret(data.clientSecret || "");
      console.log("REGISTER RESPONSE:", data);
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  const authenticateClient = async () => {
    try {
      const res = await fetch("http://20.207.122.201/evaluation-service/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, rollNo, accessCode, clientID, clientSecret }),
      });

      const data = await res.json();
      setToken(data.access_token || "");
      console.log("AUTH RESPONSE:", data);
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:3000/notifications");
      const data = await res.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch("http://localhost:3000/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });

      setTitle("");
      setMessage("");
      fetchNotifications();
    } catch (err) {
      console.error("Error creating notification:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="app">
      <h1>Notification System</h1>

      <section className="notification-form">
        <h2>Client Registration</h2>

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Mobile No" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
        <input placeholder="GitHub Username" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} />
        <input placeholder="Roll No" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
        <input placeholder="Access Code" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />

        <button type="button" onClick={registerClient}>Register</button>

        {clientID && <p><b>Client ID:</b> {clientID}</p>}
        {clientSecret && <p><b>Client Secret:</b> {clientSecret}</p>}
      </section>

      <section className="notification-form">
        <h2>Authentication</h2>

        <input placeholder="Client ID" value={clientID} onChange={(e) => setClientID(e.target.value)} />
        <input placeholder="Client Secret" value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} />

        <button type="button" onClick={authenticateClient}>Generate Token</button>

        {token && <p><b>Token Generated Successfully</b></p>}
      </section>

      <section>
        <h2>Notification Dashboard</h2>

        <form onSubmit={handleSubmit} className="notification-form">
          <input
            type="text"
            placeholder="Notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">Add Notification</button>
        </form>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <p>No notifications yet</p>
          ) : (
            notifications.map((item) => (
              <div className="notification-card" key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <small>{item.createdAt}</small>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;