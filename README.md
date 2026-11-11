
# StudentHub – Student Management System

Hi! 👋 Welcome to **StudentHub**, a student management application I built as a portfolio project.

The idea behind this project is simple: make it easier to keep student information organised in one place. Users can log in to a dashboard and add, view, update, search, or delete student details.

## ✨ Features

- User registration and login
- Secure authentication using JWT
- Add new student records
- View all student records in a dashboard
- Edit existing student information
- Delete student records
- Search by student name, email, or roll number
- MongoDB database integration
- Responsive user interface

## 🛠️ Technologies Used

| Part | Technologies |
|---|---|
| Frontend | React, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JSON Web Tokens (JWT) |

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Vismayatp/student-management-system.git
cd student-management-system
```

### 2. Install dependencies

Open a terminal in the backend folder:

```bash
cd backend
npm install
```

Open another terminal in the frontend folder:

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the backend folder.

Add the environment variables required by the backend, such as your MongoDB connection string and JWT secret.

Use your own credentials and keep the `.env` file private. Never upload passwords, tokens, or database credentials to GitHub.

### 4. Run the application

Start the backend using the start command configured in `backend/package.json`.

In another terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Open the local URL displayed in your terminal.

## 📌 How to Use

1. Register a new account.
2. Log in using your registered credentials.
3. Access the dashboard.
4. Add student details.
5. View all registered student details.
6. Search for students by name, email, or roll number.
7. Edit student information whenever necessary.
8. Delete student records when they are no longer needed.
9. Click the Logout option to securely exit your account.

## 📚 What I Learned

Building StudentHub helped me gain practical experience with React, Node.js, Express, MongoDB, API integration, and user authentication.

It also helped me understand how frontend and backend components communicate in a full-stack application.

## 🔮 Future Improvements

- Add pagination for student records.
- Introduce more filtering options.
- Add course information

---

**Thanks for checking out StudentHub!**
