# 📦 Installation Guide

## Prerequisites

### Sistem Requirements
- **Node.js:** v14.0.0 atau lebih tinggi
- **npm:** v6.0.0 atau lebih tinggi (atau yarn v1.22.0+)
- **Git:** v2.0.0 atau lebih tinggi

### Untuk Development Mobile (Optional)
- **Xcode** (untuk iOS) - macOS only
- **Android Studio** (untuk Android)
- **Java Development Kit (JDK)** v11 atau lebih tinggi

### Untuk Development Web
- Browser modern (Chrome, Firefox, Safari, Edge)

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone https://github.com/smitscolar/jaya-education-games.git
cd jaya-education-games
```

### 2. Setup Environment Variables

Buat file `.env` di root folder:

```bash
cp .env.example .env
```

Isi dengan konfigurasi Firebase Anda:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 3. Install Dependencies

#### Untuk Web Version

```bash
cd web
npm install
# atau
yarn install
```

#### Untuk Mobile Version (React Native)

```bash
cd mobile
npm install
```

**Untuk iOS (macOS only):**
```bash
cd mobile/ios
pod install
cd ..
```

### 4. Setup Firebase (Optional but Recommended)

1. Buka [Firebase Console](https://console.firebase.google.com)
2. Buat project baru: "JAYA EDUCATION GAMES"
3. Aktifkan services:
   - Realtime Database
   - Cloud Storage
   - Authentication (Google, Anonymous)
4. Download `google-services.json` untuk Android
5. Download `GoogleService-Info.plist` untuk iOS
6. Letakkan file-file tersebut di folder yang sesuai

### 5. Run Development Server

#### Web Version

```bash
cd web
npm start
```

Aplikasi akan terbuka di: http://localhost:3000

#### Mobile Version - iOS

```bash
cd mobile
npm run ios
```

#### Mobile Version - Android

```bash
cd mobile
npm run android
```

## Troubleshooting

### Error: "Node modules not found"

```bash
rm -rf node_modules
npm install
```

### Error: "Pod install failed" (iOS)

```bash
cd mobile/ios
rm -rf Pods Podfile.lock
pod install
cd ../..
```

### Error: "Metro bundler failed"

```bash
cd mobile
npm start -- --reset-cache
```

### Firebase Connection Issues

- Pastikan Firebase credentials sudah benar di `.env`
- Cek Firebase Rules di Firebase Console
- Pastikan internet connection aktif

## Next Steps

1. Baca [Architecture Guide](./ARCHITECTURE.md)
2. Lihat [API Documentation](./API.md)
3. Mulai develop di `mobile/src` atau `web/src`

## Helpful Commands

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run tests
npm test

# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

## Getting Help

Jika mengalami masalah:
1. Cek dokumentasi di folder `docs/`
2. Buka issue di GitHub: https://github.com/smitscolar/jaya-education-games/issues
3. Hubungi tim development
