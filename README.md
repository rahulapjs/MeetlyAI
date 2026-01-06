# 🤖 MeetlyAI

**AI-Powered Meeting Intelligence Platform**

Transform your meeting transcripts into actionable insights with the power of Google's Gemini AI. MeetlyAI automatically extracts summaries, key decisions, and action items from your meeting notes.

## ✨ Features

- 📝 **Smart Summarization**: Get concise, accurate meeting summaries
- 🎯 **Decision Tracking**: Automatically extract key decisions made
- ✅ **Action Items**: Identify tasks with ownership and priority
- 🚀 **Fast & Reliable**: Built on FastAPI for high performance
- 🔌 **RESTful API**: Easy integration with any frontend or tool
- 🐳 **Docker Ready**: Deploy anywhere with containerization

## 🏗️ Architecture

```
MeetlyAI/
├── backend/              # FastAPI backend service
│   ├── app/
│   │   ├── api/         # HTTP endpoints
│   │   ├── core/        # Configuration & logging
│   │   ├── services/    # Business logic (Gemini AI)
│   │   ├── schemas/     # Pydantic models
│   │   └── utils/       # Helper functions
│   ├── main.py          # Application entry point
│   └── Dockerfile       # Backend container
├── frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx      # Main component
│   │   └── index.css    # Glass morphism design system
│   ├── Dockerfile       # Frontend container
│   └── nginx.conf       # Production server config
├── .github/
│   └── workflows/       # CI/CD pipelines
├── docker-compose.yml   # Multi-service orchestration
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (recommended)
- OR Python 3.11+ and Node.js 18+ for local development
- Google Gemini API Key ([Get one free](https://ai.google.dev/))

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MeetlyAI
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Docs**: http://localhost:8000/docs
   - **Health Check**: http://localhost:8000/health

### Option 2: Local Development

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Access frontend at http://localhost:5173


## 📖 Usage

### Example API Request

```bash
curl -X POST http://localhost:8000/api/analyze/transcript \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "Team sync on Jan 5th. Discussed Q1 goals. Alice will prepare the budget proposal by next week - high priority. Bob agreed to review the design mockups. Decision: We will use the new framework for the project."
  }'
```

### Example Response

```json
{
  "summary": "Team discussed Q1 goals and made key decisions about project framework and task assignments.",
  "decisions": [
    "Use the new framework for the project"
  ],
  "action_items": [
    {
      "task": "Prepare the budget proposal",
      "owner": "Alice",
      "priority": "High"
    },
    {
      "task": "Review the design mockups",
      "owner": "Bob",
      "priority": null
    }
  ]
}
```

## 🛠️ Technology Stack

### Backend
- **Framework**: FastAPI 0.115+
- **AI Engine**: Google Gemini 2.0 Flash
- **Validation**: Pydantic v2
- **Server**: Uvicorn with async support

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Custom CSS with Glass Morphism
- **Fonts**: Google Fonts (Inter)

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Web Server**: Nginx (production)
- **CI/CD**: GitHub Actions
- **Linting**: Flake8 (Python), ESLint (JavaScript)


## 📋 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/analyze/transcript` | Analyze meeting transcript |

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required
GEMINI_API_KEY=your_api_key_here

# Optional
APP_NAME=MeetlyAI
ENV=development
GEMINI_MODEL=gemini-2.0-flash-exp
```

See `.env.example` for all available options.

## 🧪 Testing & Quality

### Continuous Integration

GitHub Actions automatically:
- ✅ Lints Python code with Flake8
- ✅ Validates code structure
- ✅ Runs on every push and PR

### Run Linting Locally

```bash
cd backend
pip install flake8
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
```

## 📦 Deployment

### Docker Compose (Production)

```bash
# Build and start in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Environment-Specific Configs

For production, update:
1. CORS origins in `backend/main.py`
2. Set `ENV=production` in `.env`
3. Use proper secrets management
4. Enable HTTPS/SSL

## 🗺️ Roadmap

- [ ] Frontend web application
- [ ] Real-time transcript processing
- [ ] Multi-language support
- [ ] Integration with calendar apps
- [ ] Export to PDF/Word
- [ ] Team collaboration features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Add tests for new features
- Update documentation
- Ensure CI passes

## 🐛 Troubleshooting

**Docker Issues**
```bash
# Reset everything
docker-compose down -v
docker-compose up --build
```

**API Key Issues**
- Verify your Gemini API key is valid
- Check `.env` file exists and is loaded
- Ensure no extra spaces in environment variables

**Port Conflicts**
```bash
# Change port in docker-compose.yml
ports:
  - "8001:8000"  # Use 8001 instead
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language models
- FastAPI for the excellent web framework
- The open-source community

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API docs at `/docs`

---

**Built with ❤️ using FastAPI and Gemini AI**
