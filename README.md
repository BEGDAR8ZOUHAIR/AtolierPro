# Atelier Pro

A full‑stack mobile application that lets French‑speaking artisans manage client appointments, view schedules, and handle communications.

## Features
- Secure authentication with JWT stored in SecureStore.
- Appointment list and calendar views with status badges.
- Booking flow with date and time‑slot pickers.
- Push notifications for upcoming appointments.
- Responsive design for iOS and Android via Expo.

## Tech Stack
- **Backend** – Node.js, Express, TypeScript, MongoDB, JWT, Resend (email/OTP).
- **Mobile** – React Native (Expo), TypeScript, Zustand for state management.
- **Infrastructure** – Cloudinary for image handling, Firebase admin for optional services.

## Prerequisites
- **Node.js** ≥ 20 (recommended LTS) and **npm** ≥ 10.
- **Expo CLI** (`npm i -g expo-cli`).
- **MongoDB** instance (local or Atlas).
- **Git** for version control.

## Getting Started
### 1. Clone the repository
```bash
git clone https://github.com/your‑org/atelier‑pro.git
cd atelier‑pro
```
### 2. Backend setup
```bash
cd backend
npm install        # install dependencies
cp .env.example .env   # copy example and fill in your values
npm run dev           # start the API (nodemon + ts-node)
```
The server runs on `http://localhost:3000` by default.

### 3. Mobile app setup
```bash
cd ../mobile
npm install        # install expo dependencies
npm start             # launch Expo development server
npx expo prebuild clean 
npx expo run:android --device  # open Android emulator
npx expo run:ios --device       # open iOS simulator
```
Scan the QR code with the Expo Go app (iOS/Android) or run `npm run ios` / `npm run android`.

## Environment Variables
Both the backend and mobile apps rely on a set of environment variables. The file `backend/.env.example` contains placeholder values – copy it to `.env` and replace the placeholders with real credentials.

| Variable | Description |
|----------|-------------|
| `PORT` | Port for the Express server (default 3000). |
| `MONGO_URI` | MongoDB connection string. |
| `JWT_SECRET` | Secret key for signing JWTs. |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g., `15d`). |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `RESEND_API_KEY` | API key for Resend email/OTP service. |
| `FRONTEND_URL` | URL of the mobile app (used in email links). |
| `FIREBASE_PROJECT_ID` | Firebase project identifier (optional). |
| `FIREBASE_API_KEY` | Firebase API key (optional). |
| `FIREBASE_CLIENT_EMAIL` | Service‑account email for Firebase (optional). |
| `FIREBASE_PRIVATE_KEY` | Private key for Firebase (optional). |

## Scripts
| Script | Action |
|--------|--------|
| `npm run dev` (backend) | Start API with hot‑reloading. |
| `npm start` (mobile) | Launch Expo dev server. |
| `npm run ios` | Open iOS simulator. |
| `npm run android` | Open Android emulator. |
| `npm test` | Run Jest test suite. |

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Commit your changes following conventional commits.
4. Open a pull request targeting `main`.

All UI text is in French to match the target audience.

## License
MIT © 2026 Atelier Pro
