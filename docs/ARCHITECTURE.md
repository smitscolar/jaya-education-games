# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────┐
│         User Interface Layer            │
│  ┌──────────────────────────────────┐   │
│  │  React Native (Mobile)           │   │
│  │  React.js (Web)                  │   │
│  └──────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
┌─────────────��▼─────────────��────────────┐
│     State Management Layer (Redux)      │
│  ┌──────────────────────────────────┐   │
│  │  Actions → Reducers → Store      │   │
│  │  Game State                      │   │
│  │  User Profile                    │   │
│  │  Achievements                    │   │
│  └──────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Business Logic Layer                │
│  ┌──────────────────────────────────┐   │
│  │  Game Logic Engine               │   │
│  │  - ShapeColorGame                │   │
│  │  - PuzzleGame                    │   │
│  │  - MatchingGame                  │   │
│  │  - NumberLetterGame              │   │
│  │                                  │   │
│  │  Gamification Engine             │   │
│  │  - Scoring System                │   │
│  │  - Badge & Achievement System    │   │
│  │  - Leaderboard Logic             │   │
│  └──────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Data & Firebase Integration Layer    │
│  ┌──────────────────────────────────┐   │
│  │  Firebase Realtime Database      │   │
│  │  Firebase Authentication         │   │
│  │  Firebase Cloud Storage          │   │
│  │  Firebase Cloud Functions        │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Component Structure

### Mobile (React Native)

```
App.js (Root)
├── Redux Store Setup
├── Firebase Init
└── Navigation
    ├── HomeScreen
    │   ├── GameCard (x4)
    │   ├── ScoreBoard
    │   └── Badge Display
    │
    ├── ShapeColorScreen
    │   ├── Question Display
    │   ├── Options (Shape/Color)
    │   └── Feedback Component
    │
    ├── PuzzleScreen
    │   ├── Puzzle Canvas
    │   ├── Puzzle Pieces
    │   └── Success Modal
    │
    ├── MatchingScreen
    │   ├── Card Grid
    │   ├── Flip Animation
    │   └── Match Logic
    │
    └── NumberLetterScreen
        ├── Letter Display
        ├── Sound Player
        └── Interactive Elements
```

## Firebase Data Structure

### Realtime Database Schema

```json
{
  "users": {
    "userId": {
      "profile": {
        "name": "string",
        "ageGroup": "TK|SD",
        "language": "ID|EN",
        "createdAt": "timestamp"
      },
      "stats": {
        "totalScore": "number",
        "gamesPlayed": "number",
        "lastPlayed": "timestamp"
      }
    }
  },
  "games": {
    "shapeColor": {
      "levels": {
        "1": {
          "difficulty": "easy",
          "questions": []
        }
      }
    }
  },
  "achievements": {
    "userId": {
      "badges": [],
      "completedLevels": []
    }
  },
  "leaderboard": {
    "weekly": [],
    "allTime": []
  }
}
```

## Game Logic Flow

### Example: Shape Color Game

```
1. Load Question
   ├── Random shape or color
   ├── Generate options
   └── Display UI

2. Player Answer
   ├── Check answer
   ├── Update score
   └── Play feedback sound

3. Calculate Result
   ├── Correct → Next question
   ├── Wrong → Show hint
   └── Level complete? → Calculate stars

4. Update State
   ├── Redux: Update game state
   ├── Firebase: Save progress
   └── Show result modal
```

## Redux Store Structure

```javascript
store = {
  game: {
    currentGame: "shapeColor",
    currentLevel: 1,
    currentScore: 0,
    totalStars: 3,
    isLoading: false
  },
  user: {
    userId: "uuid",
    profile: {
      name: "string",
      ageGroup: "TK",
      language: "ID"
    },
    stats: {
      totalScore: 0,
      gamesPlayed: 0
    }
  },
  gamification: {
    badges: [],
    achievements: [],
    leaderboard: [],
    dailyChallenge: {}
  }
}
```

## Game Difficulty Levels

### TK (3-5 years) - Simple
- 2-3 options per question
- Colorful, large UI elements
- Slow animation
- Positive feedback only
- No time limit

### Early SD (6-8 years) - Medium
- 4 options per question
- Standard UI size
- Normal animation speed
- Mix of positive/corrective feedback
- Optional time limit

### Late SD (9-12 years) - Hard
- 5+ options per question
- Smaller UI elements
- Fast animation
- Challenging feedback
- Time-based scoring

## Performance Optimization

### Image Optimization
- Use WebP format
- Compress all assets
- Lazy load images
- Cache strategy

### Animation Optimization
- Use React Native Reanimated
- Native driver for 60fps
- Minimal re-renders

### Firebase Optimization
- Pagination for leaderboard
- Offline mode support
- Cloud Functions for complex logic
- Data indexing

## Security

### Firebase Rules
- User can only read/write own data
- Public leaderboard (read-only)
- Admin functions (Cloud Functions)
- Rate limiting

### Code Security
- No sensitive data in code
- Environment variables for secrets
- Input validation
- XSS prevention

## Scalability

### Current Setup (MVP)
- Single Firebase project
- Realtime Database
- Basic Cloud Functions

### Future Scaling
- Firestore migration (if needed)
- Multiple regions
- CDN for assets
- Load balancing
- Analytics integration
