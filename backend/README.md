# MeetlyAI Backend

FastAPI backend service for analyzing meeting transcripts using Google's Gemini AI.

## 🚀 Features

- **AI-Powered Analysis**: Leverages Gemini 2.0 Flash for intelligent transcript processing
- **Structured Output**: Extracts summaries, decisions, and action items
- **Validation**: Pydantic schemas ensure data integrity
- **RESTful API**: Clean, documented endpoints
- **Health Checks**: Built-in monitoring endpoint

## 📋 Prerequisites

- Python 3.11+
- Google Gemini API Key ([Get one here](https://ai.google.dev/))

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your GEMINI_API_KEY
   ```

5. **Run the server**
   ```bash
   uvicorn main:app --reload
   ```

   Server will be available at `http://localhost:8000`

### Docker Development

```bash
docker build -t meetlyai-backend .
docker run -p 8000:8000 --env-file .env meetlyai-backend
```

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/                 # API route handlers
│   │   └── analyze.py       # Transcript analysis endpoint
│   ├── core/                # Core configuration
│   │   ├── config.py        # Settings management
│   │   └── logging.py       # Logging setup
│   ├── services/            # Business logic
│   │   └── analyzer.py      # Gemini AI integration
│   ├── schemas/             # Pydantic models
│   │   ├── request.py       # Request schemas
│   │   └── response.py      # Response schemas
│   └── utils/               # Helper functions
│       └── text_utils.py    # Text processing utilities
├── main.py                  # FastAPI application entry point
├── requirements.txt         # Python dependencies
├── Dockerfile              # Docker configuration
└── .env.example            # Environment template
```

## 🔌 API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

### Analyze Transcript
```http
POST /api/analyze/transcript
Content-Type: application/json
```

**Request Body:**
```json
{
  "transcript": "Your meeting transcript here (minimum 200 characters)..."
}
```

**Response:**
```json
{
  "summary": "Concise meeting summary",
  "decisions": [
    "Key decision 1",
    "Key decision 2"
  ],
  "action_items": [
    {
      "task": "Complete project proposal",
      "owner": "John Doe",
      "priority": "High"
    }
  ]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid transcript (too short or malformed)
- `500 Internal Server Error`: AI processing failure

## 🧪 Testing

### Manual Testing with cURL

```bash
curl -X POST http://localhost:8000/api/analyze/transcript \
  -H "Content-Type: application/json" \
  -d '{
    "transcript": "Team meeting held on Jan 5th. Discussed Q1 roadmap. John will lead the new feature development. Sarah agreed to handle documentation. Priority is high for both tasks. Decision made to launch by end of February."
  }'
```

### Interactive API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## ⚙️ Configuration

Environment variables (`.env` file):

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_NAME` | Application name | `MeetlyAI` |
| `ENV` | Environment (development/production) | `development` |
| `GEMINI_API_KEY` | Google Gemini API key | *Required* |
| `GEMINI_MODEL` | Gemini model to use | `gemini-2.0-flash-exp` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `8000` |

## 🔒 Security Notes

- Never commit `.env` files
- Keep your `GEMINI_API_KEY` secret
- In production, restrict CORS origins in `main.py`
- Use HTTPS in production environments

## 📝 Development

### Code Style

This project follows PEP 8 guidelines. Linting is enforced via GitHub Actions.

```bash
# Run linting locally
pip install flake8
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
```

### Adding New Features

1. Define schemas in `app/schemas/`
2. Implement business logic in `app/services/`
3. Create API routes in `app/api/`
4. Register routes in `main.py`

## 🐛 Troubleshooting

**Issue**: `GEMINI_API_KEY not found`
- **Solution**: Ensure `.env` file exists and contains valid API key

**Issue**: `Transcript content is too short`
- **Solution**: Provide at least 200 characters of transcript text

**Issue**: `Gemini returned invalid JSON`
- **Solution**: Check API key validity and model availability

## 📄 License

This project is part of MeetlyAI.

## 🤝 Contributing

1. Follow existing code structure
2. Add tests for new features
3. Ensure linting passes
4. Update documentation
