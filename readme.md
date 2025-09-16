<h1 align="center">Chatify - Real-Time Chat Application 💬</h1>
<p>A full-stack real-time chat app built with MERN stack + Socket.io that allows users to communicate instantly with authentication, responsive UI, and live updates.</p>

![Demo App](/frontend/public/preview.png)

## 🚀 Live Demo

https://chat-app-6ot4.onrender.com

## 🛠 Tech Stack

**FRONTEND:** React JS, TailwindCSS, Zustand

**BACKEND:** Node JS, Express JS, Socket.io

**Other Tools:** JWT Authentication, Cloudinary

## ✨ Features

- 🔑 User Authentication (JWT-based login & signup)
- 💬 Real-time Messaging with Socket.io
- 🟢 Online/Offline User Status
- 📜 Chat History (persistent in MongoDB)
- 30+ UI Theme

## Installation

### Clone the repo:

```bash
    git clone https://github.com/Devprashant05/Chat-App.git
    cd your-repo-name
```

### Setup .env in root:

```bash
PORT=5500
MONGODB_URI=your_mongo_uri
DB_NAME=your_db_name

JWT_SECRET=your_access_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

### Setup Backend:

```bash
    cd backend/
    npm install
    npm run dev
```

### Setup Frontend:

```bash
    cd frontend/
    npm install
    npm run dev
```

## 🤝 Contributing

<p>Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.</p>

## Feedback

If you have any feedback, please reach out to us at devprashant0305@gmail.com