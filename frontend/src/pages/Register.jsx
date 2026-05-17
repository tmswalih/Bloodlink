import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Register({ toggleSidebar }) {
  const [type, setType] = useState('donor');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', blood_group: 'A+', address: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const endpoint = type === 'donor' ? '/auth/donor/register' : '/auth/hospital/register';
      await api.post(endpoint, formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem' }}>
      <button className="menu-btn" onClick={toggleSidebar} style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="30" height="30">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      </button>

      <div className="card" style={{ width: '100%', maxWidth: '480px', margin: '0', position: 'relative' }}>
        <Link to="/" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none' }}>
          ← Back
        </Link>

        <div className="header" style={{ marginBottom: '1.5rem', padding: '2.5rem 0 0.5rem 0', borderBottom: 'none', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2.2rem' }}>Create Account</h1>
        </div>
        
        {error && <div style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#FF6B6B', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '500' }}>{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Register As</label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="donor">🩸 Blood Donor</option>
              <option value="hospital">🏥 Hospital / Blood Bank</option>
            </select>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label>Full Name / Hospital Name</label>
              <input type="text" name="name" placeholder="Enter name" onChange={handleChange} required />
            </div>
            
            <div className="input-group" style={{ gridColumn: '1 / -1' }}>
              <label>Email Address</label>
              <input type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            </div>
            
            <div className="input-group" style={{ gridColumn: type === 'donor' ? '1 / 2' : '1 / -1' }}>
              <label>Password</label>
              <input type="password" name="password" placeholder="Create a password" onChange={handleChange} required />
            </div>
            
            {type === 'donor' && (
              <div className="input-group" style={{ gridColumn: '2 / 3' }}>
                <label>Blood Group</label>
                <select name="blood_group" onChange={handleChange}>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {type === 'hospital' && (
            <div className="input-group">
              <label>Full Address</label>
              <textarea name="address" placeholder="Enter complete address" rows="3" onChange={handleChange} required />
            </div>
          )}

          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up ->'}
          </button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: '600' }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
