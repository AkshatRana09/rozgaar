# Rozgaar 🇮🇳
### *Apna Kaam, Apni Pehchaan*

> India's AI-powered job portal and applicant tracking system built with the MERN stack.

![Rozgaar Banner](https://img.shields.io/badge/Rozgaar-AI%20Job%20Portal-6C63FF?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## 🔗 Links
- 🌐 **Live Demo:** [rozgaar.vercel.app](https://rozgaar.vercel.app)
- 🖥️ **Backend API:** [rozgaar-api.onrender.com](https://rozgaar-api.onrender.com)

---

## 📌 What is Rozgaar?

Rozgaar is a full-stack job portal where:
- **Job Seekers** can browse jobs, upload resumes, apply, and track application status in real-time
- **Recruiters** can post jobs, manage applicants, and get AI-ranked candidates instantly
- **AI Layer** automatically scores resumes against job descriptions using Gemini API

---

## ✨ Features

### 👤 Authentication
- JWT-based auth with httpOnly cookies
- Role-based access control (Seeker / Recruiter / Admin)
- Secure password hashing with bcryptjs

### 💼 Job Management
- Post, edit, delete jobs (Recruiter)
- Search & filter by location, job type, experience, salary
- Pagination support

### 📄 Resume & Applications
- Cloud resume upload via Cloudinary
- One-click apply with cover letter
- Duplicate application prevention

### 🤖 AI Resume Scoring
- Gemini API scores each resume against job description
- Recruiters see AI match score (0-100) per applicant
- Saves hours of manual shortlisting

### ⚡ Real-time Notifications
- Socket.io powered instant notifications
- Seeker gets notified when status changes
- Recruiter gets notified on new application

### 📊 Dashboards
- **Seeker Dashboard:** Track all applications + status badges
- **Recruiter Dashboard:** Manage jobs + view ranked applicants

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Zustand, Socket.io-client |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs, httpOnly Cookies |
| AI | Google Gemini API |
| File Storage | Cloudinary, Multer |
| Real-time | Socket.io |
| Deployment | Vercel (Frontend), Render (Backend), MongoDB Atlas |

---

## 📁 Project Structure
