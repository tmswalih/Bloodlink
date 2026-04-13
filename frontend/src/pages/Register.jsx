import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Register() {
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px', margin: '0' }}>
        <div className="header" style={{ marginBottom: '1.5rem', padding: '0', borderBottom: 'none', justifyContent: 'center' }}>
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
