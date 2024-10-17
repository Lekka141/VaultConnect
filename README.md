# VaultConnect

VaultConnect is a secure, privacy-focused digital dashboard designed to consolidate your digital life in one platform. Manage files, calendars, tasks, and widgets with a focus on security and personalization.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
   1. [Prerequisites](#prerequisites)
   2. [Clone the Repository](#clone-the-repository)
   3. [Backend Setup](#backend-setup)
   4. [Frontend Setup](#frontend-setup)
5. [Environment Variables](#environment-variables)
6. [API Documentation](#api-documentation)
7. [Directory Structure](#directory-structure)
8. [Contributing](#contributing)
9. [License](#license)

---

## Introduction

VaultConnect is a privacy-first digital dashboard that offers users a single platform to manage their files, calendars, widgets (such as weather and financial news), and tasks. Designed with security in mind, VaultConnect ensures that user data is protected while providing a customizable interface for personal and professional use.

---

## Features

- **File Management**: Upload, store, and manage your files securely using MongoDB Atlas.
- **Task Management**: Track your daily tasks using the integrated to-do widget.
- **Calendar Management**: Manage calendar events, reminders, and appointments.
- **Custom Widgets**: Add and customize widgets like Weather, Financial News, RSS Feeds, etc.
- **Secure Authentication**: User login and registration with JWT-based authentication.
- **Customizable Dashboard**: Modify your dashboard layout and add/remove widgets as needed.
- **Real-Time Notifications**: Stay updated with the latest alerts from integrated widgets.

---

## Technologies Used

- **Frontend**: React, Axios, Material-UI for responsive UI components.
- **Backend**: Node.js, Express.js, MongoDB Atlas, JWT for authentication.
- **Database**: MongoDB Atlas for secure and scalable storage.
- **API Integration**: OpenWeather API for weather data, NewsAPI for financial news.
- **Testing**: Jest for unit testing and integration tests.

---

## Installation

### Prerequisites

Ensure that the following are installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account

### Clone the Repository

```bash
git clone https://github.com/yourusername/VaultConnect.git
cd VaultConnect
```

### Backend Setup

1. Navigate to the `Backend` folder:

```bash
cd Backend
```

2. Install the required dependencies:

```bash
npm install
```

3. Set up the environment variables in the `Backend/Config/.env` file:

```
PORT=5000
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:

```bash
npm run start
```

### Frontend Setup

1. Navigate to the `Frontend` folder:

```bash
cd ../Frontend
```

2. Install the required dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm start
```

The app will run at `http://localhost:3000`.

---

## Environment Variables

Create an `.env` file in the `Config` directory for both backend and frontend, with the following values:

### Backend:

```
PORT=5000
MONGO_URI=your_mongo_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend:

```
REACT_APP_API_URL=http://localhost:5000
```

---

## API Documentation

The API documentation for VaultConnect can be found in the [API Documentation](Docs/API.md).

Key endpoints include:

- **/api/users/signup**: Register a new user.
- **/api/users/signin**: Authenticate a user.
- **/api/files**: Upload and manage files.
- **/api/calendar**: Manage calendar events.
- **/api/widgets**: Retrieve and manage widgets data.

Refer to the [API.md](Docs/API.md) file for detailed usage and sample requests.

---

## Directory Structure

```
VaultConnect/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── src/
│   ├── tests/
│   └── utils/
│
├── Config/
│   ├── config.json
│   └── .env
│
├── Docs/
│   ├── API.md
│   ├── UserGuide.md
│   └── Scripts/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   └── tests/
│
├── Images/
│   ├── Logo.png
│   
│
├── Scripts/
│   ├── build.sh
│   └── setup.sh
│
├── Tests/
│   ├── e2e/
│   └── unit/
│
├── LICENSE
├── README.md
└── package.json
```

---

## Contributing

We welcome contributions to VaultConnect! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributors

VaultConnect was developed by:

- **Rudzani Matidze**
- **Thomas Manhica**
- **Keegan Joubert**
