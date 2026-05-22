// Number & Letter Game Screen

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateScore } from '../redux/actions/gameActions';
import { COLORS, FONT_SIZES, SPACING } from '../utils/colors';
import { getString } from '../utils/strings';
import { calculateScore, generateNumberLetterQuestion } from '../utils/gameLogic';

const NumberLetterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.user.profile.language);
  const currentScore = useSelector(state => state.game.currentScore);
  const currentLevel = useSelector(state => state.game.currentLevel);
  
  const [type, setType] = useState('number');
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadQuestion();
  }, [type]);

  const loadQuestion = () => {
    const newQuestion = generateNumberLetterQuestion(type, currentLevel);
    setQuestion(newQuestion);
    
    let generatedOptions = [newQuestion.answer];
    const pool = type === 'number' 
      ? Array.from({ length: 10 }, (_, i) => i.toString())
      : Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    
    while (generatedOptions.length < 4) {
      const randomOption = pool[Math.floor(Math.random() * pool.length)];
      if (!generatedOptions.includes(randomOption)) {
        generatedOptions.push(randomOption);
      }
    }
    
    setOptions(generatedOptions.sort(() => Math.random() - 0.5));
    setAnswered(false);
  };

  const handleAnswer = (selectedAnswer) => {
    if (answered) return;

    setAnswered(true);
    setTotalQuestions(totalQuestions + 1);

    const isCorrect = selectedAnswer === question.answer;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      const points = calculateScore(100, 0, currentLevel);
      dispatch(updateScore(points));
      
      Alert.alert(
        '✅ ' + getString('correct', language),
        `+${points} ${getString('score', language)}`
      );
    } else {
      Alert.alert(
        '❌ ' + getString('incorrect', language),
        `Jawaban: ${question.answer}`
      );
    }

    setTimeout(() => {
      if (totalQuestions >= 9) {
        showGameComplete();
      } else {
        loadQuestion();
      }
    }, 2000);
  };

  const showGameComplete = () => {
    Alert.alert(
      '🎉 ' + getString('gameComplete', language),
      `${getString('yourScore', language)}: ${currentScore}\n\nBenar: ${correctAnswers}/10`,
      [
        { text: getString('continue', language), onPress: () => navigation.goBack() }
      ]
    );
  };

  if (!question || options.length === 0) {
    return (
      <View style={styles.container}>
        <Text>{getString('loading', language)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {getString('back', language)}</Text>
        </TouchableOpacity>
        <View style={styles.stats}>
          <Text style={styles.score}>{getString('score', language)}: {currentScore}</Text>
          <Text style={styles.level}>{getString('level', language)}: {currentLevel}</Text>
        </View>
      </View>

      {/* Type Selector */}
      <View style={styles.typeSelector}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'number' && styles.activeType]}
          onPress={() => setType('number')}
        >
          <Text style={styles.typeButtonText}>🔢 Angka</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'letter' && styles.activeType]}
          onPress={() => setType('letter')}
        >
          <Text style={styles.typeButtonText}>🔤 Huruf</Text>
        </TouchableOpacity>
      </View>

      {/* Question Display */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.question}</Text>
        <Text style={styles.answer}>{question.answer}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
            disabled={answered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress */}
      <View style={styles.progress}>
        <Text style={styles.progressText}>
          {totalQuestions}/10 Soal
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  backButton: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  score: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  level: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  typeButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  activeType: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: '#000',
  },
  questionContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  question: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  answer: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  optionButton: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SPACING.lg,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  optionText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  progress: {
    alignItems: 'center',
    paddingBottom: SPACING.md,
  },
  progressText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
  },
});

export default NumberLetterScreen;
