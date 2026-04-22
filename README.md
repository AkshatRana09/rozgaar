# Rozgaar 🇮🇳
### *Apna Kaam, Apni Pehchaan*

> India's AI-powered job portal and applicant tracking system built with the MERN stack.

![Rozgaar](https://img.shields.io/badge/Rozgaar-AI%20Job%20Portal-6C63FF?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## 🔗 Links
- 🌐 **Live Demo:** [rozgaar-lilac.vercel.app](https://rozgaar-lilac.vercel.app)
- ⚙️ **Backend API:** [rozgaar-uj27.onrender.com](https://rozgaar-uj27.onrender.com)
- 📦 **GitHub:** [AkshatRana09/rozgaar](https://github.com/AkshatRana09/rozgaar)

---

## 📌 What is Rozgaar?

Rozgaar is a production-grade full-stack job portal where:
- **Job Seekers** browse jobs, upload resumes, apply, and track application status in real-time
- **Recruiters** post jobs, manage applicants, and get AI-ranked candidates instantly
- **AI Layer** automatically scores resumes against job descriptions using Gemini API

---

## 🖥️ Screenshots

| Home Page | Jobs Page |
|---|---|
| ![Home](https://via.placeholder.com/400x250?text=Home+Page) | ![Jobs](https://via.placeholder.com/400x250?text=Jobs+Page) |

| Recruiter Dashboard | Seeker Dashboard |
|---|---|
| ![Recruiter](https://via.placeholder.com/400x250?text=Recruiter+Dashboard) | ![Seeker](https://via.placeholder.com/400x250?text=Seeker+Dashboard) |

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
- Seeker gets notified when application status changes
- Recruiter gets notified on new application

### 📊 Dashboards
- **Seeker Dashboard:** Track all applications with status badges
- **Recruiter Dashboard:** Manage jobs, view ranked applicants, update status

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS v4, Zustand, Socket.io-client |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs, httpOnly Cookies |
| AI | Google Gemini API |
| File Storage | Cloudinary, Multer |
| Real-time | Socket.io |
| Deployment | Vercel (Frontend), Render (Backend), MongoDB Atlas |

---

## 📁 Project Structure
rozgaar/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Navbar, JobCard
│   │   ├── pages/          # Home, Jobs, Dashboard
│   │   ├── store/          # Zustand auth store
│   │   └── lib/            # Axios instance
├── server/                 # Node/Express Backend
│   ├── config/             # DB connection
│   ├── controllers/        # Auth, Job, Application
│   ├── middleware/         # JWT, Role guard, Upload
│   ├── models/             # User, Job, Application
│   ├── routes/             # API routes
│   └── utils/              # Cloudinary, AI Scoring

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account
- Google Gemini API key

### Installation

**1. Clone the repo**
```bash
git clone https://github.com/AkshatRana09/rozgaar.git
cd rozgaar
```

**2. Setup Backend**
```bash
cd server
npm install
```

Create `server/.env`:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_key
PORT=5000
```

```bash
npm run dev
```

**3. Setup Frontend**
```bash
cd client
npm install
npm run dev
```

**4. Open** `http://localhost:5173` 🚀

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| GET | `/api/auth/me` | Get current user | Private |

### Jobs
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/jobs` | Get all jobs (filters) | Public |
| POST | `/api/jobs` | Create job | Recruiter |
| GET | `/api/jobs/:id` | Get single job | Public |
| PUT | `/api/jobs/:id` | Update job | Recruiter |
| DELETE | `/api/jobs/:id` | Delete job | Recruiter |
| GET | `/api/jobs/recruiter/myjobs` | Get my jobs | Recruiter |

### Applications
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/applications/:jobId` | Apply for job | Seeker |
| GET | `/api/applications/my` | Get my applications | Seeker |
| GET | `/api/applications/job/:jobId` | Get job applicants | Recruiter |
| PUT | `/api/applications/:id/status` | Update status | Recruiter |
| DELETE | `/api/applications/:id` | Withdraw application | Seeker |

### Upload
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/upload/resume` | Upload resume | Private |
| POST | `/api/upload/avatar` | Upload avatar | Private |

---

## 🔮 Upcoming Features
- [ ] Email OTP verification
- [ ] Admin analytics dashboard
- [ ] Chrome extension for auto-fill
- [ ] Stripe payment for recruiter credits
- [ ] Mobile app (React Native)

---

## 👨‍💻 Author

**Akshat Rana**
- 🌐 Portfolio: [coming soon]
- 💼 LinkedIn: [linkedin.com/in/akshat09rana](https://linkedin.com/in/akshat09rana)
- 📦 GitHub: [@AkshatRana09](https://github.com/AkshatRana09)
- 📧 Email: ranaakshat2005@gmail.com

---

## 📄 License
MIT License — feel free to use this project for learning!

---

⭐ **Star this repo if you found it helpful!**
