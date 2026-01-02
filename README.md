# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Routes cheatsheet

- Tabs (protected): [app/(protected)/(tabs)](<app/(protected)/(tabs)>)
- Stack inside tab: [app/(protected)/(tabs)/feed](<app/(protected)/(tabs)/feed>)
- Modal route: [app/modal.tsx](app/modal.tsx)
- Not found: [app/+not-found.tsx](app/+not-found.tsx)
- Dynamic segment: [app/(protected)/user/[id].tsx](<app/(protected)/user/%5Bid%5D.tsx>)
- Optional catch-all: [app/docs/[[...slug]].tsx](app/docs/%5B%5B...slug%5D%5D.tsx)
- Drawer example: [app/(protected)/(drawer)](<app/(protected)/(drawer)>)
- Login (public): [app/(public)/login.tsx](<app/(public)/login.tsx>)
- Auth guard: [app/(protected)/\_layout.tsx](<app/(protected)/_layout.tsx>)

Start

```bash
npm install
# If needed for drawer (first time only):
npm install @react-navigation/drawer
npx expo start
```

## Hot reload (Fast Refresh)

- Fast Refresh is enabled by default in Expo dev builds. Open the dev menu in the app and keep "Fast Refresh" on.
- Windows tip: If file changes don’t trigger reloads (network/OneDrive folders), use polling:

```bash
npm run start:poll
# or directly in PowerShell:
$env:CHOKIDAR_USEPOLLING=1; npx expo start
```

- Clear cache if reloads seem stale:

```bash
npm run start:clear
```

- Quick reload shortcuts:
  - Android emulator: double-press R
  - iOS simulator: Cmd+R
  - Dev menu: Android (Ctrl+M or shake), iOS (Cmd+D)

## Deep linking & Auth guard

- Scheme: `learnapp` (configured in app.json)
- Protected screens are under tabs (Home, Explore, Feed). If unauthenticated, you are redirected to `/login` with a `redirect` back to the requested path.

Try a protected deep link after starting the dev server:

```bash
# Android (Windows): open a protected deep link
npx uri-scheme open "learnapp://feed/1" --android

# iOS (requires macOS)
npx uri-scheme open "learnapp://feed/1" --ios
```

Flow:

- Not logged in → Login opens, preserving the target path.
- Tap "Login" → Navigates to the original path (e.g., `/feed/1`).
- Home tab has a "Logout" button.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
