import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login({ toggleSidebar }) {
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
      window.location.reload(); // Refresh to update sidebar links after login
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
      <button className="menu-btn" onClick={toggleSidebar} style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <div className="card" style={{ width: '100%', maxWidth: '420px', margin: '0', position: 'relative' }}>
        <Link to="/" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none' }}>
          ← Back
        </Link>
        
        <div className="header" style={{ marginBottom: '1.5rem', padding: '2.5rem 0 0.5rem 0', borderBottom: 'none', justifyContent: 'center' }}>
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
