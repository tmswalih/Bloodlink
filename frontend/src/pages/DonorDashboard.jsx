import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function DonorDashboard({ toggleSidebar }) {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.type !== 'donor') {
        navigate('/login');
        return;
    }
    fetchRequests();
  }, [navigate, user]);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/donors/requests');
      setRequests(res.data);
    } catch (err) {
      setError('Failed to fetch requests');
    }
  };

  const handleAccept = async (id) => {
    try {
      setError('');
      setMessage('');
      setIsLoading(true);
      const res = await api.post(`/donors/accept/${id}`);
      setMessage(`Successfully accepted! Status: ${res.data.status}`);
      fetchRequests();
    } catch (err) {
      setError(err.response?.data?.error || 'Error accepting request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid var(--glass-border)', borderRadius: '20px', padding: '1.5rem 2rem', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button className="menu-btn" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🩸</span>
            <div>
              <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Welcome, {user?.name}</h1>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ready to save a life today?</p>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.75rem 1.5rem', boxShadow: 'none' }}>Logout</button>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF6B6B', boxShadow: '0 0 10px #FF6B6B' }}></div>
          Alerts for <span style={{ color: '#FF6B6B', fontWeight: '700' }}>{user?.blood_group}</span>
        </h2>
        {error && <div style={{ background: 'rgba(255, 107, 107, 0.2)', color: '#FF6B6B', padding: '1rem', borderRadius: '12px', margin: '1rem 0', fontWeight: '500' }}>{error}</div>}
        {message && <div style={{ background: 'rgba(18, 184, 134, 0.2)', color: '#69DB7C', padding: '1rem', borderRadius: '12px', margin: '1rem 0', fontWeight: '500' }}>{message}</div>}

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Patient</th>
                <th>Units Needed</th>
                <th>Date Posted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>
                     <strong style={{ fontSize: '1.05rem' }}>{req.hospital_name}</strong><br/>
                     <span style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>{req.hospital_address}</span>
                  </td>
                  <td>{req.patient_name}</td>
                  <td><span className="badge badge-warning">{req.units_required} Units</span></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{new Date(req.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>
                    <button className="btn" onClick={() => handleAccept(req.id)} disabled={isLoading} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                      {isLoading ? 'Accepting...' : 'Accept Request'}
                    </button>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan="5" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)'}}>No pending urgent requests for {user?.blood_group} right now. You're a hero in waiting!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;
