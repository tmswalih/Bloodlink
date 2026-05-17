import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onClose();
    navigate('/');
    window.location.reload(); // Force reload to refresh auth state
  };

  const dashboardPath = user.type === 'donor' ? '/donor-dashboard' : '/hospital-dashboard';

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <svg viewBox="0 0 24 24" fill="#D00000" width="24" height="24">
              <path d="M12 2.5s-7 7.5-7 11.5c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4-7-11.5-7-11.5z" />
            </svg>
            BloodLink
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className="nav-item" style={({isActive}) => isActive ? {background: 'rgba(139, 0, 0, 0.1)', color: 'var(--blood-red-bright)'} : {}} onClick={onClose}>
            🏠 Home
          </NavLink>
          
          {token && (
            <NavLink to={dashboardPath} className="nav-item" style={({isActive}) => isActive ? {background: 'rgba(139, 0, 0, 0.1)', color: 'var(--blood-red-bright)'} : {}} onClick={onClose}>
              📊 Dashboard
            </NavLink>
          )}

          <NavLink to="/about-us" className="nav-item" style={({isActive}) => isActive ? {background: 'rgba(139, 0, 0, 0.1)', color: 'var(--blood-red-bright)'} : {}} onClick={onClose}>
            ℹ️ About Us
          </NavLink>
        </nav>

        {token && (
          <div className="sidebar-footer" style={{ marginTop: '2rem' }}>
            <button className="nav-item logout-btn" onClick={handleLogout} style={{ border: 'none', cursor: 'pointer' }}>
              🚪 Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
