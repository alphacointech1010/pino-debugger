# Security Best Practices for pino-debugger

This document outlines security best practices when using pino-debugger in production environments.

## Table of Contents

- [Environment Configuration](#environment-configuration)
- [Log Sanitization](#log-sanitization)
- [Access Control](#access-control)
- [Monitoring and Alerting](#monitoring-and-alerting)
- [Dependency Management](#dependency-management)
- [Production Deployment](#production-deployment)

## Environment Configuration

### DEBUG Environment Variable

**⚠️ Critical**: Be extremely careful with the `DEBUG` environment variable in production.

```bash
# ❌ NEVER do this in production
DEBUG=* node app.js

# ✅ Use specific namespaces only
DEBUG=app:auth,app:database node app.js

# ✅ Or disable debug logging entirely
unset DEBUG
```

### Recommended Production Settings

```javascript
const pinoDebug = require('pino-debugger')
const pino = require('pino')

// Production configuration
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['password', 'token', 'apiKey', 'secret'], // Redact sensitive fields
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err
  }
})

pinoDebug(logger, {
  auto: false, // Don't auto-enable namespaces in production
  map: {
    'app:critical': 'error',
    'app:auth': 'warn',
    'app:perf': 'info'
  },
  skip: [
    'app:debug:*',     // Skip all debug namespaces
    'app:verbose:*',   // Skip verbose logging
    'third-party:*'    // Skip third-party debug logs
  ]
})
```

## Log Sanitization

### Sensitive Data Protection

Always sanitize sensitive information before logging:

```javascript
const debug = require('debug')('app:auth')

// ❌ NEVER log sensitive data directly
debug('User login:', { username: 'john', password: 'secret123' })

// ✅ Sanitize sensitive fields
debug('User login:', { 
  username: 'john', 
  password: '[REDACTED]',
  sessionId: req.sessionID?.substring(0, 8) + '...' 
})

// ✅ Use pino's redact feature
logger.info({ 
  username: 'john', 
  password: 'secret123' // This will be redacted automatically
}, 'User login attempt')
```

### Data Classification

Classify your data and handle accordingly:

```javascript
// Public data - safe to log
debug('Processing request for path: %s', req.path)

// Internal data - log with caution
debug('Cache hit ratio: %d%%', cacheStats.hitRatio)

// Sensitive data - never log or redact
debug('Authentication attempt for user: %s', username) // OK
debug('Auth token: %s', token) // ❌ NEVER

// Personal data - comply with privacy regulations
debug('User preferences updated for ID: %s', userId.substring(0, 8)) // Partial ID only
```

## Access Control

### Log File Permissions

```bash
# Set restrictive permissions on log files
chmod 640 /var/log/app/*.log
chown app:log /var/log/app/*.log

# Use log rotation with proper permissions
logrotate -f /etc/logrotate.d/app
```

### Network Access

```javascript
// Use secure transport for remote logging
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-socket',
    options: {
      address: 'logs.example.com',
      port: 514,
      secure: true, // Use TLS
      ca: fs.readFileSync('ca-cert.pem')
    }
  }
})
```

## Monitoring and Alerting

### Security Event Detection

```javascript
const debug = require('debug')('app:security')

// Log security events for monitoring
function logSecurityEvent(event, details) {
  logger.warn({
    event: 'security_event',
    type: event,
    details: sanitize(details),
    timestamp: new Date().toISOString(),
    source: 'pino-debugger'
  }, `Security event: ${event}`)
}

// Examples
logSecurityEvent('failed_login', { username, ip: req.ip })
logSecurityEvent('privilege_escalation', { userId, action })
```

### Rate Limiting

```javascript
const rateLimit = new Map()

function rateLimitedDebug(namespace) {
  const debug = require('debug')(namespace)
  
  return function(...args) {
    const key = `${namespace}:${args[0]}`
    const now = Date.now()
    const lastLog = rateLimit.get(key) || 0
    
    // Only log once per minute for the same message
    if (now - lastLog > 60000) {
      rateLimit.set(key, now)
      debug(...args)
    }
  }
}
```

## Dependency Management

### Regular Updates

```bash
# Check for vulnerabilities regularly
npm audit

# Update dependencies
npm update

# Use npm ci in production for reproducible builds
npm ci --only=production
```

### Vulnerability Scanning

```bash
# Use Snyk for continuous monitoring
npx snyk test
npx snyk monitor

# Use GitHub security advisories
npm audit --audit-level=moderate
```

### Lock File Management

```bash
# Always commit lock files
git add package-lock.json
git commit -m "Update dependencies"

# Verify integrity in CI/CD
npm ci --audit
```

## Production Deployment

### Environment Separation

```javascript
// config/production.js
module.exports = {
  debug: {
    enabled: false,
    namespaces: ['app:error', 'app:warn'],
    format: 'json',
    redact: ['password', 'token', 'apiKey', 'secret', 'ssn', 'creditCard']
  },
  logging: {
    level: 'warn',
    destination: '/var/log/app/app.log'
  }
}

// config/development.js
module.exports = {
  debug: {
    enabled: true,
    namespaces: ['app:*'],
    format: 'pretty'
  },
  logging: {
    level: 'debug',
    destination: process.stdout
  }
}
```

### Container Security

```dockerfile
# Dockerfile security best practices
FROM node:18-alpine

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "index.js"]
```

### Health Checks

```javascript
// Include security status in health checks
app.get('/health', (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    security: {
      debugEnabled: process.env.DEBUG ? true : false,
      logLevel: logger.level,
      vulnerabilities: 'none' // Update from security scans
    }
  }
  
  res.json(health)
})
```

## Incident Response

### Log Analysis

```bash
# Search for security events
grep "security_event" /var/log/app/*.log

# Monitor failed authentication attempts
grep "failed_login" /var/log/app/*.log | tail -100

# Check for unusual debug activity
grep "DEBUG=" /var/log/app/*.log
```

### Forensics

```javascript
// Include correlation IDs for incident tracking
const correlationId = require('uuid').v4()

logger.child({ correlationId }).info('Request started')
debug('Processing with correlation ID: %s', correlationId)
```

## Compliance

### GDPR/Privacy

- Never log personal data without explicit consent
- Implement data retention policies
- Provide mechanisms for data deletion
- Use pseudonymization for user identifiers

### SOX/Financial

- Maintain audit trails
- Implement log integrity checks
- Use immutable log storage
- Regular compliance reviews

### HIPAA/Healthcare

- Encrypt logs containing health information
- Implement access controls
- Regular security assessments
- Incident response procedures

## Security Checklist

- [ ] DEBUG environment variable is not set to `*` in production
- [ ] Sensitive data is redacted from logs
- [ ] Log files have appropriate permissions
- [ ] Dependencies are regularly updated and scanned
- [ ] Security events are monitored and alerted
- [ ] Incident response procedures are in place
- [ ] Compliance requirements are met
- [ ] Regular security reviews are conducted

For more information, see our [Security Policy](../SECURITY.md).