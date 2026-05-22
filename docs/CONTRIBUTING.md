# 🤝 Contributing Guidelines

Terima kasih telah ingin berkontribusi pada JAYA EDUCATION GAMES! 🎉

## Code of Conduct

Proyek ini berkomitmen pada kode perilaku yang inklusif. Semua kontributor diharapkan:
- Menghormati semua peserta
- Tidak ada diskriminasi
- Fokus pada konten edukatif untuk anak-anak

## Cara Berkontribusi

### 1. Fork Repository

```bash
git clone https://github.com/YOUR_USERNAME/jaya-education-games.git
cd jaya-education-games
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

### 4. Push to Branch

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Buka GitHub repository
2. Klik "Compare & pull request"
3. Jelaskan perubahan Anda
4. Submit PR

## Commit Message Format

Gunakan format conventional commits:

```
feat: add new shape game
fix: resolve puzzle piece alignment issue
docs: update installation guide
style: format code according to eslint
refactor: improve game logic
test: add unit tests for game logic
```

## Code Style Guide

### JavaScript/React

```javascript
// Use ES6+
const myFunction = () => {
  // Arrow functions preferred
};

// Use meaningful variable names
const playerScore = 100;

// Comment complex logic
// Divide by 2 to get the center position
const centerX = width / 2;

// Use camelCase for variables and functions
const getCurrentLevel = () => {};

// Use PascalCase for components
const GameCard = () => {};
```

### File Structure

```
├── components/
│   ├── GameCard.js
│   ├── GameCard.test.js
│   └── GameCard.styles.js
├── screens/
│   ├── HomeScreen.js
│   └── HomeScreen.test.js
└── utils/
    ├── gameLogic.js
    └── gameLogic.test.js
```

## Testing

### Write Tests for New Features

```javascript
import { calculateScore } from './gameLogic';

describe('calculateScore', () => {
  it('should return correct score', () => {
    const score = calculateScore(10, 5);
    expect(score).toBe(50);
  });
});
```

### Run Tests

```bash
npm test
```

## Documentation

- Perbarui README jika ada perubahan fitur
- Tambahkan JSDoc comments untuk fungsi kompleks
- Update docs/ folder jika ada perubahan arsitektur

```javascript
/**
 * Calculate the score for a game level
 * @param {number} points - Base points earned
 * @param {number} timeBonus - Bonus for completion time
 * @returns {number} Total score
 */
const calculateScore = (points, timeBonus) => {
  return points + timeBonus;
};
```

## Pull Request Process

1. **Update Documentation**
   - Update README.md jika diperlukan
   - Update docs/ folder

2. **Test Your Changes**
   - Run `npm test`
   - Test di device/emulator
   - Check responsive design

3. **Code Review**
   - Tunggu review dari maintainers
   - Respond to comments
   - Make requested changes

4. **Merge**
   - Squash commits jika diperlukan
   - Merge ke main branch

## Issue Report Template

Saat membuat issue, gunakan format berikut:

```markdown
## Deskripsi
Jelaskan issue dengan jelas

## Steps to Reproduce
1. Buka aplikasi
2. Klik ...
3. Lihat error

## Expected Behavior
Apa yang seharusnya terjadi

## Actual Behavior
Apa yang terjadi sebenarnya

## Screenshots
Jika applicable, tambahkan screenshot

## Environment
- Platform: iOS / Android / Web
- OS Version: iOS 14 / Android 10 / Chrome 90
- App Version: 1.0.0
```

## Feature Request Template

```markdown
## Feature Description
Jelaskan fitur yang diminta

## Why is this needed?
Alasan mengapa fitur ini penting

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## Additional Context
Info tambahan yang relevan
```

## Development Tips

### Useful Commands

```bash
# Install dependencies
npm install

# Run development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

### Debug Mobile App

```bash
# iOS
npm run ios -- --verbose

# Android
npm run android -- --verbose
```

### Firebase Emulator

```bash
firebase emulators:start
```

## Getting Help

- Buka issue di GitHub
- Hubungi team development
- Check existing documentation
- Search previous issues

## Recognition

Terima kasih kepada semua kontributor! ❤️

Kontributor akan ditambahkan ke:
- README.md
- Contributors page
- Release notes

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License yang sama dengan proyek ini.

---

**Happy Contributing!** 🚀
