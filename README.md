# Circulely

**Circulely** is a backend social networking application built with **Node.js, Express.js, and MongoDB**. The platform provides user authentication, profile management, posts, interactions, and secure communication between users through a modular RESTful API.

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Access token validation through authentication middleware
* Password hashing and secure credential handling
* Email verification
* Protected routes and authorization
* Role-based access control
* Account activation and management

### User Management

* Create and manage user profiles
* Update user information
* Retrieve user profiles
* Manage account-related operations
* Secure password update functionality

### Posts & Social Interactions

* Create and manage posts
* Retrieve posts and user content
* Interact with other users' content
* Support for user-generated content and social interactions
* File/image upload functionality

### Security

* Password hashing using bcrypt
* JWT authentication
* Input validation
* Centralized error handling
* Protected API endpoints
* Secure handling of uploaded files
* Environment-based configuration for sensitive credentials

### Email Services

* Email verification
* Account activation
* Automated emails using Nodemailer

### File Uploads

* Multipart/form-data handling with Multer
* Image/file upload processing
* Cloud-based media storage using Cloudinary

## Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **JavaScript**

### Database

* **MongoDB**
* **Mongoose**

### Authentication & Security

* **JSON Web Tokens (JWT)**
* **bcrypt**
* **Input validation**

### Services & Libraries

* **Nodemailer** – Email delivery
* **Multer** – File uploads
* **Cloudinary** – Media storage

### Development Tools

* **Git & GitHub**
* **Postman** – API testing
* **dotenv** – Environment configuration

## Architecture

The project follows a modular backend structure that separates the application's main responsibilities:

```text
src/
├── common/
├── modules/
│   ├── auth/
│   ├── user/
│   ├── post/
│   └── ...
├── middleware/
├── database/
└── app.js
```

The application uses a layered approach to separate:

* Routes
* Controllers
* Services
* Data models
* Authentication and authorization
* Validation
* Error handling

This makes the application easier to maintain, test, and extend.

## Authentication Flow

```text
Client
   │
   ▼
Login / Register
   │
   ▼
Authentication Service
   │
   ├── Validate credentials
   ├── Hash / verify password
   └── Generate JWT
   │
   ▼
Access Token
   │
   ▼
Protected API Endpoint
   │
   ▼
Authentication Middleware
   │
   ▼
Controller → Service → Database
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email_username
EMAIL_PASSWORD=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Never commit your `.env` file or expose your credentials in the repository.

## Installation

Clone the repository:

```bash
git clone https://github.com/Wessal-Ayman1511/Circulely.git
```

Navigate to the project:

```bash
cd Circulely
```

Install dependencies:

```bash
npm install
```

Create and configure your `.env` file, then start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

## API Testing

The API can be tested using **Postman** or any REST API client.

The main API functionality includes:

* Authentication
* User management
* Posts
* Social interactions
* File uploads
* Account verification

## Project Goals

Circulely was built to practice and demonstrate real-world backend development concepts, including:

* RESTful API design
* Authentication and authorization
* Database modeling with MongoDB and Mongoose
* Secure password management
* Email verification
* File and image uploads
* Cloud media storage
* Input validation
* Error handling
* Modular backend architecture

## Author

**Wessal Ayman**

Backend Developer
GitHub: [Wessal-Ayman1511](https://github.com/Wessal-Ayman1511)
