# Todo Web Application with Python Flask and Docker

## Overview

A simple yet functional Todo web application built with:
- **Backend**: Python Flask
- **Frontend**: HTML, CSS, and JavaScript
- **Containerization**: Docker

## Features

- Add new todo items
- Mark items as complete
- Delete items
- Filter items (All/Active/Completed)
- Persistent storage (in-memory for this demo)
- Responsive design that works on mobile and desktop

## Prerequisites

- Docker installed on your system
- (Optional) Python 3.9+ if you want to run without Docker

## Getting Started

### Running with Docker (Recommended)

1. **Build the Docker image**:
   ```bash
   docker build -t todo-app .
   ```

2. **Run the container**:
   ```bash
   docker run -d -p 5000:5000 --name my-todo-app todo-app
   ```

3. **Access the application**:
   Open your browser and go to:
   ```
   http://localhost:5000
   ```

### Running without Docker

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Flask application**:
   ```bash
   python app.py
   ```

3. **Access the application**:
   ```
   http://localhost:5000
   ```

## Project Structure

```
todo-app/
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker configuration
├── templates/
│   └── index.html      # HTML template
├── static/
│   ├── style.css       # CSS stylesheet
│   └── app.js          # JavaScript functionality
└── README.md           # This file
```

## API Endpoints

The application provides these RESTful API endpoints:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/<id>` - Update a todo
- `DELETE /api/todos/<id>` - Delete a todo

## Development

### Rebuilding the Docker Image

After making changes to the code:
```bash
docker build -t todo-app .
docker stop my-todo-app
docker rm my-todo-app
docker run -d -p 5000:5000 --name my-todo-app todo-app
```

### Development Mode with Hot Reload

For development with automatic reloading:
```bash
docker run -p 5000:5000 -v $(pwd):/app --name todo-dev todo-app
```

## Notes

- This application uses in-memory storage for simplicity. Todos will be lost when the container stops.
- For production use, consider adding a proper database like SQLite or PostgreSQL.

## License

This project is open-source and available under the MIT License.
