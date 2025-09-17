# 🎹 Keyboard Configurator

> **Build Your Perfect Mechanical Keyboard**

A comprehensive web application for designing, configuring, and building custom mechanical keyboards with community features, marketplace integration, and educational guides.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 🎨 **Visual Configurator**
- Real-time keyboard layout visualization
- Interactive key mapping and customization
- Multiple layout support (60%, TKL, Full Size)
- Zoom, pan, and grid controls
- Configuration save/load system

### 🔧 **Build Difficulty System**
- 5-level difficulty rating (Beginner → Expert)
- Tool requirements and cost estimates
- Step-by-step build guides with time estimates
- Common mistakes database with prevention tips
- Personalized difficulty recommendations

### 👥 **Community Features**
- User profiles with reputation and badges
- Build sharing with photos and descriptions
- Community forums and discussions
- Build challenges and competitions
- Social proof and gamification elements

### 🛒 **Marketplace Integration**
- Member-to-member component sales
- Seller ratings and verification system
- Shipping cost calculator
- Item conditions and detailed specifications
- Watchlist and price tracking

### 📊 **Hardware Reference**
- Comprehensive switch database with radar charts
- Keycap profiles, materials, and sizing guides
- Real vendor pricing and availability
- Compatibility checking system
- Sound and feel characteristics visualization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1oosedows/keyboard-configurator.git
   cd keyboard-configurator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
keyboard-configurator/
├── app/                    # Next.js App Router pages
│   ├── configurator/       # Visual keyboard configurator
│   ├── community/          # Community builds and forums
│   ├── marketplace/        # Component marketplace
│   └── reference/          # Hardware reference guides
├── components/             # Reusable UI components
│   ├── ui/                 # Basic UI components
│   ├── keyboard/           # Keyboard-specific components
│   ├── community/          # Community features
│   ├── charts/             # Data visualization
│   └── panels/             # Side panels and info displays
├── lib/                    # Business logic and utilities
│   ├── keyboard-layouts.ts # Layout definitions and utilities
│   ├── switch-reference.ts # Switch database and analysis
│   ├── keycap-reference.ts # Keycap profiles and sizing
│   ├── build-difficulty.ts # Difficulty assessment system
│   ├── community.ts        # Community features logic
│   └── storage.ts          # Local storage management
├── types/                  # TypeScript type definitions
└── .kiro/                  # Kiro IDE configuration
```

## 🎯 Key Features Explained

### Build Difficulty Assessment
Our unique difficulty system analyzes your keyboard configuration and provides:
- **Skill requirements** (soldering, firmware, etc.)
- **Tool needs** with cost estimates
- **Time estimates** for completion
- **Step-by-step guides** tailored to your build
- **Common pitfalls** and how to avoid them

### Switch Radar Charts
Visual representation of switch characteristics:
- **Tactility** - How pronounced the tactile bump is
- **Clickiness** - Audible click volume
- **Smoothness** - How smooth the keypress feels
- **Weight** - Actuation force required
- **Sound** - Overall sound profile
- **Stability** - Wobble and consistency

### Community Marketplace
Safe trading environment with:
- **Seller verification** and rating system
- **Shipping calculators** for international trades
- **Item condition** standards and photos
- **Q&A system** for buyer questions
- **Integrated trust** through community reputation

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

### Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Frontend**: React 19.1.0 with TypeScript 5
- **Styling**: Tailwind CSS 4 with custom design system
- **Code Quality**: Biome for linting and formatting
- **Build Tool**: Turbopack for fast development builds

### Code Style

This project uses [Biome](https://biomejs.dev/) for consistent code formatting and linting:
- 2-space indentation
- Automatic import organization
- Strict TypeScript configuration
- React and Next.js specific rules

## 🤝 Contributing

We welcome contributions from the mechanical keyboard community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Ways to Contribute

- 🐛 **Bug Reports** - Found an issue? Let us know!
- 💡 **Feature Requests** - Have an idea? We'd love to hear it!
- 🔧 **Code Contributions** - Submit PRs for fixes and features
- 📝 **Documentation** - Help improve our guides and docs
- 🎨 **Design** - UI/UX improvements and suggestions
- 📊 **Data** - Add switches, keycaps, or layout data

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mechanical Keyboard Community** - For inspiration and feedback
- **Switch Manufacturers** - Cherry, Gateron, Kailh, and others
- **Keycap Artisans** - For beautiful designs and craftsmanship
- **Open Source Contributors** - Making this project possible

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Wiki](https://github.com/1oosedows/keyboard-configurator/wiki)
- **Issues**: [Bug Reports & Feature Requests](https://github.com/1oosedows/keyboard-configurator/issues)
- **Discussions**: [Community Discussions](https://github.com/1oosedows/keyboard-configurator/discussions)

## 📞 Support

- 📧 **Email**: [Create an issue](https://github.com/1oosedows/keyboard-configurator/issues/new)
- 💬 **Discord**: [Join our community](https://discord.gg/keyboards) *(Coming Soon)*
- 📖 **Documentation**: [Project Wiki](https://github.com/1oosedows/keyboard-configurator/wiki)

---

<div align="center">

**Built with ❤️ for the mechanical keyboard community**

[⭐ Star this repo](https://github.com/1oosedows/keyboard-configurator) • [🐛 Report Bug](https://github.com/1oosedows/keyboard-configurator/issues) • [💡 Request Feature](https://github.com/1oosedows/keyboard-configurator/issues)

</div>