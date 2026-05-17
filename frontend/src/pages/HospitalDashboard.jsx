import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function HospitalDashboard({ toggleSidebar }) {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({ patient_name: '', blood_group_required: 'A+', units_required: 1 });
  const [error, setError] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.type !== 'hospital') {
      navigate('/login');
      return;
    }
    fetchRequests();
  }, [navigate, user]);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/hospitals/requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsPosting(true);
    try {
      await api.post('/hospitals/request', formData);
      setFormData({ patient_name: '', blood_group_required: 'A+', units_required: 1 });
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create request');
    } finally {
      setIsPosting(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '1.5rem 2rem', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button className="menu-btn" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🏥</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>{user?.name}</h1>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Blood Bank & Request Management</p>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', boxShadow: 'none' }}>Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '2rem', alignItems: 'start' }}>
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#00C9FF' }}>+</span> Create Request
          </h2>
          {error && <div style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#FF6B6B', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: '500' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Patient Name</label>
              <input type="text" placeholder="e.g. John Doe" value={formData.patient_name} onChange={e => setFormData({...formData, patient_name: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Blood Group Needed</label>
              <select value={formData.blood_group_required} onChange={e => setFormData({...formData, blood_group_required: e.target.value})}>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Units Required</label>
              <input type="number" min="1" value={formData.units_required} onChange={e => setFormData({...formData, units_required: e.target.value})} required />
            </div>
            <button type="submit" className="btn" style={{width: '100%', marginTop: '1rem'}} disabled={isPosting}>
              {isPosting ? 'Broadcasting...' : 'Broadcast Emergency ->'}
            </button>
          </form>
        </div>

        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#92FE9D' }}>⚡</span> Active Broadcasts
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Patient Details</th>
                  <th>Requirement</th>
                  <th>Status & Donors</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => {
                  const primaryCount = req.acceptances.filter(a => a.status === 'primary').length;
                  const isFulfilled = primaryCount >= req.units_required;
                  return (
                    <tr key={req.id}>
                      <td>
                        <strong style={{ fontSize: '1.1rem' }}>{req.patient_name}</strong><br/>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{new Date(req.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          <span className="badge badge-primary">{req.blood_group_required}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)'}}>{primaryCount}</strong> of {req.units_required} Units Filled</div>
                      </td>
                      <td>
                        <div style={{ marginBottom: '0.5rem' }}>
                          {isFulfilled ? <span className="badge badge-success">Fully Pledged</span> : <span className="badge badge-warning">Awaiting Donors</span>}
                        </div>
                        {req.acceptances.length > 0 && (
                          <div style={{marginTop: '0.5rem', fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px'}}>
                            <strong style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.75rem' }}>Pledged Donors</strong>
                            <ul style={{paddingLeft: '0', margin: '0.5rem 0 0 0', listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                              {req.acceptances.map(acc => (
                                <li key={acc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span>{acc.name} <span style={{ color: 'var(--text-secondary)' }}>({acc.blood_group})</span></span>
                                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', background: acc.status === 'primary' ? 'rgba(18, 184, 134, 0.2)' : 'rgba(245, 159, 0, 0.2)', color: acc.status === 'primary' ? '#69DB7C' : '#FFD43B' }}>{acc.status}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {requests.length === 0 && <tr><td colSpan="3" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)'}}>No active broadcasts. Press "Broadcast Emergency" to solicit donors.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard;
