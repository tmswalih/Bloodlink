import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('donor');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const endpoint = type === 'donor' ? '/auth/donor/login' : '/auth/hospital/login';
      const res = await api.post(endpoint, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({ name: res.data.name, id: res.data.id, type }));
      
      if (type === 'donor') navigate('/donor-dashboard');
      else navigate('/hospital-dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', margin: '0' }}>
        <div className="header" style={{ marginBottom: '1.5rem', padding: '0', borderBottom: 'none', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2.2rem' }}>Welcome Back</h1>
        </div>
        
        {error && <div style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#FF6B6B', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '500' }}>{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Login As</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="donor">🩸 Blood Donor</option>
              <option value="hospital">🏥 Hospital / Blood Bank</option>
            </select>
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In ->'}
          </button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ fontWeight: '600' }}>Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
