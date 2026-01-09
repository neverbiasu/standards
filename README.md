# Engineering Standards

A comprehensive, multi-language engineering standards repository designed for sustainability, scalability, and professional excellence.

## 📋 Overview

This repository contains opinionated but pragmatic coding standards and configurations that teams can adopt to maintain code quality and consistency across projects.

## 🗂️ Available Standards

### [TypeScript](./typescript/README.md)

A strict TypeScript style guide based on Google's TypeScript Style Guide, with carefully considered deviations for modern development practices.

**Quick Links:**
- [Style Guide](./typescript/README.md)
- [ESLint Configuration](./typescript/eslint.config.js)
- [Base TSConfig](./typescript/tsconfig.base.json)

## 🚀 Getting Started

1. **Choose your language**: Navigate to the appropriate directory
2. **Review the guide**: Read the `README.md` to understand the rules
3. **Integrate configurations**: Copy or reference the config files in your project
4. **Enable CI checks**: Set up automated linting in your CI/CD pipeline

## 🤝 Contributing

Standards evolve with technology and team needs. To propose changes:

1. Open an issue describing the rule change and rationale
2. Reference real-world examples where current standards cause friction
3. Discuss tradeoffs with the community
4. Update both documentation and config files in sync

## 📖 Rule Terminology (RFC 2119)

All rules in this repository follow RFC 2119 standard keywords:

- **[MUST]**: Absolute requirement. Violations will cause build failures or code review rejections.
- **[SHOULD]**: Strong recommendation. Should only be deviated from with clear justification.
- **[MAY]**: Optional. Use based on project-specific requirements.

## 🔮 Roadmap

Future language support planned:
- Python
- Rust
- CSS/SCSS
- Go

## 📄 License

MIT License - Feel free to use and adapt for your organization.
