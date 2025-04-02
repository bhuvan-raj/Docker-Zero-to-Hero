# URL Shortener with Docker Compose  

A simple URL shortening service built with:  
- **Backend**: Python Flask  
- **Database**: Redis (for storing shortened URLs)  
- **Deployment**: Docker Compose  

## Features  
🔗 Shorten long URLs into compact links  
🔄 Automatic redirection to original URLs  
📦 Ready-to-run with Docker (no manual setup needed)  

---

## 🚀 Quick Start (No Dockerfile Needed)  

### 1. Clone and enter the project  
```bash
git clone https://github.com/your-repo/url-shortener.git
cd url-shortener
```

### 2. Start the services  
```bash
docker compose up
```

### 3. Access the app  
Open in browser:  
👉 [http://localhost:5000](http://localhost:5000)  

---

## 🛠️ For Developers  

### Project Structure  
```
url-shortener/
├── app/
│   ├── app.py           # Flask application
│   ├── requirements.txt # Python dependencies
│   ├── static/          # CSS/JS files
│   └── templates/       # HTML templates
└── docker-compose.yml   # Container configuration
```

### How It Works  
1. User submits a long URL via web interface  
2. System generates a short code (e.g. `abc123`)  
3. When visiting `http://localhost:5000/abc123`, user is redirected to the original URL  

### Development Commands  
| Command | Description |
|---------|-------------|
| `docker compose up` | Start services |
| `docker compose down` | Stop and remove containers |
| `docker compose up --build` | Rebuild images (if using Dockerfile) |

---

## 📝 Notes  
- Data persists across restarts (Redis volume)  
- Default Flask port: 5000  
- For production: Add authentication and rate limiting  

## 📜 License  
MIT License - Free to use and modify  

---

💡 **Tip**: Use `CTRL+C` to stop the containers, or `docker compose down` to remove them completely.  

Happy shortening! ✂️🔗
