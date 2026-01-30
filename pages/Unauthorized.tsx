import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div className="auth-container">
            <h2>Access Denied</h2>
            <p>You don't have permission to access this page.</p>
            <p>
                <Link to="/">Return to Home</Link>
            </p>
        </div>
    );
};

export default Unauthorized;
