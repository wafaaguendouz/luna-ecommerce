# Luna Ecommerce SaaS(2021)

Luna is a multi-tenant SaaS e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to create and manage their own online stores, supporting both shop owners and customers with a robust, scalable solution.

## Features

- Multi-tenant architecture: each shop has its own subdomain
- User authentication and authorization (JWT)
- Product, order, and shop management
- Seller and customer dashboards
- File uploads for product images
- Internationalization (i18n) support (English, French, etc.)
- Responsive frontend with React and Bootstrap
- RESTful API backend with Express and MongoDB
- Development and production environments

## Folder Structure

```
luna-master/
  backend/    # Express API, MongoDB models, routes, controllers
  frontend/   # React app (Create React App), Redux, i18n
  uploads/    # Uploaded files (product images, etc.)
  .env        # Environment variables (not committed)
  .gitignore
  package.json
```

## Installation

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/wafaaguendouz/luna-ecommerce.git
cd luna-ecommerce
```

### 2. Install dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

### 3. Environment Variables

Create a `.env` file in the `backend/` directory with the following (example):

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the app (development)

```bash
npm run dev
```

- The backend runs on `http://localhost:5000`
- The frontend runs on `http://localhost:3000` (proxy to backend)

## Usage

- Register as a user or seller
- Create and manage your shop (as a seller)
- Browse and purchase products (as a customer)
- Manage orders, products, and users from the dashboard
