# 🚀 Node.js + MySQL + Docker CRUD App

This is a **Node.js + MySQL CRUD application** built with **Express.js** and **Docker**.\
It supports **database operations, search functionality, and auto-deployment** using GitHub Actions.

---

## 📌 **Features**

✅ Full-Stack API with **Node.js & Express**\
✅ Database Integration with **MySQL**\
✅ Supports **Create, Read, Update, Delete (CRUD)** operations\
✅ **Search Feature** to find specific records\
✅ **Docker-Ready** (Runs in containers)\
✅ **Auto Deployment** via GitHub Actions\
✅ **Environment Variables Support (**``** file)**\
✅ **GitHub Actions for CI/CD**\
✅ **Detailed API Documentation & Testing Guide**

---

## 🚀 **Installation (Without Docker)**

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Setup **``** File (MySQL Configuration)**\
Create a `.env` file in the project root and add:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=nodedb
   PORT=3000
   ```
4. **Start MySQL (If Not Using Docker)**
   - Ensure MySQL is installed and running.
   - Create a new database manually:
     ```sql
     CREATE DATABASE nodedb;
     ```
5. **Run the Server**
   ```sh
   node server.js
   ```
6. Open `` in your browser. 🎉

---

## 🐳 **Run with Docker (Recommended)**

1. **Install Docker & Docker Compose**
   - [Download Docker](https://www.docker.com/get-started)
2. **Build & Start the Containers**
   ```sh
   docker-compose up --build
   ```
3. Open `` to access the app.

---

## 📂 **Project Structure**

```
📦 my-node-app
┣ 📂 public/            # Frontend (HTML, JS, CSS)
┃ ┗ 📜 index.html       # Main HTML page
┣ 📜 server.js          # Backend API (Express.js)
┣ 📜 Dockerfile         # Docker container configuration
┣ 📜 docker-compose.yml # Multi-container setup (MySQL + Node.js)
┣ 📜 package.json       # Node.js dependencies
┣ 📜 .env               # Environment variables (DB credentials)
┣ 📜 README.md          # Project Documentation (This File)
┣ 📜 .gitignore         # Ignore unnecessary files
```

---

## 📡 **API Endpoints**

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/data`       | Fetch all records |
| POST   | `/add`        | Add a new record  |
| PUT    | `/update/:id` | Update a record   |
| DELETE | `/delete/:id` | Delete a record   |

### Example Request

#### **1️⃣ Add a Record**

```sh
curl -X POST http://localhost:3000/add \
     -H "Content-Type: application/json" \
     -d '{"name": "John", "description": "Sample entry"}'
```

#### **2️⃣ Get All Records**

```sh
curl -X GET http://localhost:3000/data
```

#### **3️⃣ Update a Record**

```sh
curl -X PUT http://localhost:3000/update/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Name", "description": "Updated description"}'
```

#### **4️⃣ Delete a Record**

```sh
curl -X DELETE http://localhost:3000/delete/1
```

---

## 🔧 **Troubleshooting**

### ❌ **Port 3306 Already in Use (MySQL Conflict)**

**Solution:** Change the MySQL port in `docker-compose.yml`:

```yaml
ports:
  - "3307:3306"
```

Then connect using `DB_HOST=localhost:3307`.

### ❌ **Content Security Policy (CSP) Blocks JavaScript**

**Solution:** Update `server.js` with Helmet:

```javascript
const helmet = require("helmet");
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "http://localhost:3000"],
      },
    },
  })
);
```

### ❌ **Database Connection Failing in Docker**

**Solution:** Check logs for MySQL readiness:

```sh
docker-compose logs -f db
```

Then retry:

```sh
docker-compose restart app
```

---

## 🚀 **Deployment (GitHub Actions)**

This project **automatically deploys** using GitHub Actions.\
To enable deployment:

1. **Create a GitHub Actions Workflow** in `.github/workflows/deploy.yml`:

   ```yaml
   name: Deploy with Docker

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest

       services:
         mysql:
           image: mysql:8.0
           env:
             MYSQL_ROOT_PASSWORD: root
             MYSQL_DATABASE: nodedb
             MYSQL_USER: user
             MYSQL_PASSWORD: password
           ports:
             - 3306:3306

       steps:
         - name: Checkout Repository
           uses: actions/checkout@v3

         - name: Set up Docker Buildx
           uses: docker/setup-buildx-action@v2

         - name: Build and Run Docker Compose
           run: |
             docker-compose up --build -d
             sleep 20  # Give MySQL time to start
             docker ps
   ```

---

## 📜 **License**

This project is open-source and available under the **MIT License**.

---

### 🌟 **Like this project? Give it a ⭐ on GitHub!** 😊🚀
