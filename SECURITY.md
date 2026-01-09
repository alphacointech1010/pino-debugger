# Security Policy

## Supported Versions

We actively support the following versions of pino-debugger with security updates:

| Version | Supported          | Security Status |
| ------- | ------------------ | --------------- |
| 1.x.x   | :white_check_mark: | ✅ Zero known vulnerabilities |
| 0.x.x   | :x:                | ❌ Not supported |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in pino-debugger, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Send an email to the maintainers at: security@alphacointech1010.io
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Any suggested fixes (if available)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 5 business days
- **Updates**: We will keep you informed of our progress throughout the investigation
- **Resolution**: We aim to resolve critical vulnerabilities within 30 days
- **Disclosure**: We will coordinate with you on responsible disclosure timing

### Security Best Practices

When using pino-debugger:

1. **Keep Dependencies Updated**: Regularly update pino-debugger and its dependencies
2. **Environment Variables**: Be careful with DEBUG environment variable in production
3. **Log Sanitization**: Ensure sensitive data is not logged through debug statements
4. **Access Control**: Restrict access to debug logs in production environments
5. **Monitoring**: Monitor for unusual debug activity in production systems

### Security Features

- **Zero Known Vulnerabilities**: Current version has no known security vulnerabilities
- **Minimal Dependencies**: Only essential dependencies (pino) to reduce attack surface
- **Safe Circular References**: Unlike the standard debug module, pino-debugger safely handles circular references
- **Structured Logging**: JSON output format reduces log injection risks
- **Namespace Isolation**: Debug namespaces provide controlled logging scope
- **Production Ready**: Designed for safe use in production environments
- **Regular Security Audits**: Automated vulnerability scanning and dependency updates

### Vulnerability Disclosure Timeline

1. **Day 0**: Vulnerability reported
2. **Day 1-2**: Acknowledgment sent
3. **Day 3-7**: Initial assessment and triage
4. **Day 8-30**: Investigation and fix development
5. **Day 30+**: Coordinated disclosure and patch release

## Security Contacts

- Primary: security@alphacointech1010.io
- Backup: maintainers listed in package.json

Thank you for helping keep pino-debugger secure!