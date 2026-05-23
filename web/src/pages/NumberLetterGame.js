import React, { useState, useEffect } from 'react';
import './GameScreen.css';

const NumberLetterGame = ({ onBack, onScoreUpdate, language }) => {
  const [difficulty, setDifficulty] = useState(null);
  const [type, setType] = useState('number');
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const difficultySettings = {
    easy: {
      totalQuestions: 5,
      pointsPerCorrect: 50,
      numOptions: 3
    },
    medium: {
      totalQuestions: 10,
      pointsPerCorrect: 100,
      numOptions: 4
    },
    hard: {
      totalQuestions: 15,
      pointsPerCorrect: 150,
      numOptions: 5
    }
  };

  const startGame = (level) => {
    setDifficulty(level);
    loadQuestion(level);
  };

  const loadQuestion = (level) => {
    if (type === 'number') {
      const answer = Math.floor(Math.random() * 10);
      const questionText = language === 'ID' ? `Angka ${answer}` : `Number ${answer}`;
      const opts = [answer];
      while (opts.length < difficultySettings[level].numOptions) {
        const opt = Math.floor(Math.random() * 10);
        if (!opts.includes(opt)) opts.push(opt);
      }
      setQuestion({
        text: questionText,
        answer: answer.toString(),
      });
      setOptions(opts.sort(() => Math.random() - 0.5).map(o => o.toString()));
    } else {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const answer = alphabet[Math.floor(Math.random() * 26)];
      const questionText = language === 'ID' ? `Huruf ${answer}` : `Letter ${answer}`;
      const opts = [answer];
      while (opts.length < difficultySettings[level].numOptions) {
        const opt = alphabet[Math.floor(Math.random() * 26)];
        if (!opts.includes(opt)) opts.push(opt);
      }
      setQuestion({
        text: questionText,
        answer,
      });
      setOptions(opts.sort(() => Math.random() - 0.5));
    }
    setAnswered(false);
  };

  const handleAnswer = (answer) => {
    if (answered || !difficulty) return;

    setAnswered(true);
    setTotalQuestions(totalQuestions + 1);

    const isCorrect = answer === question.answer;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      const points = difficultySettings[difficulty].pointsPerCorrect;
      setScore(score + points);
      onScoreUpdate(points);
      setShowCelebration(true);

      console.log('Correct! Success sound effect!');
    }

    setTimeout(() => {
      setShowCelebration(false);
      if (totalQuestions >= difficultySettings[difficulty].totalQuestions - 1) {
        alert(language === 'ID'
          ? `Permainan Selesai!\nBenar: ${correctAnswers + (isCorrect ? 1 : 0)}/${difficultySettings[difficulty].totalQuestions}\nSkor: ${score + (isCorrect ? difficultySettings[difficulty].pointsPerCorrect : 0)}`
          : `Game Complete!\nCorrect: ${correctAnswers + (isCorrect ? 1 : 0)}/${difficultySettings[difficulty].totalQuestions}\nScore: ${score + (isCorrect ? difficultySettings[difficulty].pointsPerCorrect : 0)}`
        );
        onBack();
      } else {
        loadQuestion(difficulty);
      }
    }, 1500);
  };

  if (!difficulty) {
    return (
      <div className="game-screen fade-in">
        <div className="difficulty-selector">
          <h2>{language === 'ID' ? 'Pilih Tingkat Kesulitan' : 'Select Difficulty Level'}</h2>
          
          <div className="difficulty-grid">
            <div className="difficulty-card easy" onClick={() => startGame('easy')}>
              <div className="difficulty-emoji">🟢</div>
              <h3>{language === 'ID' ? 'Mudah' : 'Easy'}</h3>
              <p>{language === 'ID' ? '5 soal' : '5 questions'}</p>
              <p className="difficulty-points">+50 pts/soal</p>
            </div>

            <div className="difficulty-card medium" onClick={() => startGame('medium')}>
              <div className="difficulty-emoji">🟡</div>
              <h3>{language === 'ID' ? 'Sedang' : 'Medium'}</h3>
              <p>{language === 'ID' ? '10 soal' : '10 questions'}</p>
              <p className="difficulty-points">+100 pts/soal</p>
            </div>

            <div className="difficulty-card hard" onClick={() => startGame('hard')}>
              <div className="difficulty-emoji">🔴</div>
              <h3>{language === 'ID' ? 'Sulit' : 'Hard'}</h3>
              <p>{language === 'ID' ? '15 soal' : '15 questions'}</p>
              <p className="difficulty-points">+150 pts/soal</p>
            </div>
          </div>

          <button className="btn-primary" onClick={onBack} style={{ marginTop: '20px' }}>
            {language === 'ID' ? '← Kembali' : '← Back'}
          </button>
        </div>
      </div>
    );
  }

  if (!question) return <div>{language === 'ID' ? 'Memuat...' : 'Loading...'}</div>;

  return (
    <div className="game-screen fade-in">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← {language === 'ID' ? 'Kembali' : 'Back'}</button>
        <div className="game-info">
          <span>📊 {score}</span>
          <span>📝 {totalQuestions + 1}/{difficultySettings[difficulty].totalQuestions}</span>
          <span>{difficulty === 'easy' ? '🟢' : difficulty === 'medium' ? '🟡' : '🔴'}</span>
        </div>
      </div>

      {showCelebration && (
        <div className="celebration-banner celebrate">
          <div className="celebration-icon">🎉</div>
          <div className="celebration-text">{language === 'ID' ? 'Benar!' : 'Correct!'}</div>
        </div>
      )}

      <div className="game-container">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => { setType('number'); loadQuestion(difficulty); }}
            style={{
              flex: 1,
              padding: '10px',
              background: type === 'number' ? '#4ECDC4' : '#DDD',
              color: type === 'number' ? 'white' : 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔢 {language === 'ID' ? 'Angka' : 'Numbers'}
          </button>
          <button
            onClick={() => { setType('letter'); loadQuestion(difficulty); }}
            style={{
              flex: 1,
              padding: '10px',
              background: type === 'letter' ? '#4ECDC4' : '#DDD',
              color: type === 'letter' ? 'white' : 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔤 {language === 'ID' ? 'Huruf' : 'Letters'}
          </button>
        </div>

        <div className="question-box">
          <h2>{question.text}</h2>
        </div>

        <div className="options-grid">
          {options.map((option) => (
            <button
              key={option}
              className="option-btn"
              onClick={() => handleAnswer(option)}
              disabled={answered}
              style={{
                background: answered && option === question.answer ? '#4CAF50' : '#FFF',
                color: answered && option === question.answer ? 'white' : 'black',
                borderColor: answered && option === question.answer ? '#4CAF50' : '#CCC'
              }}
            >
              <div className="option-emoji" style={{ fontSize: '2.5rem' }}>{option}</div>
            </button>
          ))}
        </div>

        <div className="progress-bar">
          <div className="progress" style={{ width: `${((totalQuestions + 1) / difficultySettings[difficulty].totalQuestions) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default NumberLetterGame;
