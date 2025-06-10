# Oscar Movies Database

A web application for browsing and managing Oscar nominations and awards data using modern web technologies.

## Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Technology Stack

### Frontend
- **Nuxt 3** - Vue.js framework for building server-side rendered applications
- **Vue 3** - Progressive JavaScript framework for building user interfaces
- **Pinia** - State management for Vue applications
- **SCSS/Sass** - CSS preprocessor for styling components

### Backend
- **Nuxt Server API** - Server-side API endpoints using Nuxt API routes
- **Drizzle ORM** - TypeScript ORM for SQL databases
- **LibSQL** - SQLite-compatible database used for storing Oscar and movie data
- **Valibot** - Runtime type validation library for data validation

### APIs and Integration
- **TMDb API** - External movie database API integration for fetching movie and person data

### Development Tools
- **TypeScript** - Typed JavaScript for improved developer experience
- **ESLint** - Code linting and static analysis
- **Prettier** - Code formatting
- **PNPM** - Fast and disk-efficient package manager

## Project Structure

- `app/` - Vue components, pages, and styles
- `database/` - Database schema definitions using Drizzle ORM
- `server/` - API endpoints and server-side utilities
- `shared/` - Types and utilities shared between client and server

## Features

- Browse Oscar nominations and winners by year and award category
- View detailed movie information with TMDb data integration
- Admin interface for managing nominations and awards
- Movie providers information (where to watch)
- Batch and single movie data insertion capabilities
