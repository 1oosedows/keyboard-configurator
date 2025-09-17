# Technology Stack

## Framework & Runtime
- **Next.js 15.5.3** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Strict typing enabled
- **Node.js** - Runtime environment

## Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Geist Font Family** - Modern typography (Sans & Mono variants)
- **Dark/Light Mode** - Built-in theme support via CSS custom properties

## Code Quality & Tooling
- **Biome** - Fast linter, formatter, and import organizer
- **Turbopack** - Next.js bundler for faster builds
- **Strict TypeScript** - Enhanced type safety

## Common Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Production build with Turbopack
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

## Configuration Notes
- Uses App Router (not Pages Router)
- Path aliases: `@/*` maps to project root
- Biome configured for 2-space indentation
- Import organization enabled
- Git integration for VCS-aware linting