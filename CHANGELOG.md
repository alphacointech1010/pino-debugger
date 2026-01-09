# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Format options support for debug-fmt integration
- Comprehensive security documentation (SECURITY.md)
- Contributing guidelines (CONTRIBUTING.md)
- Code of conduct (CODE_OF_CONDUCT.md)
- Changelog documentation

### Changed
- Migrated from direct `debug` module usage to `debug-fmt`
- Enhanced options object to include `format` and `levels` parameters
- Updated documentation with new format options
- Improved test coverage and examples

### Security
- Added security policy and vulnerability reporting procedures
- Enhanced documentation for secure usage patterns
- Improved handling of sensitive data in debug logs

## [4.0.1] - 2024-01-08

### Fixed
- Minor bug fixes and improvements
- Updated dependencies for security patches

## [4.0.0] - 2024-01-01

### Added
- Major version release with breaking changes
- Enhanced performance optimizations
- Improved compatibility with latest Node.js versions

### Changed
- Updated minimum Node.js version requirements
- Refactored internal architecture for better performance
- Updated dependencies to latest stable versions

### Removed
- Deprecated legacy API methods
- Removed support for Node.js versions < 14

## [3.2.1] - 2023-12-15

### Fixed
- Security vulnerability patches
- Memory leak fixes in high-throughput scenarios

## [3.2.0] - 2023-11-20

### Added
- New configuration options for advanced use cases
- Enhanced error handling and reporting
- Improved TypeScript definitions

### Changed
- Performance improvements for large-scale applications
- Better integration with pino ecosystem

## [3.1.0] - 2023-10-10

### Added
- Support for custom log formatters
- Enhanced namespace filtering capabilities
- New benchmarking tools

### Fixed
- Edge cases in circular reference handling
- Memory optimization improvements

## [3.0.0] - 2023-09-01

### Added
- Complete rewrite for better performance
- New API design for improved usability
- Enhanced documentation and examples

### Changed
- Breaking changes in configuration format
- Updated peer dependencies
- Improved error messages and debugging

### Removed
- Legacy configuration options
- Deprecated utility functions

## [2.1.0] - 2023-07-15

### Added
- Support for dynamic namespace enabling/disabling
- New utility functions for log management
- Enhanced integration with CI/CD pipelines

### Fixed
- Race conditions in multi-threaded environments
- Edge cases in log level mapping

## [2.0.0] - 2023-06-01

### Added
- Major performance improvements
- New configuration system
- Enhanced compatibility with latest pino versions

### Changed
- Breaking API changes for better consistency
- Updated minimum Node.js version to 12
- Improved documentation structure

## [1.5.0] - 2023-04-20

### Added
- Support for custom log levels
- Enhanced namespace pattern matching
- New debugging utilities

### Fixed
- Memory leaks in long-running processes
- Compatibility issues with certain pino configurations

## [1.4.0] - 2023-03-10

### Added
- Improved error handling
- New configuration validation
- Enhanced test coverage

### Changed
- Better performance in high-load scenarios
- Updated dependencies for security

## [1.3.0] - 2023-02-01

### Added
- Support for environment-based configuration
- New utility functions
- Enhanced documentation

### Fixed
- Edge cases in namespace resolution
- Performance bottlenecks in certain scenarios

## [1.2.0] - 2023-01-15

### Added
- Initial stable release
- Core functionality implementation
- Basic documentation and examples

### Changed
- Improved API design based on user feedback
- Better integration with existing debug workflows

## [1.1.0] - 2022-12-20

### Added
- Beta release with core features
- Initial documentation
- Basic test suite

## [1.0.0] - 2022-12-01

### Added
- Initial release
- Basic debug logging functionality
- Integration with pino logger

---

## Release Notes

### Version 4.x Series
The 4.x series focuses on enhanced security, better performance, and improved developer experience. Major highlights include the migration to debug-fmt for better formatting options and comprehensive security documentation.

### Version 3.x Series
The 3.x series introduced significant architectural improvements and performance optimizations, making pino-debugger suitable for high-scale production environments.

### Version 2.x Series
The 2.x series established the stable API and core functionality that forms the foundation of pino-debugger.

### Version 1.x Series
The 1.x series was the initial implementation and proof of concept for integrating debug logging with pino's high-performance logging capabilities.

## Migration Guides

### Migrating from 3.x to 4.x
- Update Node.js to version 14 or higher
- Review new format options in configuration
- Update any custom integrations to use new API

### Migrating from 2.x to 3.x
- Update configuration format to new structure
- Replace deprecated utility functions
- Test thoroughly in staging environment

For detailed migration instructions, see the [Migration Guide](docs/MIGRATION.md).