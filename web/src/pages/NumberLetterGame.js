import React, { useState, useEffect } from 'react';
import './GameScreen.css';

const NumberLetterGame = ({ onBack, onScoreUpdate, language }) => {
  const [type, setType] = useState('number');
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadQuestion();
  }, [type]);

  const loadQuestion = () => {
    if (type === 'number') {
      const answer = Math.floor(Math.random() * 10);
      const questionText = language === 'ID' ? `Angka ${answer}` : `Number ${answer}`;
      const opts = [answer];
      while (opts.length < 4) {
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
      while (opts.length < 4) {
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
    if (answered) return;

    setAnswered(true);
    setTotalQuestions(totalQuestions + 1);

    const isCorrect = answer === question.answer;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      const points = 100;
      setScore(score + points);
      onScoreUpdate(points);
    }

    setTimeout(() => {
      if (totalQuestions >= 9) {
        alert(language === 'ID'
          ? `Permainan Selesai!\nBenar: ${correctAnswers + (isCorrect ? 1 : 0)}/10\nSkor: ${score + (isCorrect ? 100 : 0)}`
          : `Game Complete!\nCorrect: ${correctAnswers + (isCorrect ? 1 : 0)}/10\nScore: ${score + (isCorrect ? 100 : 0)}`
        );
        onBack();
      } else {
        loadQuestion();
      }
    }, 1500);
  };

  if (!question) return <div>{language === 'ID' ? 'Memuat...' : 'Loading...'}</div>;

  return (
    <div className="game-screen fade-in">
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>← {language === 'ID' ? 'Kembali' : 'Back'}</button>
        <div className="game-info">
          <span>📊 {score}</span>
          <span>📝 {totalQuestions}/10</span>
        </div>
      </div>

      <div className="game-container">
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setType('number')}
            style={{
              flex: 1,
              padding: '10px',
              background: type === 'number' ? '#FF6B6B' : '#DDD',
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
            onClick={() => setType('letter')}
            style={{
              flex: 1,
              padding: '10px',
              background: type === 'letter' ? '#FF6B6B' : '#DDD',
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
          <div className="progress" style={{ width: `${(totalQuestions / 10) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default NumberLetterGame;
