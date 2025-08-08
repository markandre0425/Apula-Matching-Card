# APULA-FIRE-SAFETY-MEMORY-MATCH

A web-based memory matching game that teaches fire safety concepts through interactive gameplay.

## Overview

This application combines educational content with engaging gameplay to help users learn important fire safety tips. Players match pairs of cards containing fire safety information, reinforcing critical safety knowledge in an entertaining format.

## Features

- **Memory Matching Game**: Flip cards to find matching pairs with fire safety tips
- **Educational Content**: Learn important fire safety concepts while playing
- **Responsive Design**: Works on desktop and mobile devices
- **Score Tracking**: Records game completion time and number of attempts
- **Modern UI**: Clean, intuitive interface built with React and Tailwind CSS

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Build Tools**: Vite, ESBuild
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/APULA-FIRE-SAFETY-MEMORY-MATCH.git
   cd APULA-FIRE-SAFETY-MEMORY-MATCH
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database
   ```

4. Initialize the database:
   ```
   npm run db:push
   ```

### Development

Start the development server:
```
npm run dev
```

The application will be available at http://localhost:5000 (or another available port if 5000 is in use).

### Building for Production

Build the application:
```
npm run build
```

Start the production server:
```
npm start
```

## Project Structure

- `/client`: Frontend React application
  - `/src`: Source code
    - `/components`: Reusable UI components
    - `/hooks`: Custom React hooks
    - `/lib`: Utility functions and data
    - `/pages`: Page components
- `/server`: Backend Express application
  - `/routes`: API route definitions
  - `/vite.ts`: Vite server configuration
- `/shared`: Code shared between frontend and backend
  - `/schema.ts`: Database schema definitions

## Game Mechanics

The game presents a grid of face-down cards. Each card contains a fire safety tip and icon. Players flip two cards at a time, trying to find matching pairs. When a match is found, the cards remain face-up. The game continues until all pairs are matched.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

