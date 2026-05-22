import React, { useState, useEffect } from 'react';
import './GameScreen.css';

const ShapeColorGame = ({ onBack, onScoreUpdate, language }) => {
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [score, setScore] = useState(0);

  const shapes = {
    circle: { name: language === 'ID' ? 'Lingkaran' : 'Circle', emoji: '🔴' },
    square: { name: language === 'ID' ? 'Persegi' : 'Square', emoji: '🟥' },
    triangle: { name: language === 'ID' ? 'Segitiga' : 'Triangle', emoji: '🔺' },
    star: { name: language === 'ID' ? 'Bintang' : 'Star', emoji: '⭐' },
    heart: { name: language === 'ID' ? 'Hati' : 'Heart', emoji: '❤️' },
  };

  const colors = {
    red: { name: language === 'ID' ? 'Merah' : 'Red', emoji: '🔴' },
    blue: { name: language === 'ID' ? 'Biru' : 'Blue', emoji: '🔵' },
    yellow: { name: language === 'ID' ? 'Kuning' : 'Yellow', emoji: '🟡' },
    green: { name: language === 'ID' ? 'Hijau' : 'Green', emoji: '🟢' },
    purple: { name: language === 'ID' ? 'Ungu' : 'Purple', emoji: '🟣' },
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = () => {
    const type = totalQuestions % 2 === 0 ? 'shape' : 'color';
    const pool = type === 'shape' ? Object.keys(shapes) : Object.keys(colors);
    const correctAnswer = pool[Math.floor(Math.random() * pool.length)];
    const options = [correctAnswer];

    while (options.length < 4) {
      const option = pool[Math.floor(Math.random() * pool.length)];
      if (!options.includes(option)) {
        options.push(option);
      }
    }

    const questionText = type === 'shape'
      ? language === 'ID' ? `Mana yang ${shapes[correctAnswer].name}?` : `Which is ${shapes[correctAnswer].name}?`
      : language === 'ID' ? `Mana yang warna ${colors[correctAnswer].name}?` : `Which is ${colors[correctAnswer].name}?`;

    setQuestion({
      type,
      text: questionText,
      correctAnswer,
      options: options.sort(() => Math.random() - 0.5),
    });
    setAnswered(false);
    setSelectedOption(null);
  };

  const handleAnswer = (answer) => {
    if (answered) return;

    setSelectedOption(answer);
    setAnswered(true);
    setTotalQuestions(totalQuestions + 1);

    const isCorrect = answer === question.correctAnswer;
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

  if (!question) {
    return <div>{language === 'ID' ? 'Memuat...' : 'Loading...'}</div>;
  }

  const itemDict = question.type === 'shape' ? shapes : colors;

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
        <div className="question-box">
          <h2>{question.text}</h2>
        </div>

        <div className="options-grid">
          {question.options.map((option) => (
            <button
              key={option}
              className={`option-btn ${selectedOption === option ? 'selected' : ''} ${
                answered && option === question.correctAnswer ? 'correct' : ''
              } ${answered && option !== question.correctAnswer && selectedOption === option ? 'wrong' : ''}`}
              onClick={() => handleAnswer(option)}
              disabled={answered}
            >
              <div className="option-emoji">{itemDict[option].emoji}</div>
              <div className="option-name">{itemDict[option].name}</div>
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

export default ShapeColorGame;
