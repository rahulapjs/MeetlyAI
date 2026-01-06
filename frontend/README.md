# MeetlyAI Frontend

Modern, glass-themed React frontend for the MeetlyAI meeting intelligence platform.

## 🎨 Design Features

- **Glass Morphism UI**: Beautiful frosted glass effect with white and blue theme
- **Modern Aesthetics**: Clean, premium design with smooth animations
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Custom CSS**: No framework dependencies, pure custom styling
- **Micro-animations**: Engaging hover effects and transitions

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Lightning-fast build tool and dev server
- **Custom CSS**: Glass morphism design system
- **Google Fonts**: Inter font family for premium typography

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running on port 8000 (or configured port)

## 🚀 Getting Started

### Local Development

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env if needed (default: http://localhost:8000)
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Docker Development

```bash
docker build -t meetlyai-frontend .
docker run -p 3000:80 meetlyai-frontend
```

Access at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── App.jsx         # Main application component
│   ├── App.css         # Component-specific styles
│   ├── index.css       # Global design system & glass theme
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── Dockerfile          # Production Docker build
├── nginx.conf          # Nginx configuration for production
└── package.json        # Dependencies and scripts
```

## 🎨 Design System

### Color Palette

```css
--primary-blue: #2563eb
--primary-blue-light: #3b82f6
--accent-cyan: #06b6d4
--glass-white: rgba(255, 255, 255, 0.7)
--glass-blue: rgba(37, 99, 235, 0.1)
```

### Glass Effects

- **Glass**: Semi-transparent with blur
- **Glass Strong**: More opaque for important elements
- **Glass Blue**: Subtle blue tint for accents

### Components

- **Cards**: Elevated glass panels with hover effects
- **Buttons**: Gradient primary, outlined secondary
- **Forms**: Frosted glass inputs with focus states
- **Results**: Organized grid layout with animations

## 🔌 API Integration

The frontend connects to the backend API:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

### Endpoints Used

- `POST /api/analyze/transcript`: Analyze meeting transcript

### Request Format

```json
{
  "transcript": "Meeting transcript text (min 200 chars)..."
}
```

### Response Format

```json
{
  "summary": "Meeting summary",
  "decisions": ["Decision 1", "Decision 2"],
  "action_items": [
    {
      "task": "Task description",
      "owner": "Person name",
      "priority": "High|Medium|Low"
    }
  ]
}
```

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## ⚙️ Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

### Vite Config

The project uses default Vite configuration with React plugin.

## 🎯 Features

### Input Section
- Large textarea for transcript input
- Character counter (200 minimum)
- Real-time validation
- Loading states with spinner

### Results Display
- **Summary Card**: Full-width overview
- **Decisions Card**: List of key decisions
- **Action Items Card**: Tasks with owner and priority badges

### UI/UX Enhancements
- Smooth fade-in animations
- Hover effects on interactive elements
- Glass morphism throughout
- Responsive grid layouts
- Error handling with styled alerts

## 🎨 Customization

### Changing Colors

Edit `src/index.css`:

```css
:root {
  --primary-blue: #your-color;
  --accent-cyan: #your-accent;
}
```

### Modifying Glass Effect

Adjust blur and opacity:

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
}
```

## 📱 Responsive Design

Breakpoints:
- **Desktop**: Default styles
- **Tablet/Mobile**: `@media (max-width: 768px)`

Mobile optimizations:
- Single column layout
- Adjusted font sizes
- Stacked header elements
- Full-width cards

## 🐛 Troubleshooting

**Issue**: API connection fails
- **Solution**: Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check CORS settings in backend

**Issue**: Styles not loading
- **Solution**: Clear browser cache
- Restart dev server
- Check console for errors

**Issue**: Build fails
- **Solution**: Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (18+)

## 🚀 Deployment

### Production Build

```bash
npm run build
```

Output in `dist/` directory.

### Docker Production

```bash
docker build -t meetlyai-frontend .
docker run -p 80:80 meetlyai-frontend
```

### Nginx Configuration

The included `nginx.conf`:
- Serves SPA with proper routing
- Enables gzip compression
- Sets cache headers for static assets
- Adds security headers

## 🔒 Security

- XSS protection headers
- Content type sniffing prevention
- Frame options for clickjacking protection
- HTTPS recommended for production

## 📄 License

Part of the MeetlyAI project.

## 🤝 Contributing

1. Follow existing code style
2. Use the established design system
3. Test responsive layouts
4. Ensure accessibility
5. Update documentation

---

**Built with React + Vite | Designed with Glass Morphism**
