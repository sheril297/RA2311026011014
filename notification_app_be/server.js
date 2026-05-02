const express = require("express");
const cors = require("cors");
const Log = require("../logging_middleware");

const app = express();

app.use(cors());
app.use(express.json());

let notifications = [];

// health check
app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Health check endpoint called");
  res.json({ message: "Backend running" });
});

// register client through backend
app.post("/register-client", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Register client request received");

    const response = await fetch(
      "http://20.207.122.201/evaluation-service/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    await Log("backend", "error", "handler", "Registration failed");
    res.status(500).json({ message: "Registration failed" });
  }
});

// authenticate client through backend
app.post("/auth-client", async (req, res) => {
  try {
    await Log("backend", "info", "route", "Authentication request received");

    const response = await fetch(
      "http://20.207.122.201/evaluation-service/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    await Log("backend", "error", "handler", "Authentication failed");
    res.status(500).json({ message: "Authentication failed" });
  }
});

// get all notifications
app.get("/notifications", async (req, res) => {
  await Log("backend", "info", "route", "Fetched notifications");

  res.json({
    success: true,
    data: notifications,
  });
});

// create notification
app.post("/notifications", async (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    await Log(
      "backend",
      "warn",
      "handler",
      "Create notification failed due to missing fields"
    );

    return res.status(400).json({
      success: false,
      message: "Title and message are required",
    });
  }

  const newNotification = {
    id: Date.now(),
    title,
    message,
    createdAt: new Date().toISOString(),
  };

  notifications.push(newNotification);

  await Log(
    "backend",
    "info",
    "service",
    "New notification created successfully"
  );

  res.status(201).json({
    success: true,
    data: newNotification,
  });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});