#!/usr/bin/env node

/**
 * Security validation script for pino-debugger
 * Checks for common security issues and best practices
 */

const fs = require('fs')

console.log('🔒 Running security validation for pino-debugger...\n')

// Check 1: Verify security documentation exists
function checkSecurityDocs () {
  const requiredFiles = [
    'SECURITY.md',
    'CONTRIBUTING.md',
    'CODE_OF_CONDUCT.md',
    'docs/SECURITY_BEST_PRACTICES.md'
  ]

  const missing = requiredFiles.filter(file => !fs.existsSync(file))

  if (missing.length === 0) {
    console.log('✅ All security documentation files present')
    return true
  } else {
    console.log('❌ Missing security documentation:', missing.join(', '))
    return false
  }
}

// Check 2: Verify package.json security metadata
function checkPackageJsonSecurity () {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

  const hasSecurityScripts = pkg.scripts &&
    pkg.scripts['security:audit'] &&
    pkg.scripts['security:check']

  const hasSecurityMetadata = pkg.security &&
    pkg.security.policy &&
    pkg.security.contact

  if (hasSecurityScripts && hasSecurityMetadata) {
    console.log('✅ Package.json has security scripts and metadata')
    return true
  } else {
    console.log('❌ Package.json missing security configuration')
    return false
  }
}

// Check 3: Verify GitHub security templates (optional)
function checkGitHubTemplates () {
  const requiredTemplates = [
    '.github/ISSUE_TEMPLATE/bug_report.md',
    '.github/ISSUE_TEMPLATE/feature_request.md',
    '.github/PULL_REQUEST_TEMPLATE.md'
  ]

  const optionalTemplates = [
    '.github/workflows/security-simple.yml'
  ]

  const missing = requiredTemplates.filter(file => !fs.existsSync(file))
  const missingOptional = optionalTemplates.filter(file => !fs.existsSync(file))

  if (missing.length === 0) {
    console.log('✅ All required GitHub security templates present')
    if (missingOptional.length > 0) {
      console.log('ℹ️  Optional templates missing:', missingOptional.join(', '))
    }
    return true
  } else {
    console.log('❌ Missing required GitHub templates:', missing.join(', '))
    return false
  }
}

// Check 4: Verify Snyk configuration
function checkSnykConfig () {
  if (fs.existsSync('.snyk')) {
    console.log('✅ Snyk configuration file present')
    return true
  } else {
    console.log('❌ Missing .snyk configuration file')
    return false
  }
}

// Check 5: Verify no sensitive data in code
function checkSensitiveData () {
  const sensitivePatterns = [
    /password\s*=\s*['"][^'"]+['"]/i,
    /api[_-]?key\s*=\s*['"][^'"]+['"]/i,
    /secret\s*=\s*['"][^'"]+['"]/i,
    /token\s*=\s*['"][^'"]+['"]/i
  ]

  const filesToCheck = ['index.js', 'debug.js', 'test.js']
  let foundSensitive = false

  filesToCheck.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')
      sensitivePatterns.forEach(pattern => {
        if (pattern.test(content)) {
          console.log(`❌ Potential sensitive data found in ${file}`)
          foundSensitive = true
        }
      })
    }
  })

  if (!foundSensitive) {
    console.log('✅ No sensitive data patterns found in source code')
    return true
  }

  return false
}

// Check 6: Verify dependencies are up to date
function checkDependencyFreshness () {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const lockExists = fs.existsSync('package-lock.json')

    if (lockExists && pkg.dependencies) {
      console.log('✅ Package lock file exists for reproducible builds')
      return true
    } else {
      console.log('❌ Missing package-lock.json or dependencies')
      return false
    }
  } catch (error) {
    console.log('❌ Error checking dependencies:', error.message)
    return false
  }
}

// Run all checks
async function runSecurityChecks () {
  const results = [
    checkSecurityDocs(),
    checkPackageJsonSecurity(),
    checkGitHubTemplates(),
    checkSnykConfig(),
    checkSensitiveData(),
    checkDependencyFreshness()
  ]

  const passed = results.filter(Boolean).length
  const total = results.length

  console.log(`\n📊 Security Check Results: ${passed}/${total} checks passed`)

  if (passed === total) {
    console.log('🎉 All security checks passed! Project is ready for improved Snyk score.')
    process.exit(0)
  } else {
    console.log('⚠️  Some security checks failed. Please address the issues above.')
    process.exit(1)
  }
}

// Run the checks
runSecurityChecks().catch(error => {
  console.error('❌ Security check failed:', error)
  process.exit(1)
})
