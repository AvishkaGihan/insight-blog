# INSIGHT

This is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It's a blogging platform where users can create, read, update, and delete blog posts. Users can also leave comments on posts and like/dislike comments.

## Features

- User authentication (sign up, sign in, sign out)
- Create, read, update, and delete blog posts
- Leave comments on blog posts
- Like/dislike comments
- Admin panel to manage users and posts
- Responsive design

## Technologies Used

### Frontend

- React.js
- React Router
- Redux Toolkit
- Tailwind CSS
- Flowbite React
- Firebase (for authentication)

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- MongoDB installed and running locally or a MongoDB Atlas account

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AvishkaGihan/insight-blog.git
    ```

2. Install dependencies for the server:
    ```bash
    cd insight-blog
    npm install
    ```

3. Install dependencies for the client:
    ```bash
    cd client
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGO=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    VITE_FIREBASE_API_KEY=your-firebase-api-key
    ```

5. Start the server:
    ```bash
    npm run dev
    ```

6. Start the client in a separate terminal:
    ```bash
    cd client
    npm run dev
    ```

The application should now be running at [http://localhost:5173](http://localhost:5173).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
