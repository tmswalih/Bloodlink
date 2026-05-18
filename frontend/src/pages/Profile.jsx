import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ toggleSidebar }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-wrapper" style={{ minHeight: '100vh', background: 'var(--bg-gradient)', padding: '0', display: 'flex', flexDirection: 'column' }}>
      {/* Dynamic Header */}
      <div className="header" style={{ position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.8)', borderBottom: '1px solid var(--glass-border)', margin: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          <button className="menu-btn" onClick={toggleSidebar} style={{ background: 'var(--primary-gradient)', border: 'none', cursor: 'pointer', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 12px rgba(139, 0, 0, 0.2)' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Account Settings</h1>
        </div>
      </div>

      <main style={{ flex: 1, padding: '2rem', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', alignItems: 'start' }}>

          {/* Profile Sidebar Info */}
          <div className="card" style={{ padding: '2.5rem', textAlign: 'center', position: 'sticky', top: '100px' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '40px',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                color: 'white',
                boxShadow: '0 20px 40px rgba(139, 0, 0, 0.2)',
                transform: 'rotate(-5deg)',
                margin: '0 auto'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                background: '#4CAF50',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}></div>
            </div>

            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>{user.name}</h2>
            <div className="badge badge-primary" style={{ marginBottom: '2rem' }}>
              {user.type === 'donor' ? 'Verified Donor' : 'Hospital Provider'}
            </div>

            <div style={{ textAlign: 'left', background: 'rgba(139, 0, 0, 0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(139, 0, 0, 0.05)' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status</p>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--blood-red-deep)' }}>Active & Eligible</p>
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Quick Stats/Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(139, 0, 0, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--blood-red-bright)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Total Donations</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>12 Units</div>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(255, 193, 7, 0.1)', padding: '12px', borderRadius: '12px', color: '#B8860B' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Points Earned</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>850 XP</div>
                </div>
              </div>
            </div>

            {/* General Information */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--blood-red-deep)' }}>General Information</h3>
                <button style={{ background: 'none', border: 'none', color: 'var(--blood-red-bright)', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>Edit Records</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                <div className="info-item">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Full Identity Name</label>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{user.name}</div>
                </div>

                <div className="info-item">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Electronic Mail</label>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{user.email}</div>
                </div>

                {user.type === 'donor' && (
                  <div className="info-item">
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Blood Classification</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        fontSize: '1.2rem',
                        fontWeight: 900,
                        color: 'white',
                        background: 'var(--primary-gradient)',
                        width: '45px',
                        height: '45px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(139, 0, 0, 0.2)'
                      }}>
                        {user.blood_group}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Universal Match</span>
                    </div>
                  </div>
                )}

                {user.type === 'hospital' && (
                  <div className="info-item" style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Facility Address</label>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, background: '#f8f9fa', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid var(--blood-red-bright)' }}>{user.address}</div>
                  </div>
                )}

                <div className="info-item">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Member Since</label>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>May 2024</div>
                </div>
              </div>
            </div>

            {/* Security Section (Placeholder for "Clear" display) */}
            <div className="card" style={{ padding: '2rem', border: '1px dashed rgba(139, 0, 0, 0.2)', background: 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#eee', padding: '10px', borderRadius: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>Secure your account</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enable 2FA for enhanced protection</p>
                  </div>
                </div>
                <button className="btn" style={{ width: 'auto', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>Enable NoW</button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <style>{`
        @keyframes profileFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .profile-wrapper main > div > * {
          animation: profileFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        .profile-wrapper main > div > *:nth-child(2) {
          animation-delay: 0.1s;
        }

        .info-item {
          transition: transform 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateX(5px);
        }
      `}</style>
    </div>
  );
}

export default Profile;
