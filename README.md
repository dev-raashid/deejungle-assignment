# Deejungle Mobile App

Deejungle is a React Native application built with Expo and Expo Router. The current implementation provides a single production-style screen that fetches posts from a mock API, tracks user interaction through a persistent counter, and presents animated feedback in the UI.

## Overview

The app currently supports:

- fetching posts from a remote mock API
- persisting fetched posts locally across app restarts
- persisting the counter state locally across app restarts
- animated visual feedback when the counter updates
- automated coverage for store behavior and screen rendering

## Demo Recording

A demo recording of the app flow is available here:

- [Deejungle Demo Recording](https://drive.google.com/file/d/1sHu6K0N_ZIjhosyvwovLGG2xP7FiiHKv/view?usp=drive_link)

## Tech Stack

- Expo
- React Native
- Expo Router
- TypeScript
- Zustand
- AsyncStorage
- React Native Reanimated
- Jest
- React Native Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- Yarn
- Xcode Simulator, Android Emulator, or Expo Go

### Install Dependencies

```bash
yarn install
```

### Start The App

```bash
yarn start
```

### Run On Specific Platforms

```bash
yarn ios
yarn android
yarn web
```

## Scripts

Start the development server:

```bash
yarn start
```

Run tests:

```bash
yarn test
```

Run lint checks:

```bash
yarn lint
```

## Project Structure

```text
app/
  _layout.tsx
  index.tsx
components/
  ui/
    button.tsx
  posts/
    posts-list.tsx
screens/
  home-screen.tsx
services/
  api/
  storage/
store/
types/
__tests__/
```

## Architecture

### App Layer

The `app/` directory contains the Expo Router entry points. Routing is intentionally minimal because the current product surface is a single focused screen. This keeps navigation concerns separate from feature implementation and allows the app to scale cleanly if more screens are added later.

### Feature Layer

The `screens/home/` directory owns the main screen and . This keeps screen-specific presentation logic close together and prevents unrelated app concerns from being mixed into the route files.

### State Management

Global app state is managed with Zustand in `store/app-store.ts`. Zustand was chosen because it provides:

- a simple, production-friendly global state model
- low boilerplate compared to heavier state libraries
- straightforward persistence integration
- clear separation between UI and state transitions

The store currently owns:

- `counter`
- `posts`
- `isLoading`
- `error`
- `fetchData`

### Persistence

Persistence is handled through Zustand middleware and AsyncStorage. The persisted state is limited to durable business data:

- counter value
- fetched posts

Transient UI state such as loading and error flags is intentionally not persisted.

### Service Layer

The app separates external concerns into `services/`:

- `services/api/posts.ts` handles network requests and response mapping
- `services/storage/async-storage.ts` centralizes storage configuration

This keeps side effects out of the UI layer and makes the code easier to extend and test.

### UI And Animation

UI is split into small focused components rather than one large screen file. The animated counter logic is isolated in `components/animated-counter.tsx`, keeping presentation behavior local and preventing animation concerns from leaking into the store.

## Testing

The project includes lightweight automated coverage for the most important runtime behavior:

- store behavior in `__tests__/store/app-store.test.ts`
- screen rendering in `__tests__/screens/home-screen.test.tsx`

## Production-Oriented Decisions

The codebase is intentionally structured to remain maintainable as the app grows:

- small, responsibility-focused components
- isolated state management
- centralized persistence
- separated API access
- TypeScript-first development
- automated linting and test coverage

These choices make it easier to scale the app beyond its current scope without needing to rewrite the core structure.
