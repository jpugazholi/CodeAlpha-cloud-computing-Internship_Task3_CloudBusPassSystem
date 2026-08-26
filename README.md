# 🚍 Cloud Bus Pass System

A full-stack web application that digitizes the bus pass application and management process. Users can register, apply for bus passes, track application status, and access digital passes, while administrators can review and manage applications.

🌐 **Live Demo:** https://cloudbuspasssystem.onrender.com

📂 **Source Code:** https://github.com/jpugazholi/CodeAlpha-cloud-computing-Internship_Task3_CloudBusPassSystem

---

## ✨ Features

### 👤 User Features

* User registration and login
* Secure authentication flow
* Student / Regular bus pass application
* Online application submission
* Application status tracking
* Digital bus pass
* QR code generation
* User profile management

### 🛠️ Admin Features

* Admin login
* Admin dashboard
* View all applications
* Approve or reject applications
* User management
* Application management

---

## 🏗️ Architecture

```text
User / Admin
     │
     ▼
Frontend
HTML + CSS + JavaScript
     │
     │ REST API
     ▼
Spring Boot Backend
     │
     ▼
Spring Data JPA
     │
     ▼
MySQL Database
```

---

## 💻 Tech Stack

| Layer           | Technologies          |
| --------------- | --------------------- |
| Frontend        | HTML, CSS, JavaScript |
| Backend         | Java, Spring Boot     |
| Data Access     | Spring Data JPA       |
| API             | REST APIs             |
| Database        | MySQL                 |
| Build Tool      | Maven                 |
| API Testing     | Postman               |
| Version Control | Git, GitHub           |
| Deployment      | Render                |

---

## 📂 Project Structure

```text
CloudBusPassSystem/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/codealpha/cloudbuspass/
│   │   │   │       ├── controller/
│   │   │   │       ├── entity/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   ├── Dockerfile
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── apply-pass.html
│   ├── status.html
│   ├── digitalpass.html
│   └── admin-dashboard.html
│
└── README.md
```

---

## 🔄 Application Workflow

### User Workflow

```text
Register
   ↓
Login
   ↓
Apply for Bus Pass
   ↓
Application Submitted
   ↓
Admin Review
   ↓
Approved / Rejected
   ↓
Track Status
   ↓
View Digital Pass
```

### Admin Workflow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
View Applications
     ↓
Review Application
     ↓
Approve / Reject
     ↓
Manage Users
```

---

## 🗄️ Database

The application uses **MySQL** for persistent data storage.

### Main Entities

* `User`
* `BusPass`
* `Application`

Spring Data JPA is used for database access and repository operations.

---

## 🔐 Configuration & Security

**Do not commit real passwords, API keys, tokens, or other secrets to GitHub.**

For local development, configure database credentials through environment variables or a local configuration file.

Example:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Example environment variables:

```text
DB_URL=jdbc:mysql://localhost:3306/your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

> Replace these placeholder values only in your local environment or deployment environment. Never put real credentials in this README or public source code.

---

## 🚀 Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/jpugazholi/CodeAlpha-cloud-computing-Internship_Task3_CloudBusPassSystem.git
```

```bash
cd CodeAlpha-cloud-computing-Internship_Task3_CloudBusPassSystem
```

### 2. Configure Database

Create a MySQL database and configure the required environment variables:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
```

### 3. Start Backend

On Windows:

```bash
cd backend
mvnw.cmd spring-boot:run
```

Or with Maven installed:

```bash
mvn spring-boot:run
```

### 4. Start Frontend

Open the `frontend` folder using a local development server such as **VS Code Live Server**.

---

## 🌐 Deployment

The application is deployed on **Render**.

### Live Application

https://cloudbuspasssystem.onrender.com

The deployment connects the frontend, Spring Boot backend, and database to provide a cloud-hosted application.

---

## 🧪 API Testing

REST APIs can be tested using **Postman**.

The backend provides API endpoints for:

* User management
* Authentication
* Bus pass management
* Application management

---

## 🎯 Objectives

* Digitize the traditional bus pass application process
* Reduce manual paperwork
* Allow users to apply online
* Provide application status tracking
* Generate digital bus passes
* Help administrators manage applications efficiently
* Gain practical experience in full-stack and cloud deployment

---

## 📚 CodeAlpha Internship

This project was developed as part of the **CodeAlpha Cloud Computing Internship – Task 3**.

Through this project, I gained practical experience in:

* Java
* Spring Boot
* Spring Data JPA
* REST API development
* MySQL
* Frontend development
* Git & GitHub
* Cloud deployment

---

## 👨‍💻 Developer

### Pugazholi J

**B.Tech Information Technology Student**

GitHub:
https://github.com/jpugazholi

LinkedIn:
https://www.linkedin.com/in/pugazholi-j-849045360/

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📌 Note

This project was created for learning and internship purposes as part of the **CodeAlpha Cloud Computing Internship**.
