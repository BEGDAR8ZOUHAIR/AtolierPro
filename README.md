# Atelier Pro

A full‑stack mobile application that lets French‑speaking artisans manage client appointments, view schedules, and handle communications.

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/96af9d64-f9e0-4b71-bab4-ee868b86872e" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/c8c55338-6546-4bf2-877e-65c595aa7dcd" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/6ecdf518-a878-4331-a8f0-93af2765ffcf" width="180"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/028fcd25-63bd-4ee8-9a84-48b2c2d96c7d" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/430b460e-ccda-4042-96df-1b4c60dd6735" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/3665d6c8-eee2-4c66-baa1-a15264b566e0" width="180"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/1e0d8b49-1a39-4bd8-9bae-0ae67bcb2465" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/b27422db-ed8b-4474-b79b-4dd930cead75" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/9cc1325a-4700-4ad0-add2-abffc3512c18" width="180"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/686db73e-ed3a-467b-b895-678a6fa4361d" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/4cb68086-d404-40e8-a61a-16219262e5ae" width="180"/></td>
    <td><img src="https://github.com/user-attachments/assets/ef08acb3-e4f2-4ea6-a9b0-17ed1bd7de11" width="180"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2e56c73a-7839-4a20-99b1-3263e03dd4c8" width="180"/></td>
    <td></td>
    <td></td>
  </tr>
</table>

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
