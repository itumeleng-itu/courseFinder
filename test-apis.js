/**
 * API Testing Script for CourseFinder
 * Tests all API endpoints to ensure they're working properly
 */

const BASE_URL = 'http://localhost:3000'

// ANSI color codes for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`)
}

async function testEndpoint(name, url, options = {}) {
    log(`\n📡 Testing: ${name}`, 'cyan')
    log(`   URL: ${url}`, 'blue')

    try {
        const startTime = Date.now()
        const response = await fetch(url, options)
        const duration = Date.now() - startTime

        const contentType = response.headers.get('content-type')
        let data

        if (contentType && contentType.includes('application/json')) {
            data = await response.json()
        } else {
            data = await response.text()
        }

        if (response.ok) {
            log(`   ✅ Status: ${response.status} ${response.statusText}`, 'green')
            log(`   ⏱️  Duration: ${duration}ms`, 'green')
            log(`   📦 Response: ${JSON.stringify(data).substring(0, 200)}...`, 'green')
            return { success: true, status: response.status, data, duration }
        } else {
            log(`   ⚠️  Status: ${response.status} ${response.statusText}`, 'yellow')
            log(`   ⏱️  Duration: ${duration}ms`, 'yellow')
            log(`   📦 Response: ${JSON.stringify(data).substring(0, 200)}...`, 'yellow')
            return { success: false, status: response.status, data, duration }
        }
    } catch (error) {
        log(`   ❌ Error: ${error.message}`, 'red')
        return { success: false, error: error.message }
    }
}

async function runTests() {
    log('\n🚀 Starting API Tests for CourseFinder\n', 'cyan')
    log('='.repeat(60), 'blue')

    const results = []

    // Test GET endpoints
    log('\n📋 Testing GET Endpoints', 'cyan')
    log('='.repeat(60), 'blue')

    results.push(await testEndpoint(
        'News API',
        `${BASE_URL}/api/news`
    ))

    results.push(await testEndpoint(
        'Bursaries API',
        `${BASE_URL}/api/bursaries`
    ))

    results.push(await testEndpoint(
        'Provincial Pass Rates API (Gauteng)',
        `${BASE_URL}/api/provincial-pass-rates?province=Gauteng&years=5`
    ))

    results.push(await testEndpoint(
        'Provincial Pass Rates API (Western Cape)',
        `${BASE_URL}/api/provincial-pass-rates?province=Western%20Cape&years=3`
    ))

    results.push(await testEndpoint(
        'Matric Pass Rates News API',
        `${BASE_URL}/api/matric-pass-rates-news`
    ))

    // Test POST endpoints
    log('\n📋 Testing POST Endpoints', 'cyan')
    log('='.repeat(60), 'blue')

    results.push(await testEndpoint(
        'Chat API',
        `${BASE_URL}/api/chat`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: 'What are the requirements for studying engineering?',
                conversationHistory: []
            })
        }
    ))

    // Summary
    log('\n' + '='.repeat(60), 'blue')
    log('📊 Test Summary', 'cyan')
    log('='.repeat(60), 'blue')

    const passed = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    log(`\n✅ Passed: ${passed}`, 'green')
    log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green')
    log(`📈 Total: ${results.length}`, 'blue')

    const avgDuration = results
        .filter(r => r.duration)
        .reduce((sum, r) => sum + r.duration, 0) / results.filter(r => r.duration).length

    log(`⏱️  Average Response Time: ${avgDuration.toFixed(2)}ms`, 'blue')

    log('\n' + '='.repeat(60), 'blue')

    if (failed > 0) {
        log('\n⚠️  Some tests failed. Check the details above.', 'yellow')
        process.exit(1)
    } else {
        log('\n🎉 All tests passed!', 'green')
        process.exit(0)
    }
}

// Run the tests
runTests().catch(error => {
    log(`\n❌ Fatal Error: ${error.message}`, 'red')
    process.exit(1)
})
