# Contributing to pino-debugger

Thank you for your interest in contributing to pino-debugger! This document provides guidelines and information for contributors.

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the issue template** if available
3. **Provide clear reproduction steps**
4. **Include environment information** (Node.js version, OS, etc.)

### Security Issues

**Do not report security vulnerabilities through public GitHub issues.** Please see our [Security Policy](SECURITY.md) for responsible disclosure procedures.

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Run the test suite**: `npm test`
6. **Update documentation** if needed
7. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js (see package.json for supported versions)
- npm or yarn

### Installation

```bash
git clone https://github.com/alphacointech1010/pino-debugger.git
cd pino-debugger
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:unit

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run benchmarks
npm run bench
```

### Project Structure

```
pino-debugger/
├── index.js          # Main entry point
├── debug.js          # Debug function implementation
├── test/             # Test files
├── benchmarks/       # Performance benchmarks
├── README.md         # Project documentation
├── SECURITY.md       # Security policy
└── package.json      # Package configuration
```

## Coding Standards

### Style Guide

- Follow the existing code style
- Use ESLint configuration provided
- Write clear, descriptive variable names
- Add comments for complex logic

### Testing

- Write tests for all new features
- Maintain or improve test coverage
- Use descriptive test names
- Test both success and error cases

### Documentation

- Update README.md for API changes
- Add JSDoc comments for new functions
- Update examples if behavior changes
- Keep documentation clear and concise

## Commit Guidelines

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

```
feat(api): add format option for debug-fmt integration

fix(debug): handle circular references in log objects

docs(readme): update usage examples with format option
```

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release PR
4. Tag release after merge
5. Publish to npm

## Performance Considerations

- Benchmark new features
- Avoid breaking changes in performance
- Consider memory usage impact
- Test with large-scale scenarios

## Dependencies

### Adding Dependencies

- Justify new dependencies
- Prefer well-maintained packages
- Check for security vulnerabilities
- Update package.json appropriately

### Updating Dependencies

- Test thoroughly after updates
- Check for breaking changes
- Update documentation if needed
- Run full test suite

## Getting Help

- Check existing documentation
- Search closed issues
- Ask questions in discussions
- Contact maintainers if needed

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Package.json contributors field

## License

By contributing to pino-debugger, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to pino-debugger! 🎉