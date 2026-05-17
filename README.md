# NotesApp Frontend (React + TypeScript)

##  Project Overview
This is a responsive frontend for Notes Application built using React, TypeScript, Tailwind CSS, and shadcn/ui.

It connects with Django backend via REST APIs.

---

##  Features

- User Login / Register
- JWT Authentication
- Create Notes
- View Notes
- Delete Notes
- Favorite Notes
- Search Notes
- Responsive UI
- Modern dashboard design

---

##  Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- shadcn/ui

---

##  Authentication Flow

- User logs in
- JWT token stored in localStorage
- Token used in API requests

---

##  API Integration

Base URL:

http://127.0.0.1:8000/api/


Endpoints:

POST /register/
POST /login/
GET /notes/
POST /notes/
PUT /notes/<id>/
DELETE /notes/<id>/


---

##  Setup Instructions

```bash
npm install

npm run dev

npm run build

📱 UI Features
Modern dashboard layout
Sidebar navigation
Search functionality
Favorites system
Card-based notes UI


 Author

Mohammed Jaseel