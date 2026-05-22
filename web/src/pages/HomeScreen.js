import React, { useState, useEffect } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onGameSelect, language, setLanguage, score, gamesPlayed }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [musicVolume, setMusicVolume] = useState(50);
  const [soundVolume, setSoundVolume] = useState(70);
  const [defaultDifficulty, setDefaultDifficulty] = useState('medium');
  const [theme, setTheme] = useState('light');
  const [showDashboard, setShowDashboard] = useState(true);

  const [dashboardStats] = useState({
    totalScore: score,
    gamesPlayed: gamesPlayed,
    badges: 5,
    streak: 7,
    favoriteGame: 'Matching Game',
    lastPlayed: 'Hari ini',
    totalPlayTime: '2 jam 30 menit',
    achievement: '⭐⭐⭐⭐⭐',
    leaderboardRank: '#5'
  });

  useEffect(() => {
    // Play background music if enabled
    if (backgroundMusic) {
      // Placeholder untuk background music
      console.log('Background music playing at volume:', musicVolume);
    }
  }, [backgroundMusic, musicVolume]);

  const games = [
    {
      id: 'shapeColor',
      title: language === 'ID' ? 'Bentuk & Warna' : 'Shapes & Colors',
      emoji: '🎨',
      description: language === 'ID' ? 'Pelajari bentuk dan warna' : 'Learn shapes and colors'
    },
    {
      id: 'puzzle',
      title: language === 'ID' ? 'Puzzle' : 'Puzzle',
      emoji: '🧩',
      description: language === 'ID' ? 'Selesaikan puzzle gambar' : 'Complete picture puzzles'
    },
    {
      id: 'matching',
      title: language === 'ID' ? 'Mencocokkan' : 'Matching',
      emoji: '🎯',
      description: language === 'ID' ? 'Permainan mencocokkan' : 'Matching game'
    },
    {
      id: 'numberLetter',
      title: language === 'ID' ? 'Angka & Huruf' : 'Numbers & Letters',
      emoji: '🔢',
      description: language === 'ID' ? 'Belajar angka dan huruf' : 'Learn numbers and letters'
    }
  ];

  const handleGameSelect = (gameId) => {
    onGameSelect(gameId);
  };

  return (
    <div className="home-screen fade-in">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1>🎮 JAYA EDUCATION GAMES</h1>
          <p>{language === 'ID' ? 'Belajar Sambil Bermain' : 'Learn While Playing'}</p>
        </div>
        <div className="header-buttons">
          <button 
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            title={language === 'ID' ? 'Pengaturan' : 'Settings'}
          >
            ⚙️
          </button>
          <button 
            className="language-btn"
            onClick={() => setLanguage(language === 'ID' ? 'EN' : 'ID')}
          >
            {language === 'ID' ? '🇬🇧 EN' : '🇮🇩 ID'}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel fade-in">
          <div className="settings-header">
            <h2>{language === 'ID' ? 'Pengaturan' : 'Settings'}</h2>
            <button 
              className="close-btn"
              onClick={() => setShowSettings(false)}
            >
              ✕
            </button>
          </div>

          <div className="settings-content">
            {/* Audio Settings */}
            <div className="settings-section">
              <h3>🎵 {language === 'ID' ? 'Pengaturan Audio' : 'Audio Settings'}</h3>
              
              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={backgroundMusic}
                    onChange={(e) => setBackgroundMusic(e.target.checked)}
                  />
                  {language === 'ID' ? 'Musik Latar Belakang' : 'Background Music'}
                </label>
              </div>

              <div className="setting-item">
                <label>{language === 'ID' ? 'Volume Musik' : 'Music Volume'}: {musicVolume}%</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(Number(e.target.value))}
                />
              </div>

              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={soundEffects}
                    onChange={(e) => setSoundEffects(e.target.checked)}
                  />
                  {language === 'ID' ? 'Efek Suara' : 'Sound Effects'}
                </label>
              </div>

              <div className="setting-item">
                <label>{language === 'ID' ? 'Volume Efek' : 'Effects Volume'}: {soundVolume}%</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Game Settings */}
            <div className="settings-section">
              <h3>🎮 {language === 'ID' ? 'Pengaturan Permainan' : 'Game Settings'}</h3>
              
              <div className="setting-item">
                <label>{language === 'ID' ? 'Tingkat Kesulitan Default' : 'Default Difficulty'}:</label>
                <select 
                  value={defaultDifficulty}
                  onChange={(e) => setDefaultDifficulty(e.target.value)}
                >
                  <option value="easy">{language === 'ID' ? 'Mudah' : 'Easy'}</option>
                  <option value="medium">{language === 'ID' ? 'Sedang' : 'Medium'}</option>
                  <option value="hard">{language === 'ID' ? 'Sulit' : 'Hard'}</option>
                </select>
              </div>
            </div>

            {/* Display Settings */}
            <div className="settings-section">
              <h3>🎨 {language === 'ID' ? 'Pengaturan Tampilan' : 'Display Settings'}</h3>
              
              <div className="setting-item">
                <label>{language === 'ID' ? 'Tema' : 'Theme'}:</label>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">{language === 'ID' ? 'Terang' : 'Light'}</option>
                  <option value="dark">{language === 'ID' ? 'Gelap' : 'Dark'}</option>
                </select>
              </div>

              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={showDashboard}
                    onChange={(e) => setShowDashboard(e.target.checked)}
                  />
                  {language === 'ID' ? 'Tampilkan Dashboard' : 'Show Dashboard'}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
      {showDashboard && (
        <div className="dashboard fade-in">
          <div className="dashboard-grid">
            <div className="dashboard-item">
              <div className="dashboard-icon">📊</div>
              <div className="dashboard-label">{language === 'ID' ? 'Total Skor' : 'Total Score'}</div>
              <div className="dashboard-value">{dashboardStats.totalScore}</div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-icon">🎮</div>
              <div className="dashboard-label">{language === 'ID' ? 'Dimainkan' : 'Games Played'}</div>
              <div className="dashboard-value">{dashboardStats.gamesPlayed}</div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-icon">🏆</div>
              <div className="dashboard-label">{language === 'ID' ? 'Rank' : 'Rank'}</div>
              <div className="dashboard-value">{dashboardStats.leaderboardRank}</div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-icon">🔥</div>
              <div className="dashboard-label">{language === 'ID' ? 'Streak' : 'Streak'}</div>
              <div className="dashboard-value">{dashboardStats.streak}</div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-icon">🎖️</div>
              <div className="dashboard-label">{language === 'ID' ? 'Lencana' : 'Badges'}</div>
              <div className="dashboard-value">{dashboardStats.badges}</div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-icon">⭐</div>
              <div className="dashboard-label">{language === 'ID' ? 'Prestasi' : 'Achievement'}</div>
              <div className="dashboard-value">{dashboardStats.achievement}</div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-icon">🎯</div>
              <div className="dashboard-label">{language === 'ID' ? 'Favorit' : 'Favorite'}</div>
              <div className="dashboard-value-text">{dashboardStats.favoriteGame}</div>
            </div>

            <div className="dashboard-item">
              <div className="dashboard-icon">⏱️</div>
              <div className="dashboard-label">{language === 'ID' ? 'Waktu Main' : 'Play Time'}</div>
              <div className="dashboard-value-text">{dashboardStats.totalPlayTime}</div>
            </div>
          </div>
        </div>
      )}

      {/* Score Board */}
      <div className="score-board">
        <div className="score-item">
          <h3>{language === 'ID' ? 'Total Skor' : 'Total Score'}</h3>
          <p className="score-value">{score}</p>
        </div>
        <div className="score-divider"></div>
        <div className="score-item">
          <h3>{language === 'ID' ? 'Permainan' : 'Games'}</h3>
          <p className="score-value">{gamesPlayed}</p>
        </div>
        <div className="score-divider"></div>
        <div className="score-item">
          <h3>{language === 'ID' ? 'Lencana' : 'Badges'}</h3>
          <p className="score-value">0</p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="games-section">
        <h2>{language === 'ID' ? 'Pilih Permainan' : 'Select a Game'}</h2>
        <div className="games-grid">
          {games.map((game) => (
            <div 
              key={game.id}
              className="game-card card"
              onClick={() => handleGameSelect(game.id)}
            >
              <div className="game-emoji">{game.emoji}</div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <button className="btn-primary">
                {language === 'ID' ? '▶ Mainkan' : '▶ Play'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>🌟 {language === 'ID' ? 'Terus belajar dan berkembang!' : 'Keep learning and growing!'} 🌟</p>
      </div>
    </div>
  );
};

export default HomeScreen;
