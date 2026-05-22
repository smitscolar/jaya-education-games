// Puzzle Game Screen

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateScore } from '../redux/actions/gameActions';
import { COLORS, FONT_SIZES, SPACING } from '../utils/colors';
import { getString } from '../utils/strings';
import { calculateScore, generatePuzzle, isPuzzleComplete } from '../utils/gameLogic';

const PuzzleScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.user.profile.language);
  const currentScore = useSelector(state => state.game.currentScore);
  const currentLevel = useSelector(state => state.game.currentLevel);
  
  const [puzzle, setPuzzle] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const newPuzzle = generatePuzzle(currentLevel);
    setPuzzle(newPuzzle);
    setStartTime(Date.now());
  }, []);

  const handlePiecePlaced = (pieceId, newPosition) => {
    if (!puzzle) return;

    const updatedPuzzle = {
      ...puzzle,
      pieces: puzzle.pieces.map(piece =>
        piece.id === pieceId ? { ...piece, currentPosition: newPosition } : piece
      )
    };

    setPuzzle(updatedPuzzle);
    setMoves(moves + 1);

    if (isPuzzleComplete(updatedPuzzle.pieces)) {
      completePuzzle();
    }
  };

  const completePuzzle = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const points = calculateScore(200, timeTaken * 1000, currentLevel);
    dispatch(updateScore(points));

    Alert.alert(
      '🎉 ' + getString('levelComplete', language),
      `Waktu: ${timeTaken}s\nGerakan: ${moves}\n+${points} ${getString('score', language)}`,
      [
        { text: getString('continue', language), onPress: () => navigation.goBack() }
      ]
    );
  };

  if (!puzzle) {
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
          <Text style={styles.stat}>🔄 {moves}</Text>
          <Text style={styles.stat}>⭐ {currentScore}</Text>
        </View>
      </View>

      {/* Puzzle Canvas */}
      <View style={styles.puzzleCanvas}>
        <Text style={styles.instructionText}>Susun potongan puzzle untuk melengkapi gambar!</Text>
        <View style={styles.puzzleGrid}>
          {puzzle.pieces.map((piece, index) => (
            <TouchableOpacity
              key={piece.id}
              style={[
                styles.puzzlePiece,
                piece.currentPosition === piece.correctPosition && styles.placedPiece
              ]}
              onPress={() => {
                const newPosition = Math.floor(Math.random() * puzzle.piecesCount);
                handlePiecePlaced(piece.id, newPosition);
              }}
            >
              <Text style={styles.pieceNumber}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Available Pieces */}
      <View style={styles.piecesContainer}>
        <Text style={styles.piecesLabel}>Potongan yang Tersedia:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.piecesList}>
          {puzzle.pieces.map((piece, index) => (
            <View key={piece.id} style={styles.availablePiece}>
              <Text style={styles.pieceNumber}>{index + 1}</Text>
            </View>
          ))}
        </ScrollView>
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
  stat: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
  puzzleCanvas: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    flex: 1,
    elevation: 2,
  },
  instructionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  puzzleGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  puzzlePiece: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  placedPiece: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  pieceNumber: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  piecesContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SPACING.md,
    elevation: 2,
  },
  piecesLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  piecesList: {
    flexDirection: 'row',
  },
  availablePiece: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
});

export default PuzzleScreen;
