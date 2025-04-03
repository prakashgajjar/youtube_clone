# YouTube Clone (MERN Stack)

## 📌 Project Overview
This is a full-featured **YouTube Clone** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. The platform allows users to upload, watch, like, comment, and share videos just like YouTube. The project also includes authentication, real-time notifications, and live streaming support.

## 🚀 Features
- **User Authentication** (Sign up, Login, Logout, OAuth)
- **Video Uploading & Processing** (Thumbnails, Titles, Descriptions)
- **Video Playback** (Streaming using secure URLs)
- **Like, Dislike, and Comments** (Engagement system)
- **Subscriptions & Notifications** (Stay updated with favorite channels)
- **Watch Later & History** (Personalized experience)
- **Search & Filtering** (Advanced search functionality)
- **Live Streaming** (For creators)
- **Dark Mode Support** (Modern UI)

## 🛠️ Tech Stack
### Frontend:
- React.js
- Redux (for state management)
- Tailwind CSS / Material UI (for styling)

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Firebase / AWS S3 (for video storage)
- Socket.io (for real-time notifications and live chat)

### Authentication:
- JWT (JSON Web Tokens)
- Google OAuth

### Video Processing:
- FFMPEG (for transcoding videos)
- Cloudinary / AWS (for media storage)

## 🔧 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/prakashgajjar/youtube-clone.git
   cd youtube-clone
   ```
2. **Backend Setup**
   ```sh
   cd server
   npm install
   npm start
   ```
3. **Frontend Setup**
   ```sh
   cd client
   npm install
   npm start
   ```
4. **Environment Variables** (Create a `.env` file in the root directory)
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   ```
5. **Access the app**
   Open `http://localhost:3000` in your browser.

## 📌 Future Improvements
- Implement AI-based video recommendations
- Add a Shorts feature (similar to YouTube Shorts)
- Implement better analytics for creators

## 🎯 Contributions
Contributions are welcome! Feel free to fork the repo and submit pull requests.

## 📜 License
This project is licensed under the MIT License.

---
Made with ❤️ by [Prakash Suthar](https://github.com/prakashgajjar)
