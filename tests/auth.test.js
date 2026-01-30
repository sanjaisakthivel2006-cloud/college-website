import fs from 'fs';
import path from 'path';

console.log('🧪 Starting Authentication Tests...\n');

const tests = {
    passed: 0,
    failed: 0,
    results: []
};

function test(name, condition) {
    if (condition) {
        tests.passed++;
        tests.results.push(`✅ ${name}`);
    } else {
        tests.failed++;
        tests.results.push(`❌ ${name}`);
    }
}

async function runTests() {
    // Test 1: Check Firebase config exists
    try {
        const configExists = fs.existsSync('./services/firebase.ts');
        test('Firebase config file exists (services/firebase.ts)', configExists);
    } catch (e) {
        test('Firebase config file exists', false);
    }

    // Test 2: Check AuthContext exists
    try {
        const authContextExists = fs.existsSync('./contexts/AuthContext.tsx');
        test('AuthContext file exists (contexts/AuthContext.tsx)', authContextExists);
    } catch (e) {
        test('AuthContext file exists', false);
    }

    // Test 3: Check SignIn page exists
    try {
        const signInExists = fs.existsSync('./pages/SignIn.tsx');
        test('SignIn page exists (pages/SignIn.tsx)', signInExists);
    } catch (e) {
        test('SignIn page exists', false);
    }

    // Test 4: Check SignUp page exists
    try {
        const signUpExists = fs.existsSync('./pages/SignUp.tsx');
        test('SignUp page exists (pages/SignUp.tsx)', signUpExists);
    } catch (e) {
        test('SignUp page exists', false);
    }

    // Test 5: Check ProtectedRoute exists
    try {
        const protectedRouteExists = fs.existsSync('./components/ProtectedRoute.tsx');
        test('ProtectedRoute component exists', protectedRouteExists);
    } catch (e) {
        test('ProtectedRoute component exists', false);
    }

    // Test 6: Check environment variables
    try {
        const envExists = fs.existsSync('./.env.local') || fs.existsSync('./.env');
        test('Environment file exists', envExists);

        if (envExists) {
            const envContent = fs.readFileSync(fs.existsSync('./.env.local') ? './.env.local' : './.env', 'utf8');
            test('Environment file contains Firebase keys', envContent.includes('VITE_FIREBASE_API_KEY'));
        }
    } catch (e) {
        test('Environment file exists', false);
    }

    // Test 7: Check index.tsx imports AuthProvider
    try {
        const indexContent = fs.readFileSync('./index.tsx', 'utf8');
        test('index.tsx imports AuthProvider', indexContent.includes('AuthProvider'));
    } catch (e) {
        test('index.tsx content check', false);
    }

    // Print results
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    tests.results.forEach(r => console.log(r));
    console.log('================');
    console.log(`Total: ${tests.passed + tests.failed} | Passed: ${tests.passed} | Failed: ${tests.failed}`);

    if (tests.failed > 0) {
        console.log('\n⚠️  Some tests failed. Please fix issues before proceeding.');
        process.exit(1);
    } else {
        console.log('\n🎉 All tests passed! Authentication setup is complete.');
    }
}

runTests().catch(console.error);
