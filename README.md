# Collection Management System - Client

This is the frontend client for the Collection Management System. It is built with React and provides a user interface for managing collections, items, and user accounts.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Internationalization](#internationalization)

## Overview

The frontend client is a React application that interacts with the backend server to perform CRUD operations on collections and items, handle user authentication, and manage user roles.

## Features

- **User Authentication**: Secure login and signup with JWT.
- **Role-Based Access Control**: Admin and user roles with different access levels.
- **Collection and Item Management**: Create, view, and manage collections and items.
- **Responsive Design**: Fully responsive frontend with a modern UI.
- **Multi-language Support**: Support for multiple languages.
- **Dark Mode**: Stylish dark mode support.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For handling routing in the application.
- **i18next**: Internationalization library for React.

## Installation

### Prerequisites

- **Node.js**: Ensure Node.js is installed.

### Clone the Repository

```bash
git clone https://github.com/yourusername/collection-management-client.git
cd collection-management-client
```

Install Dependencies

```bash
npm install
```

Start the Client

```bash
npm run dev
```

The client will run on http://localhost:5173.

## Usage

Visit the Application: Open your browser and go to http://localhost:5173.
Login or Signup: Create an account or log in with your credentials.
Manage Collections: Create new collections, add items, and manage custom fields.
Admin Panel: If logged in as an admin, manage users and their roles.

## Project Structure

![Project Structure](./public/ps.PNG?raw=true "Project Structure")

## Internationalization

The application supports multiple languages. The current languages available are:

English (default)
French
You can switch between languages using the language switcher in the client.

Adding New Languages
Add the translation files in src/i18n/locales.
Update the i18n.js configuration to include the new language.
