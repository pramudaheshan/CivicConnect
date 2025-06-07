# CivicConnect
CivicConnect is an e-commerce platform project promoting peace, justice, and strong institutions. It features a responsive UI, product listings, and secure checkout with integrated payment gateway (Stripe). Built for a university assignment, focusing on transparency, integrity, and user-friendly design.

---


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend](#frontend)
- [Backend (API)](#backend-api)
- [User & Admin Roles](#user--admin-roles)
- [Setup & Installation](#setup--installation)
- [API Reference](#api-reference)
- [Contact](#contact)
- [License](#license)

---

## Overview![Screenshot_7-6-2025_75242_localhost](https://github.com/user-attachments/assets/672fc529-90f2-40b6-adc0-5f7a56e421c3)


This project is a full-stack web application with the following architecture:

- **Frontend**: React (TypeScript), consuming a RESTful API.
- **Backend**: Node.js (Express, MongoDB) – _backend source code will be published soon_.

The frontend is published and ready to use; the backend is currently not public, but the API endpoints and structure are described below.

---

## Features

- Product listing, search, filtering, and sorting
- Product detail pages
- Add to cart, wishlist
- User authentication (planned)
- User and admin management (planned)
- Role-based access (user/admin)

---

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Other**: bcryptjs for password hashing, JWT for authentication (planned)

---

## Frontend

The frontend is published and available in this repository.  
It consumes a set of APIs for products and user management.

### Run Frontend Locally

```sh
npm install
npm run dev
```

#### API Base URL

The frontend expects the backend API to be available at:

```
http://localhost:5000/api/
```

You can change this in the frontend code if needed.

---

## Backend (API)

**The backend source code is not yet published.**  
However, the frontend uses the following API endpoints:

### Product APIs

- `GET   /api/product` – Get all products
- `GET   /api/product/:id` – Get a single product by id

### User APIs (Planned)

- `GET    /api/users` – Get all users (admin only)
- `GET    /api/users/:id` – Get user by id
- `POST   /api/users` – Create user (registration)
- `PUT    /api/users/:id` – Update user
- `DELETE /api/users/:id` – Delete user (admin only)
- Passwords are securely stored using bcryptjs

### Roles

Each user account has a `role` field: either `user` or `admin`.

#### Example User Object

```json
{
  "id": "U001",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "joinDate": "2024-02-01"
}
```

#### Example Admin Object

```json
{
  "id": "A001",
  "name": "Johni Doe",
  "email": "johni@example.com",
  "role": "admin",
  "joinDate": "2024-02-01"
}
```

---

## User & Admin Roles

- **user**: Can view products, manage own cart/wishlist, update profile.
- **admin**: Can manage all products and users.

---

## Setup & Installation

### Backend

_Backend code will be published soon. It will require:_

- Node.js (18+)
- MongoDB database (local or cloud)
- Environment variables for DB connection

### Frontend

See [Frontend](#frontend) above.

---

## API Reference

See [Backend (API)](#backend-api) for available endpoints.

---

## Contact

If you need the **full backend code** or want to discuss extending this project, **please connect with me**:

- GitHub: [@pramudaheshan](https://github.com/pramudaheshan)
- Email: pramudaheshan77@gmail.com
- Or open an issue or discussion on this repository

---

## License

[MIT](LICENSE)

---

[screen-capture (3).webm](https://github.com/user-attachments/assets/40814184-7023-41a3-922e-071f62949a56)

> _Note: The backend code will be released in a future update. For now, the frontend expects the above API structure. If you have questions or want the full source code, please connect with me directly._
