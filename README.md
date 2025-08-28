# 🎶 BeatSync – A Modern Music Player  

A **full-stack music player application** built with **React.js (frontend)** and **Express + MongoDB (backend)**.  
BeatSync delivers a **Spotify-like experience** with sleek UI, real-time updates, and secure authentication.  

---

## ✨ Features  
- 🎧 **Music Playback** – Play, pause, and control songs  
- 🗂️ **Albums & Playlists** – Organize your favorite tracks  
- 👤 **Authentication** – Secure login & signup with **Clerk**  
- ☁️ **Cloud Storage** – Media management via **Cloudinary**  
- 📡 **Real-Time Updates** – Powered by **Socket.io**  
- 🗄️ **Database** – **MongoDB + Mongoose** for persistence  
- 🎨 **Modern UI** – Built with **React, TailwindCSS, Radix UI, Lucide Icons**  
- ⚡ **Global State** – Managed with **Zustand**  

---

## 📂 Project Structure  
`````bash
beat-sync/
├── backend/   # Express.js server
│ ├── src/
│ │ ├── controllers/   # API controllers
│ │ ├── models/    # Mongoose models
│ │ ├── routes/    # API routes
│ │ ├── middlewares/    # Auth & upload middleware
│ │ └── db/    # Database connection
│ └── package.json
│
├── frontend/  # React.js client
│ ├── public/  # Static assets
│ ├── src/  # React components & pages
│ └── package.json
│
└── README.md
`````


---

## ⚡ Tech Stack  

### 🖥️ Frontend  
- React 18  
- React Router DOM  
- TailwindCSS + Tailwind Variants + Radix UI  
- Zustand (state management)  
- Axios  

### 🛠️ Backend  
- Node.js + Express  
- MongoDB + Mongoose  
- Multer (file uploads)  
- Cloudinary (media storage)  
- Clerk (authentication)  
- Socket.io (real-time communication)  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone Repository  
`````bash
git clone https://github.com/your-username/beatsync.git
cd beatsync
`````

### 2️⃣ Backend Setup  
`````bash
cd backend
npm install
`````
Create a `.env` file inside `/backend` with the following:  

`````bash
PORT=5000
MONGO_URI=your_mongodb_connection
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLERK_SECRET_KEY=your_clerk_secret
`````

### 3️⃣ Frontend Setup  
`````bash
cd frontend
npm install
npm run dev
`````

App will be running at:  
- 👉 **Frontend**: `http://localhost:5173`  
- 👉 **Backend**: `http://localhost:5000`  

---

## 🤝 Contributing  

Contributions are welcome!  
1. Fork the repo  
2. Create your feature branch (`git checkout -b feature/your-feature`)  
3. Commit changes (`git commit -m "Add new feature"`)  
4. Push to branch (`git push origin feature/your-feature`)  
5. Open a Pull Request 🚀  

---

## ⭐ Show Your Support  

If you like **BeatSync**, please:  
- 🌟 Give it a **star** on GitHub  
- 📢 Share it with fellow developers and music lovers!  

---

<p align="center">  
🎶 Built with ❤️ by <a href='https://www.prathmesh.dev'>Prathmesh Gaidhane</a>  
</p>






