// Home Screen - Halaman Utama

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../redux/actions/userActions';
import { COLORS, FONT_SIZES, SPACING } from '../utils/colors';
import { getString } from '../utils/strings';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const gamification = useSelector(state => state.gamification);
  
  const [language, setLanguageState] = useState(user.profile.language || 'ID');

  useEffect(() => {
    setLanguageState(user.profile.language || 'ID');
  }, [user.profile.language]);

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
    navigation.navigate(gameId);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ID' ? 'EN' : 'ID';
    setLanguageState(newLanguage);
    dispatch(setLanguage(newLanguage));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            {language === 'ID' ? 'JAYA EDUCATION GAMES' : 'JAYA EDUCATION GAMES'}
          </Text>
          <Text style={styles.subtitle}>
            {language === 'ID' ? 'Belajar Sambil Bermain' : 'Learn While Playing'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={toggleLanguage}
        >
          <Text style={styles.languageText}>{language}</Text>
        </TouchableOpacity>
      </View>

      {/* Score Board */}
      <View style={styles.scoreBoard}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>
            {language === 'ID' ? 'Total Skor' : 'Total Score'}
          </Text>
          <Text style={styles.scoreValue}>{gamification.totalScore}</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>
            {language === 'ID' ? 'Lencana' : 'Badges'}
          </Text>
          <Text style={styles.scoreValue}>{gamification.badges.length}</Text>
        </View>
        <View style={styles.scoreDivider} />
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>
            {language === 'ID' ? 'Dimainkan' : 'Played'}
          </Text>
          <Text style={styles.scoreValue}>{user.stats.gamesPlayed || 0}</Text>
        </View>
      </View>

      {/* User Profile (if exists) */}
      {user.userId && (
        <View style={styles.userProfile}>
          <Text style={styles.userGreeting}>
            {language === 'ID' ? 'Halo' : 'Hello'}, {user.profile.name}! 👋
          </Text>
          <View style={styles.ageGroupBadge}>
            <Text style={styles.ageGroupText}>
              {user.profile.ageGroup === 'TK' ? '👶 TK (3-5 tahun)' : '📚 SD (6-12 tahun)'}
            </Text>
          </View>
        </View>
      )}

      {/* Games Grid */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>
          {language === 'ID' ? 'Pilih Permainan' : 'Select a Game'}
        </Text>
      </View>

      <View style={styles.gamesContainer}>
        {games.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.gameCard}
            onPress={() => handleGameSelect(game.id)}
            activeOpacity={0.8}
          >
            <View style={styles.gameCardInner}>
              <Text style={styles.gameEmoji}>{game.emoji}</Text>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
              <View style={styles.playButton}>
                <Text style={styles.playButtonText}>
                  {language === 'ID' ? '▶ Mainkan' : '▶ Play'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {language === 'ID' 
            ? '🌟 Terus belajar dan berkembang! 🌟' 
            : '🌟 Keep learning and growing! 🌟'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white,
  },
  languageButton: {
    backgroundColor: COLORS.white,
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  languageText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  scoreBoard: {
    flexDirection: 'row',
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SPACING.md,
    elevation: 2,
    justifyContent: 'space-around',
  },
  scoreItem: {
    alignItems: 'center',
    flex: 1,
  },
  scoreDivider: {
    width: 1,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SPACING.sm,
  },
  scoreLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
    marginBottom: SPACING.xs,
  },
  scoreValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userProfile: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: SPACING.md,
    elevation: 2,
  },
  userGreeting: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  ageGroupBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    alignSelf: 'flex-start',
  },
  ageGroupText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  sectionTitle: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitleText: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
    justifyContent: 'space-between',
  },
  gameCard: {
    width: '48%',
    marginBottom: SPACING.md,
  },
  gameCardInner: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: SPACING.md,
    alignItems: 'center',
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  gameEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  gameTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  gameDescription: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginTop: SPACING.sm,
  },
  playButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.xs,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
