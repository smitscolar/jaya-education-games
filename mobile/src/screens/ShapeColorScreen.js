// Shape & Color Game Screen

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateScore } from '../redux/actions/gameActions';
import { COLORS, FONT_SIZES, SPACING } from '../utils/colors';
import { getString } from '../utils/strings';
import { calculateScore, generateShapeColorQuestion } from '../utils/gameLogic';

const ShapeColorScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.user.profile.language);
  const currentScore = useSelector(state => state.game.currentScore);
  const currentLevel = useSelector(state => state.game.currentLevel);
  
  const [question, setQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = () => {
    const type = totalQuestions % 2 === 0 ? 'shape' : 'color';
    const newQuestion = generateShapeColorQuestion(type, currentLevel);
    setQuestion(newQuestion);
    setAnswered(false);
    setSelectedOption(null);
  };

  const handleAnswer = (selectedAnswer) => {
    if (answered) return;

    setSelectedOption(selectedAnswer);
    setAnswered(true);
    setTotalQuestions(totalQuestions + 1);

    const isCorrect = selectedAnswer === question.correctAnswer;
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
        `Jawaban yang benar: ${question.correctAnswer}`
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
      `${getString('yourScore', language)}: ${currentScore}\n\nTerkunci: ${correctAnswers}/10`,
      [
        { text: getString('continue', language), onPress: () => navigation.goBack() }
      ]
    );
  };

  if (!question) {
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

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedOption === option.value && styles.selectedOption,
              answered && option.value === question.correctAnswer && styles.correctOption,
              answered && option.value !== question.correctAnswer && selectedOption === option.value && styles.wrongOption
            ]}
            onPress={() => handleAnswer(option.value)}
            disabled={answered}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress */}
      <View style={styles.progress}>
        <Text style={styles.progressText}>
          {totalQuestions}/10 {getString('questions', language) || 'Soal'}
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
  questionContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  question: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
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
  selectedOption: {
    borderColor: COLORS.secondary,
  },
  correctOption: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  wrongOption: {
    backgroundColor: COLORS.error,
    borderColor: COLORS.error,
  },
  optionText: {
    fontSize: FONT_SIZES.md,
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

export default ShapeColorScreen;
