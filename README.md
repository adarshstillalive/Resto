# Resto- Restaurant Listing Platform

## Project Overview
The Restaurant Listing Platform is a full-stack mini web application built using Clean Architecture principles. It enables users to manage restaurant listings efficiently, allowing for CRUD operations on restaurant data. The application uses PostgreSQL as the database, Material-UI for UI components, and Axios for API calls.

---

## Features

### 1. **Restaurant Management**
- Display a list of restaurants with name, address, and contact details.
- Add new restaurants via a form.
- Update restaurant information.
- Delete restaurants from the platform.

### 2. **Modern UI Design**
- Utilizes Material-UI for a clean and professional interface.
- Responsive design for mobile and desktop compatibility.

### 3. **Backend API with Node.js**
- RESTful API built using Express.js.
- Efficient model structure using Sequelize ORM.
- PostgreSQL as the database.

### 4. **API Communication**
- Uses Axios for making API calls.
- Provides smooth interaction between frontend and backend.

### 5. **Database Management**
- Sequelize migrations for handling schema changes effectively.
- Ensures data consistency and integrity.

---

## Tech Stack

### **Backend**
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- TypeScript

### **Frontend**
- React.js
- Material-UI
- Axios
- TypeScript

---

## Installation Instructions

### Prerequisites
- Node.js (v20.x)
- PostgreSQL (cloud instance)
- Git

1. **Clone the Repository**

   ```bash
   git clone https://github.com/adarshstillalive/Resto
   cd Resto
   ```

2. **Install Dependencies:**
   - **For the backend**

     ```bash
     cd server
     npm install
     ```
   - **For the frontend**

     ```bash
     cd client
     npm install
     ```

3. **Set up Environment Variables: Server**
  - Create a `.env` file in the `server` directory with the following variables:
    
    ```bash
    PORT=8080
    CLIENT_URL=<client_url>
    DATABASE_URL=<database_url>
    ```

4. **Set up Environment Variables: Client**
  - Create a `.env` file in the `client` directory with the following variables:
    
    ```bash
    VITE_SERVER_URL=<server_url>
    ```

5. **Run the Application:**
   - **Start the backend server**

     ```bash
     cd server
     npm start
     ```
   - **Start the frontend development server**

     ```bash
     cd client
     npm run dev
     ```

6. **Access the Application**
   - Open your browser and visit: `http://localhost:<frontend_port>`

---

## API Documentation

**Endpoints**

### Restaurant Routes
- **GET /restaurant**: Fetch all restaurants.
- **POST /restaurant**: Add a new restaurant.
- **PUT /restaurant/:id**: Update a restaurant.
- **DELETE /restaurant/:id**: Remove a restaurant.

---

## Deployment
The application is hosted live at: [https://resto-bay-eight.vercel.app](https://resto-bay-eight.vercel.app)

---

## Contact
For any queries or suggestions, feel free to reach out:
- **Author**: Adarsh K S
- **Email**: adarshstillalive@gmail.com
- **LinkedIn**: [www.linkedin.com/in/adarshks17](https://www.linkedin.com/in/adarshks17)

