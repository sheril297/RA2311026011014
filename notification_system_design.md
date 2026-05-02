# 🚀 Notification System Design

## 📌 Overview
This project is a full-stack Notification System that allows users to:
- Register and authenticate
- Create notifications
- View notifications in real-time
- Log system activities using a reusable logging middleware

---

## 🏗 Architecture

### Frontend
- Built using React (Vite)
- Handles user input, UI rendering, and API calls

### Backend
- Built using Node.js and Express
- Provides REST APIs:
  - GET /notifications
  - POST /notifications
- Stores notifications in memory

### Logging Middleware
- Reusable function:
  Log(stack, level, package, message)
- Sends logs to external logging API
- Helps track system behavior and errors

---

## 🔄 Workflow

1. User enters notification in UI
2. Frontend sends POST request to backend
3. Backend:
   - Validates input
   - Stores notification
   - Calls logging middleware
4. Frontend fetches updated notifications
5. UI updates automatically

---

## 📡 API Endpoints

### Get Notifications
GET /notifications

Response:
{
  "success": true,
  "data": []
}

### Create Notification
POST /notifications

Request:
{
  "title": "Test",
  "message": "Hello"
}

---

## 📊 Data Model

{
  "id": "timestamp",
  "title": "string",
  "message": "string",
  "createdAt": "ISO Date"
}

---

## 🧠 Logging Strategy

Each important action is logged:

- Fetch notifications → level: info, package: route  
- Create success → level: info, package: service  
- Validation error → level: warn, package: handler  

---

## ⚠️ Limitations

- Data is stored in memory (not persistent)
- No database integration
- Limited authentication handling

---

## 🔮 Future Improvements

- Add database (MongoDB / Firebase)
- Implement JWT authentication
- Add edit/delete notifications
- Deploy frontend and backend
- Improve UI/UX

---

## 🛠 Tech Stack

- Frontend: React (Vite)
- Backend: Node.js, Express
- Logging: Custom Middleware + External API

---

## 🎯 Conclusion

This project demonstrates:
- Full-stack development
- API integration
- Middleware design
- Logging and debugging practices
