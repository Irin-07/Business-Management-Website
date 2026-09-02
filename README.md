# Professional Business Management Website

A full-stack business management application built with ReactJS, Node.js, Express.js, MongoDB Atlas and JWT authentication.

## Features
- Home, About, Services, Contact, Login and Register pages
- JWT authentication with protected dashboard
- Password hashing with bcrypt
- Customer CRUD: create, list, details, update and delete
- Customer search and status filter
- Dashboard summary cards and recent customers
- Frontend + backend validation
- Centralized API error handling
- Responsive Bootstrap UI
- Environment variables and `.env.example`

## Project structure
```text
business-management-app/
  frontend/
  backend/
  README.md
```

## 1. Backend setup
```bash
cd backend
npm install
```

Create `.env` from `.env.example`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
```

Start backend:
```bash
npm run dev
```

## 2. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

The frontend uses `VITE_API_URL=http://localhost:5000/api` by default.

## 3. MongoDB Atlas
1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add your development IP address under Network Access.
4. Copy the connection string.
5. Put it in `backend/.env` as `MONGODB_URI`.

## API documentation

### Auth
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login and receive JWT
- GET `/api/auth/profile` - Get logged-in user

### Customers
All customer endpoints require `Authorization: Bearer <token>`.
- POST `/api/customers` - Create customer
- GET `/api/customers` - List/search/filter customers
- GET `/api/customers/:id` - Get customer details
- PUT `/api/customers/:id` - Update customer
- DELETE `/api/customers/:id` - Delete customer

Query examples:
`GET /api/customers?search=John&status=Active`

## Git
Do not commit `.env`, passwords, secrets or `node_modules`.
