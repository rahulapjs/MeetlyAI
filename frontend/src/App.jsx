import { useState } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [transcript, setTranscript] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!transcript.trim() || transcript.length < 200) {
      setError('Please enter at least 200 characters of transcript text');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze/transcript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze transcript');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the transcript');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTranscript('');
    setResults(null);
    setError(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🤖</div>
            <span>MeetlyAI</span>
          </div>
          <div className="header-actions">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>AI Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <h1 className="hero-title">Transform Meetings into Action</h1>
          <p className="hero-subtitle">
            Powered by Google Gemini AI - Extract summaries, decisions, and action items instantly
          </p>
        </section>

        {/* Input Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">📝</div>
            <h2 className="card-title">Meeting Transcript</h2>
          </div>

          {error && (
            <div className="alert alert-error">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="transcript" className="form-label">
              Paste your meeting transcript below (minimum 200 characters)
            </label>
            <textarea
              id="transcript"
              className="textarea"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Example: Team meeting held on Jan 5th. Discussed Q1 roadmap. John will lead the new feature development with high priority. Sarah agreed to handle documentation. Decision made to launch by end of February..."
              disabled={loading}
            />
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--dark-gray)' }}>
              {transcript.length} / 200 characters minimum
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
            <button
              className="btn btn-primary btn-large btn-full"
              onClick={handleAnalyze}
              disabled={loading || transcript.length < 200}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Analyzing with AI...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Analyze Transcript</span>
                </>
              )}
            </button>
            <button
              className="btn btn-secondary btn-large"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="results-container">
            <div className="results-grid">
              {/* Summary Card */}
              <div className="result-card" style={{ gridColumn: '1 / -1' }}>
                <div className="result-header">
                  <span className="result-icon">📋</span>
                  <h3 className="result-title">Meeting Summary</h3>
                </div>
                <div className="result-content">
                  <p className="summary-text">{results.summary}</p>
                </div>
              </div>

              {/* Decisions Card */}
              <div className="result-card">
                <div className="result-header">
                  <span className="result-icon">🎯</span>
                  <h3 className="result-title">Key Decisions</h3>
                </div>
                <div className="result-content">
                  {results.decisions && results.decisions.length > 0 ? (
                    <ul className="decisions-list">
                      {results.decisions.map((decision, index) => (
                        <li key={index} className="decision-item">
                          {decision}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-state">No decisions identified</p>
                  )}
                </div>
              </div>

              {/* Action Items Card */}
              <div className="result-card">
                <div className="result-header">
                  <span className="result-icon">✅</span>
                  <h3 className="result-title">Action Items</h3>
                </div>
                <div className="result-content">
                  {results.action_items && results.action_items.length > 0 ? (
                    <ul className="actions-list">
                      {results.action_items.map((item, index) => (
                        <li key={index} className="action-item">
                          <div className="action-task">{item.task}</div>
                          <div className="action-meta">
                            {item.owner && (
                              <span className="action-owner">
                                <span>👤</span>
                                <span>{item.owner}</span>
                              </span>
                            )}
                            {item.priority && (
                              <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                                {item.priority}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-state">No action items identified</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
