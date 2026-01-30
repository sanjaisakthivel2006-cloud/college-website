const fs = require('fs');

console.log('🧪 Testing Task D1: Enhanced Error Handling\n');
console.log('='.repeat(50));

const tests = [];

function test(name, condition, details = '') {
    tests.push({ name, pass: condition, details });
    const icon = condition ? '✅' : '❌';
    console.log(`${icon} ${name}`);
    if (!condition && details) console.log(`   └─ ${details}`);
}

// Check SignIn.tsx error handling
try {
    const signInContent = fs.readFileSync('./pages/SignIn.tsx', 'utf8');

    test('SignIn: Has error state',
        signInContent.includes("setError"));

    test('SignIn: Has loading state',
        signInContent.includes("setLoading"));

    test('SignIn: Error map pattern',
        signInContent.includes('errorMessages') || signInContent.includes('Record<string, string>'));

    test('SignIn: Handles user-not-found',
        signInContent.includes('auth/user-not-found'));

    test('SignIn: Handles wrong-password',
        signInContent.includes('auth/wrong-password'));

    test('SignIn: Handles network error',
        signInContent.includes('auth/network-request-failed'));

    test('SignIn: Handles invalid-credential (Firebase v9+)',
        signInContent.includes('auth/invalid-credential'));

    test('SignIn: Default error fallback',
        signInContent.includes('Failed to log in'));

} catch (e) {
    test('SignIn.tsx exists', false, e.message);
}

// Check SignUp.tsx error handling
try {
    const signUpContent = fs.readFileSync('./pages/SignUp.tsx', 'utf8');

    test('SignUp: Has error state',
        signUpContent.includes("setError"));

    test('SignUp: Handles email-already-in-use',
        signUpContent.includes('auth/email-already-in-use'));

    test('SignUp: Handles weak-password',
        signUpContent.includes('auth/weak-password'));

} catch (e) {
    test('SignUp.tsx exists', false, e.message);
}

// Check AuthContext for non-blocking Firestore
try {
    const authContent = fs.readFileSync('./contexts/AuthContext.tsx', 'utf8');

    test('AuthContext: Try-catch in signup',
        authContent.includes('try') && authContent.includes('createUserWithEmailAndPassword'));

} catch (e) {
    test('AuthContext.tsx exists', false, e.message);
}

console.log('\n' + '='.repeat(50));

const passed = tests.filter(t => t.pass).length;
const failed = tests.filter(t => !t.pass).length;

console.log(`📊 Results: ${passed}/${tests.length} tests passed`);

if (failed === 0) {
    console.log('\n🎉 Task D1 validated successfully!');
    fs.unlinkSync(__filename);
    console.log('🧹 Test script cleaned up.');
    process.exit(0);
} else {
    console.log('\n❌ Some tests failed. Please review.');
    process.exit(1);
}
