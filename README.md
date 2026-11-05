# SlimMom

## Live Demo

- Frontend: https://slimmom-client.onrender.com/
- Backend Health Check: https://slimmom-0tn4.onrender.com/api/health
- API Documentation (Swagger): https://slimmom-0tn4.onrender.com/api-docs
  
SlimMom is a full-stack calorie tracking application that helps users calculate their daily calorie needs, track their food consumption, and monitor their daily nutrition goals.

## Features

- **User Authentication:** Secure registration and login using JWT authentication.
- **Calorie Calculator:** Calculate daily calorie requirements based on personal information.
- **User Profile:** Save and update personal information and daily calorie goals.
- **Food Search:** Search for food products from the product database.
- **Food Diary:** Add and remove consumed food entries for selected dates.
- **Daily Progress:** Track consumed calories and compare them with daily calorie goals.
- **Restricted Products:** View products that are not recommended based on the calorie calculation.
- **Responsive Design:** Interface adapted for desktop and mobile devices.

## Tech Stack

### Frontend

- React
- React Router
- Vite
- JavaScript
- CSS Modules
- React DatePicker

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### API Documentation

- Swagger UI
- swagger-jsdoc

## Project Structure

```text
SlimMom/
├── client/              # React frontend
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── server/              # Express backend
│   ├── src/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/UmutSaatci/SlimMom.git
cd SlimMom
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory using `.env.example` as a reference:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
PORT=3000
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Replace the placeholder values with your own configuration.

### 4. Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend runs on:

`http://localhost:3000`

### 5. Start the frontend

From the `client` directory:

```bash
npm run dev
```

The frontend runs on:

`http://localhost:5173`

## API Documentation

Swagger documentation is available at:

`http://localhost:3000/api-docs`

Health check endpoint:

`GET http://localhost:3000/api/health`

## Available Scripts

### Client

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite development server |
| `npm run build`   | Build the frontend for production |
| `npm run lint`    | Run ESLint                        |
| `npm run preview` | Preview the production build      |

### Server

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start the backend with Nodemon |
| `npm start`             | Start the backend              |
| `npm run seed:products` | Seed the product database      |

## Author

**Umut Saatci**

GitHub: [UmutSaatci](https://github.com/UmutSaatci)

## License

This project is licensed under the ISC License.
