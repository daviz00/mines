# Mines Game - Internal Documentation

## Overview

A Mines game implementation for Jumbo Engineering, built with Next.js and TypeScript. The game features a 5x5 grid where players bet on uncovering gems while avoiding bombs.

## Key Features

- 5x5 grid with configurable bombs (1-24)
- Real-time multiplier system
- Wallet management with local storage
- Responsive design
- Sound effects and visual feedback
- Re-shuffle functionality

## Technical Details

- **Stack**: Next.js, TypeScript, Tailwind CSS
- **State Management**: React Hooks
- **Storage**: Local Storage for wallet persistence
- **Multipliers**: Pre-calculated arrays for each bomb count (1-24)

## Setup

```bash
npm install
npm run dev
```

## Game Rules

1. Set bet amount and bomb count
2. Click cells to reveal gems/bombs
3. Cash out anytime or continue until bomb hit
4. Win = current multiplier × bet amount

## Notes

- Demo version - requires additional security measures for production
- Multiplier tables stored in `src/app/utils/multiplier.ts`
- Main game logic in `src/app/page.tsx`
