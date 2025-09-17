# Contributing to Keyboard Configurator

First off, thank you for considering contributing to Keyboard Configurator! 🎉 

The mechanical keyboard community thrives on collaboration, and we welcome contributions from enthusiasts of all skill levels - whether you're a seasoned developer, a keyboard expert, or someone just getting started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (screenshots, code snippets)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (browser, OS, device)

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

- **A clear and descriptive title**
- **A detailed description** of the proposed feature
- **Use cases** - why would this be useful?
- **Mockups or examples** if applicable
- **Consider the scope** - how does this fit with the project goals?

### 🔧 Code Contributions

#### Areas Where We Need Help

- **Switch Database**: Adding new switches with accurate specifications
- **Keycap Data**: Expanding keycap profiles and compatibility info
- **Build Guides**: Creating step-by-step assembly instructions
- **UI/UX Improvements**: Making the interface more intuitive
- **Performance**: Optimizing rendering and interactions
- **Testing**: Adding unit and integration tests
- **Documentation**: Improving guides and API docs

#### Types of Contributions

1. **Bug Fixes** - Fix issues in existing functionality
2. **New Features** - Add new capabilities to the configurator
3. **Data Additions** - Add switches, keycaps, or layouts
4. **Performance** - Optimize existing code
5. **Documentation** - Improve guides, comments, or examples
6. **Tests** - Add or improve test coverage

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/keyboard-configurator.git
   cd keyboard-configurator
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/1oosedows/keyboard-configurator.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** to `http://localhost:3000`

### Project Structure Overview

```
├── app/                    # Next.js pages and routing
├── components/             # Reusable UI components
├── lib/                    # Business logic and utilities
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── .kiro/                  # IDE configuration
```

## 🔄 Development Process

### Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Individual features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical production fixes

### Workflow

1. **Create a branch** from `develop`:
   ```bash
   git checkout develop
   git pull upstream develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** with clear, focused commits

3. **Test your changes** thoroughly:
   ```bash
   npm run lint      # Check code style
   npm run build     # Ensure it builds
   npm run dev       # Test functionality
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** to the `develop` branch

## 🎨 Style Guidelines

### Code Style

We use [Biome](https://biomejs.dev/) for consistent formatting:

```bash
npm run format    # Auto-format code
npm run lint      # Check for issues
```

### Key Principles

- **TypeScript First** - All new code should be properly typed
- **Component Composition** - Prefer small, reusable components
- **Accessibility** - Ensure all UI is keyboard and screen reader accessible
- **Performance** - Consider rendering performance for large datasets
- **Mobile First** - Design for mobile, enhance for desktop

### File Naming

- **Components**: PascalCase (`KeyboardView.tsx`)
- **Utilities**: camelCase (`keyboardUtils.ts`)
- **Types**: camelCase (`keyboardTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE (`KEYBOARD_LAYOUTS`)

### Component Guidelines

```typescript
// ✅ Good - Clear props interface, proper exports
interface KeyboardViewProps {
  layout: KeyboardLayout;
  onKeySelect?: (keyId: string) => void;
}

export function KeyboardView({ layout, onKeySelect }: KeyboardViewProps) {
  // Component logic
}

// ✅ Good - Default export for pages
export default function ConfiguratorPage() {
  // Page logic
}
```

## 📝 Commit Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(configurator): add keyboard layout switching
fix(marketplace): resolve price calculation bug
docs(readme): update installation instructions
style(components): format with biome
```

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review of the code
- [ ] Comments added for complex logic
- [ ] Tests added/updated if applicable
- [ ] Documentation updated if needed
- [ ] No console.log statements left in code

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] Tested on mobile

## Screenshots
(If applicable)

## Additional Notes
Any additional context or notes
```

### Review Process

1. **Automated checks** must pass (linting, building)
2. **Code review** by maintainers
3. **Testing** on different browsers/devices
4. **Approval** and merge to develop
5. **Release** planning for main branch

## 🌟 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **Community badges** for ongoing contributors
- **Special thanks** in project announcements

## 🏷️ Issue Labels

- `good first issue` - Great for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `question` - Further information requested
- `priority: high` - Needs immediate attention

## 💬 Community

### Getting Help

- **GitHub Discussions** - General questions and ideas
- **Issues** - Bug reports and feature requests
- **Discord** - Real-time chat (coming soon)

### Communication Guidelines

- **Be respectful** and inclusive
- **Stay on topic** in discussions
- **Search first** before asking questions
- **Provide context** when asking for help
- **Share knowledge** with other contributors

## 📚 Resources

### Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Mechanical Keyboard Resources

- [Keyboard University](https://keyboard.university/)
- [r/MechanicalKeyboards Wiki](https://www.reddit.com/r/MechanicalKeyboards/wiki/)
- [QMK Documentation](https://docs.qmk.fm/)

---

Thank you for contributing to Keyboard Configurator! Together, we're building the best tool for the mechanical keyboard community. 🎹✨