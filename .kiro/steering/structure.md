# Project Structure

## Root Directory
```
keyboard-configurator/
├── app/                 # Next.js App Router directory
├── public/              # Static assets
├── .kiro/               # Kiro configuration and steering
├── .vscode/             # VS Code settings
├── node_modules/        # Dependencies
└── config files         # Various configuration files
```

## App Directory (Next.js App Router)
```
app/
├── layout.tsx          # Root layout component
├── page.tsx            # Home page component
├── globals.css         # Global styles and Tailwind imports
└── favicon.ico         # Site favicon
```

## Public Assets
```
public/
├── *.svg               # SVG icons and graphics
└── static files        # Other static assets
```

## Configuration Files
- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `biome.json` - Biome linter/formatter settings
- `postcss.config.mjs` - PostCSS configuration
- `.gitignore` - Git ignore patterns

## Conventions

### File Naming
- React components: PascalCase (e.g., `HomePage.tsx`)
- Pages: lowercase (e.g., `page.tsx`, `layout.tsx`)
- Utilities/helpers: camelCase
- Constants: UPPER_SNAKE_CASE

### Import Organization
- External libraries first
- Internal imports second
- Relative imports last
- Biome automatically organizes imports

### Component Structure
- Use TypeScript interfaces for props
- Export default for page/layout components
- Use named exports for utilities and hooks
- Prefer function declarations over arrow functions for components