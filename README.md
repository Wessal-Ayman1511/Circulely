# Circulely

**Circulely** is a backend social networking platform built with **Node.js, Express.js, and MongoDB**. It provides a secure and structured RESTful API for user authentication, profile management, posts, social interactions, and media handling.

The project focuses on applying real-world backend development practices, including modular architecture, authentication and authorization, database modeling, request validation, centralized error handling, email verification, and cloud-based file storage.

## Features

* **Authentication & Authorization** — Secure registration and login using JWT, protected routes, email verification, and role-based authorization.
* **User Management** — Profile management and secure account operations.
* **Posts & Social Interactions** — Create, retrieve, update, and manage user-generated content.
* **Media Management** — Handle file uploads with Multer and store media using Cloudinary.
* **Email Services** — Account verification and automated emails using Nodemailer.
* **Validation & Error Handling** — Request validation and centralized error handling for consistent API responses.
* **Security** — Password hashing with bcrypt, JWT authentication, and environment-based configuration for sensitive credentials.

## Tech Stack

**Backend:** Node.js, Express.js
**Database:** MongoDB, Mongoose
**Authentication:** JWT, bcrypt
**File Storage:** Cloudinary, Multer
**Email:** Nodemailer
**Testing:** Postman
**Version Control:** Git, GitHub

## Architecture

The application follows a modular backend architecture that separates routing, controllers, business logic, and database operations.

```text
src/
├── Modules/
│   ├── Auth/
│   ├── User/
│   ├── Post/
│   └── ...
├── Middleware/
├── DB/
├── Utils/
└── app.js
```

This structure promotes **separation of concerns, maintainability, and scalability**.

## Getting Started

### Prerequisites

* Node.js
* MongoDB
* npm

### Installation

```bash
git clone https://github.com/Wessal-Ayman1511/Circulely.git
cd Circulely
npm install
```

Create a `.env` file and configure the required environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

Start the development server:

```bash
npm run dev
```

## API

The application exposes RESTful endpoints for:

* Authentication
* Users
* Posts
* Media uploads
* Account verification

API endpoints can be tested using **Postman**.

## Security

Circulely implements several security practices:

* JWT-based authentication
* Password hashing with bcrypt
* Protected routes
* Role-based authorization
* Request validation
* Secure environment configuration
* Centralized error handling

## Project Purpose

Circulely was developed to strengthen practical backend engineering skills and demonstrate the ability to design and implement a **secure, modular, and maintainable RESTful backend application** using the Node.js ecosystem.

## Author

**Wessal Ayman**

[GitHub](https://github.com/Wessal-Ayman1511)
