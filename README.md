# Saraha App - Anonymous Messaging Platform

A secure, full-stack anonymous messaging application built with Node.js, Express, and MongoDB. Users can communicate anonymously while maintaining security through proper authentication and data encryption.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Email Verification**: Account activation through email verification
- **Data Encryption**: Personal information encrypted using AES encryption
- **Role-Based Access**: Admin and User role management
- **Account Management**: Account freeze/unfreeze functionality
- **Secure Messaging**: Anonymous communication platform
- **Input Validation**: Comprehensive validation using Joi schemas
- **Error Handling**: Global error handling and logging

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens), bcrypt
- **Encryption**: CryptoJS for data encryption/decryption
- **Email**: Nodemailer for email services
- **Validation**: Joi for input validation
- **Deployment**: EvenNode

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/          # Authentication module
│   ├── user/          # User management module
│   └── message/       # Messaging module
├── middlewares/        # Custom middleware functions
├── db/                # Database models and connection
├── utils/             # Utility functions and helpers
└── app.controller.js  # Main application setup
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.17.1 or higher)
- MongoDB database
- Email service credentials (Gmail recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saraha-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT
   JWT_KEY=your_jwt_secret_key
   
   # Email (Gmail)
   EMAIL=your_email@gmail.com
   PASSWORD=your_app_password
   
   # Encryption
   CRYPTO_KEY=your_encryption_key
   ```

4. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run start:dev
   
   # Production mode
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | User registration |
| `POST` | `/auth/login` | User login |
| `GET` | `/auth/activate-account/:token` | Activate account |

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user/profile` | Get user profile |
| `DELETE` | `/user/freeze` | Freeze user account |

### Message Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| Various | `/message/*` | Message-related operations |

## 🔐 Authentication

The application uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: access <your_jwt_token>
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **Data Encryption**: AES encryption for sensitive personal data
- **Token Management**: JWT tokens with configurable expiration
- **Input Validation**: Comprehensive validation at multiple layers
- **Error Handling**: Secure error messages without information leakage

## 📧 Email Verification

Upon registration, users receive an email with an activation link. The link contains a JWT token that expires in 1 hour.

## 🗄️ Database Models

### User Model
- `userName`: Unique username
- `email`: Unique email address
- `password`: Hashed password
- `phone`: Encrypted phone number
- `gender`: User gender
- `role`: User role (admin/user)
- `isConfirmed`: Email verification status
- `isDeleted`: Account deletion status
- `deletedAt`: Deletion timestamp

### Message Model
- Message-related fields for anonymous communication

## 🚀 Deployment

The application is deployed on **EvenNode** and accessible at:
```
https://sara7a-app.eu-4.evennode.com
```

### Deployment Steps
1. Configure environment variables on EvenNode
2. Set up MongoDB connection
3. Configure email service credentials
4. Deploy the application

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_KEY` | JWT secret key | Yes |
| `EMAIL` | Email service username | Yes |
| `PASSWORD` | Email service password | Yes |
| `CRYPTO_KEY` | Encryption key | Yes |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

[Your Name] - [Your Email]

## 🙏 Acknowledgments

- Express.js community
- MongoDB documentation
- JWT implementation guides
- CryptoJS library

---

**Note**: This is a production-ready application with comprehensive security features. Make sure to properly configure all environment variables before deployment.
