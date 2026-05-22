# 🎮 JAYA EDUCATION GAMES

**Dibuat oleh:** JAYA EDUCATION GROUP

## 📝 Deskripsi

Permainan Edukatif untuk Anak TK-SD - Belajar Bentuk, Warna, Angka, Huruf

Aplikasi mobile dan web yang dirancang khusus untuk membantu anak-anak TK (3-5 tahun) belajar sambil bermain dengan cara yang menyenangkan dan interaktif.

## 🎯 Target Usia

- **TK (3-5 tahun):** Fokus pada pengenalan dasar
- **SD (6-12 tahun):** Konten yang lebih menantang (akan dikembangkan kemudian)

## 🎮 Mini-Games Tersedia

1. **🎨 Permainan Pengenalan Bentuk & Warna**
   - Mengenali berbagai bentuk (lingkaran, segitiga, persegi, dll)
   - Mempelajari berbagai warna
   - Level kesulitan: Mudah → Sulit

2. **🧩 Puzzle Sederhana**
   - Puzzle gambar dengan 4-9 potongan
   - Drag and drop interaktif
   - Feedback audio dan visual

3. **🎯 Permainan Mencocokkan Gambar**
   - Memory card game
   - Matching visual elements
   - Meningkatkan konsentrasi dan memori

4. **🔢 Pengenalan Angka & Huruf**
   - Belajar angka 0-10
   - Belajar huruf A-Z
   - Sistem pengenal suara (optional)

5. **🏆 Sistem Gamifikasi**
   - Poin dan skor
   - Badge dan achievement
   - Leaderboard
   - Daily challenges
   - Progress tracking

## 🛠️ Teknologi Stack

### Frontend
- **Mobile:** React Native (iOS & Android)
- **Web:** React.js
- **UI Framework:** React Native Paper
- **State Management:** Redux
- **Animation:** React Native Reanimated

### Backend & Database
- **Backend:** Firebase
- **Database:** Firebase Realtime Database
- **Authentication:** Firebase Auth (optional)
- **Storage:** Firebase Cloud Storage

### Development Tools
- **Version Control:** Git & GitHub
- **Package Manager:** npm / yarn
- **Code Editor:** Visual Studio Code
- **Testing:** Jest & React Testing Library

## 📂 Struktur Project

```
jaya-education-games/
├── mobile/                    # React Native (iOS + Android)
│   ├── src/
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── ShapeColorScreen.js
│   │   │   ├── PuzzleScreen.js
│   │   │   ├── MatchingScreen.js
│   │   │   └── NumberLetterScreen.js
│   │   ├── components/
│   │   │   ├── GameCard.js
│   │   │   ├── ScoreBoard.js
│   │   │   ├── Badge.js
│   │   │   └── ProgressBar.js
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── sounds/
│   │   │   └── animations/
│   │   ├── utils/
│   │   │   ├── firebase.js
│   │   │   ├── gameLogic.js
│   │   │   └── colors.js
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   ├── reducers/
│   │   │   └── store.js
│   │   └── App.js
│   └── package.json
│
├── web/                       # React (Web Version)
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
│
├── backend/                   # Firebase Config & Functions
│   ├── firebase/
│   │   ├── config.js
│   │   └── firebaseRules.json
│   └── functions/
│
├── docs/
│   ├── INSTALLATION.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── CONTRIBUTING.md
│
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- React Native CLI (untuk development mobile)
- Xcode (untuk iOS) atau Android Studio (untuk Android)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/smitscolar/jaya-education-games.git
cd jaya-education-games
```

#### 2. Setup Mobile (React Native)
```bash
cd mobile
npm install
# Untuk iOS
npm run ios
# Untuk Android
npm run android
```

#### 3. Setup Web (React)
```bash
cd web
npm install
npm start
```

## 📚 Dokumentasi Lengkap

Baca dokumentasi detail di:
- [Installation Guide](./docs/INSTALLATION.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)

## 🎨 UI/UX Design Principles

- ✅ **Colorful & Engaging:** Warna-warna cerah yang menarik anak-anak
- ✅ **User-Friendly:** Interface simple dan mudah dipahami
- ✅ **Touch-Friendly:** Tombol besar dan responsif untuk tangan anak
- ✅ **Accessible:** Dukungan screen reader dan high contrast
- ✅ **Safe:** No external links atau purchases
- ✅ **Fast Loading:** Optimized untuk performa

## 🔒 Privacy & Safety

- ✅ Tidak ada iklan
- ✅ Tidak ada in-app purchases
- ✅ Tidak ada data collection personal
- ✅ COPPA compliant (Children's Online Privacy Protection Act)
- ✅ Parental controls (optional)

## 🐛 Bug Reporting

Jika menemukan bug, silakan buat issue di:
https://github.com/smitscolar/jaya-education-games/issues

## 📄 License

Proyek ini akan menggunakan MIT License (akan ditambahkan kemudian)

## 👥 Contributing

Kontribusi sangat diterima! Silakan baca [CONTRIBUTING.md](./docs/CONTRIBUTING.md) untuk detail.

## 📞 Contact

**JAYA EDUCATION GROUP**
- Email: myproject0321@gmail.com
- GitHub: [@smitscolar](https://github.com/smitscolar)

---

**Made with ❤️ for Kids' Education**
