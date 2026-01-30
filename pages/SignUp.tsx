import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/auth.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        studentId: '',
        role: 'STUDENT' as 'STUDENT' | 'ADMIN'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup, isAuthenticated, loading: authLoading } = useAuth();
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
        if (formData.password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        try {
            const { email, password, confirmPassword, ...additionalData } = formData;
            await signup(email, password, additionalData);
            navigate('/');
        } catch (err: any) {
            console.error('Signup error:', err);
            // Map common error codes
            if (err.code === 'auth/email-already-in-use') setError('Email is already registered');
            else if (err.code === 'auth/invalid-email') setError('Invalid email address');
            else if (err.code === 'auth/weak-password') setError('Password is too weak');
            else setError('Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="studentId">Student ID</label>
                    <input
                        type="text"
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">I am a</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="STUDENT">Student</option>
                        <option value="ADMIN">Staff / Administrator</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
        </div>
    );
};

export default SignUp;
