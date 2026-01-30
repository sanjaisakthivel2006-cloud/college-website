import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, authLoading, navigate]);

    // Show loading while checking auth state
    if (authLoading) {
        return (
            <div className="auth-container">
                <p>Checking authentication...</p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            console.error('Login error:', err);

            // Comprehensive Firebase error code mapping
            const errorMessages: Record<string, string> = {
                'auth/user-not-found': 'No account found with this email',
                'auth/wrong-password': 'Incorrect password',
                'auth/invalid-email': 'Invalid email address',
                'auth/too-many-requests': 'Too many attempts. Please try again later.',
                'auth/invalid-credential': 'Invalid email or password',
                'auth/user-disabled': 'This account has been disabled',
                'auth/network-request-failed': 'Network error. Please check your connection.',
                'auth/internal-error': 'An internal error occurred. Please try again.',
            };

            setError(errorMessages[err.code] || 'Failed to log in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Welcome Back</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    );
};

export default SignIn;
