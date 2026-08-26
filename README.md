# 🚌 Cloud Bus Pass System

A web-based **Cloud Bus Pass Management System** developed as part of the **CodeAlpha Cloud Computing Internship – Task 3**.

The system provides a digital platform for users to register, apply for bus passes, track application status, and allows administrators to manage and approve bus pass applications.

## 📌 Project Overview

Traditional bus pass application processes can involve manual paperwork, delays, and difficulty tracking application status.

The **Cloud Bus Pass System** aims to simplify this process by providing a centralized digital platform for managing users, bus pass applications, and administrative approvals.

## ✨ Features

### 👤 User Features

* User registration
* User login
* Profile management
* Apply for a bus pass
* Select bus pass type and route
* View application status
* View submitted applications
* Digital bus pass information

### 🔐 Admin Features

* Admin login
* Admin dashboard
* View all bus pass applications
* Approve applications
* Reject applications
* View registered users
* Manage bus pass applications

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      User/Admin      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Web Frontend      │
                    │ HTML / CSS / JS      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      MySQL DB        │
                    │ Users / Applications │
                    │    / Bus Passes      │
                    └──────────────────────┘
```

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Java
* Spring Boot
* Spring Data JPA
* REST APIs
* Maven

### Database

* MySQL
* Hibernate / JPA

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman

## 📂 Project Structure

```text
CodeAlpha-cloud-computing-Internship_Task3_CloudBusPassSystem/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── admin-login.html
│   ├── dashboard.html
│   ├── admin-dashboard.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   │
│   ├── pom.xml
│   └── mvnw
│
├── .gitignore
└── README.md
```

> File names may vary depending on the current implementation.

## 🗄️ Database

The application uses MySQL for storing application data.

### Main Tables

* `users`
* `bus_passes`
* `applications`

### User Data

Stores user registration and account information.

### Bus Pass Data

Stores bus pass type, route, and amount details.

### Application Data

Stores bus pass applications, users, and application status.

## 🔄 Application Workflow

```text
User Registration
       ↓
User Login
       ↓
Apply for Bus Pass
       ↓
Application Submitted
       ↓
Admin Reviews Application
       ↓
Approve / Reject
       ↓
User Checks Application Status
```

## 🚀 Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/jpugazholi/CodeAlpha-cloud-computing-Internship_Task3_CloudBusPassSystem.git
```

### 2. Open the Project

```bash
cd CodeAlpha-cloud-computing-Internship_Task3_CloudBusPassSystem
```

### 3. Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE buspass_db;
```

Update the database configuration in:

```text
backend/src/main/resources/application.properties
```

Use your own local database credentials.

### 4. Start the Spring Boot Backend

Windows:

```cmd
cd backend
mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### 5. Run the Frontend

Open the `frontend` folder using **VS Code Live Server** or another local web server.

## 🧪 Testing

The application has been tested locally for:

* User registration
* User login
* Bus pass application
* Application status retrieval
* Admin login
* Admin application management
* MySQL database operations
* Frontend-backend communication

## ☁️ Cloud Deployment

Cloud deployment is currently **in progress**.

The planned deployment architecture is:

```text
Frontend
   ↓
Cloud Hosting
   ↓
Spring Boot Backend
   ↓
Cloud MySQL Database
```

The project will be further configured for cloud deployment as part of the CodeAlpha Cloud Computing Internship.

## 🎯 Internship Task

**Organization:** CodeAlpha
**Internship:** Cloud Computing Internship
**Task:** Task 3 – Cloud Bus Pass System

This project is being developed to gain practical experience in:

* Cloud Computing
* Backend Development
* REST API Development
* Database Management
* Web Application Development
* Git & GitHub
* Cloud Deployment

## 👨‍💻 Author

**Pugazholi J**

B.Tech Information Technology Student
Java | Spring Boot | Backend Development | DSA

## 📄 License

This project was developed for educational and internship purposes.

---

⭐ If you find this project useful, consider giving the repository a star!
