# 📚 API Documentation

## Game Endpoints

### 1. Shape & Color Game

#### GET /games/shapecolor/questions/:level

Mendapatkan soal untuk level tertentu.

**Parameters:**
- `level` (number): 1-5
- `language` (query): 'ID' atau 'EN'

**Response:**
```json
{
  "questionId": "uuid",
  "type": "shape",
  "question": "Mana yang segitiga?",
  "options": [
    {
      "id": "1",
      "label": "Circle",
      "emoji": "⭕"
    },
    {
      "id": "2",
      "label": "Triangle",
      "emoji": "🔺",
      "isCorrect": true
    }
  ]
}
```

#### POST /games/shapecolor/answer

Submit jawaban dan dapatkan hasil.

**Body:**
```json
{
  "questionId": "uuid",
  "selectedOptionId": "2",
  "timeSpent": 5000,
  "userId": "uuid"
}
```

**Response:**
```json
{
  "isCorrect": true,
  "points": 100,
  "feedback": "Benar!",
  "sound": "correct.mp3"
}
```

### 2. Puzzle Game

#### GET /games/puzzle/level/:level

Mendapatkan puzzle untuk level tertentu.

**Response:**
```json
{
  "puzzleId": "uuid",
  "image": "url",
  "pieces": 9,
  "difficulty": "easy",
  "pieces_data": [
    {
      "id": "1",
      "x": 0,
      "y": 0,
      "width": 100,
      "height": 100,
      "image": "piece_url"
    }
  ]
}
```

#### POST /games/puzzle/submit

Submit puzzle yang sudah diselesaikan.

**Body:**
```json
{
  "puzzleId": "uuid",
  "timeTaken": 120000,
  "userId": "uuid"
}
```

### 3. Matching Game

#### GET /games/matching/level/:level

Mendapatkan kartu untuk memory game.

**Response:**
```json
{
  "sessionId": "uuid",
  "cards": [
    {
      "id": "1",
      "front": "🍎",
      "back": "apple",
      "pairId": "1"
    },
    {
      "id": "2",
      "front": "🍌",
      "back": "banana",
      "pairId": "2"
    }
  ]
}
```

#### POST /games/matching/check

Cek apakah dua kartu match.

**Body:**
```json
{
  "sessionId": "uuid",
  "card1": "1",
  "card2": "2"
}
```

**Response:**
```json
{
  "isMatch": false,
  "points": 0,
  "feedback": "Not a match"
}
```

### 4. Number & Letter Game

#### GET /games/numberletters/question/:type

Mendapatkan soal angka atau huruf.

**Parameters:**
- `type` (string): 'number' atau 'letter'
- `level` (query): 1-5

**Response:**
```json
{
  "questionId": "uuid",
  "type": "number",
  "question": "Berapa 2 + 3?",
  "options": ["4", "5", "6"],
  "sound": "two_plus_three.mp3",
  "isCorrect": 1
}
```

## User Endpoints

### POST /users/create

Buat profil pengguna baru.

**Body:**
```json
{
  "name": "Budi",
  "ageGroup": "TK",
  "language": "ID",
  "parentEmail": "parent@email.com"
}
```

**Response:**
```json
{
  "userId": "uuid",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### GET /users/:userId/profile

Ambil profil pengguna.

**Response:**
```json
{
  "userId": "uuid",
  "name": "Budi",
  "ageGroup": "TK",
  "language": "ID",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### PUT /users/:userId/profile

Update profil pengguna.

**Body:**
```json
{
  "language": "EN"
}
```

## Gamification Endpoints

### GET /users/:userId/stats

Ambil statistik pengguna.

**Response:**
```json
{
  "userId": "uuid",
  "totalScore": 5250,
  "gamesPlayed": 45,
  "favoriteGame": "puzzle",
  "currentStreak": 7,
  "bestScore": 1500
}
```

### GET /users/:userId/badges

Ambil badges pengguna.

**Response:**
```json
{
  "badges": [
    {
      "id": "first_game",
      "name": "First Game",
      "description": "Complete your first game",
      "icon": "🎮",
      "unlockedAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "puzzle_master",
      "name": "Puzzle Master",
      "description": "Complete all puzzle levels",
      "icon": "🧩",
      "unlockedAt": null,
      "progress": 0.75
    }
  ]
}
```

### GET /leaderboard/:type

Ambil leaderboard.

**Parameters:**
- `type` (string): 'daily', 'weekly', 'allTime'
- `ageGroup` (query): 'TK' atau 'SD'
- `limit` (query): default 10

**Response:**
```json
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "uuid",
      "name": "Budi",
      "score": 10000,
      "avatar": "emoji"
    },
    {
      "rank": 2,
      "userId": "uuid",
      "name": "Ani",
      "score": 9500,
      "avatar": "emoji"
    }
  ]
}
```

### POST /dailychallenge/complete

Menyelesaikan daily challenge.

**Body:**
```json
{
  "userId": "uuid",
  "challengeId": "uuid",
  "score": 500
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "message": "Age group must be TK or SD"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "User not authenticated"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Game not found"
}
```

### 500 Server Error
```json
{
  "error": "Server error",
  "message": "An unexpected error occurred"
}
```

## SDK Usage

### JavaScript/React

```javascript
import { GameService } from './services/gameService';

const gameService = new GameService();

// Get questions
const questions = await gameService.getQuestions('shapeColor', 1);

// Submit answer
const result = await gameService.submitAnswer({
  questionId: 'uuid',
  selectedOptionId: '2'
});
```

## Rate Limiting

- API requests: 100 per minute per user
- File uploads: 10MB max
- Database writes: 50 per second

## Versioning

Current API version: **v1**

URL: `/api/v1/*`
