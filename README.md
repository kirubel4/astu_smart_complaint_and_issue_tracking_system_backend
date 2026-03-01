# Complaint Management System Backend

## Overview

This backend application provides the complete API required for the Complaint Management System. It includes user authentication, complaint processing, category management, and administrative functions. The backend is designed to be modular, scalable, and secure, serving as the central processing unit for all frontend interactions.

The system follows a RESTful API structure with predictable endpoints, validation layers, authentication middleware, and well-organized controllers. It supports role-based access control to differentiate between standard users and administrators.

---

## Features

### User Operations

1. **Authentication**
   Includes registration and login with hashed passwords and token-based authentication. Each authenticated user receives a signed token allowing them to perform authorized actions.

2. **Complaint Submission**
   Users can submit complaints by providing titles, descriptions, and categories. Input validation ensures correct formatting and prevents invalid content.

3. **Complaint Tracking**
   Users can retrieve their complaints with full metadata, timestamps, statuses, and admin notes.


### Admin Operations

1. **Complaint Review**
   Administrators can view all complaints, filter them by status or category, update complaint statuses, request more information, resolve complaints, or decline invalid submissions.

2. **Category Management**
   Admins can create new categories, update existing ones, or remove obsolete categories.

3. **User Management**
   Admins can view all users, update user roles, activate or deactivate accounts, and perform account reviews.


## Technologies

- Node.js
- Express.js
- TypeScript for safety
- PostgreSQL for persistent storage
- Prisma as ORM
- JSON Web Tokens for authentication
- bcrypt for password hashing
- CORS for enhanced security

## Security

The backend includes:

- Middleware-based authentication
- Role-based authorization
- Sanitized input handling
- Password hashing with bcrypt
- Token signing using secure encryption
- Requests validation through schema validators
