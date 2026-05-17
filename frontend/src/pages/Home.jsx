import { Link } from 'react-router-dom';

function Home({ toggleSidebar }) {
  return (
    <div className="home-container">
      <nav className="header">
        <div className="left-nav">
          <button className="menu-btn" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <div className="logo-section">
            <div className="drop-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M12 2.5s-7 7.5-7 11.5c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4-7-11.5-7-11.5z" />
              </svg>
            </div>
            <div>
              <h1>BloodLink</h1>
              <p className="subtitle">Blood Donation Management</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content text-center">
          <div className="main-drop-icon">
            <div className="drop-wrapper">
              <svg viewBox="0 0 24 24" fill="#D00000" width="64" height="64">
                <path d="M12 2.5s-7 7.5-7 11.5c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4-7-11.5-7-11.5z" />
              </svg>
            </div>
          </div>
          
          <h2 className="display-headline">
            Connecting Donors with <br />
            Hospitals to <span className="text-highlight">Save Lives</span>
          </h2>
          
          <p className="hero-description">
            Join our community of lifesavers. Register as a donor or hospital to <br />
            make blood donation simple, efficient, and impactful.
          </p>

          <div className="cta-group">
            <Link to="/login" className="btn btn-primary">
              Login →
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register →
            </Link>
          </div>
        </div>
      </main>

      <style>{`
        .home-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .left-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .menu-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .menu-btn:hover {
          background: rgba(139, 0, 0, 0.05);
          color: var(--blood-red-bright);
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-section h1 {
          font-size: 1.5rem;
          margin-bottom: -4px;
        }

        .subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin: 0;
          font-weight: 500;
        }

        .drop-icon {
          color: var(--blood-red-bright);
          background: rgba(139, 0, 0, 0.05);
          padding: 8px;
          border-radius: 12px;
        }

        .hero-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .main-drop-icon {
          margin-bottom: 2rem;
          display: inline-block;
        }

        .drop-wrapper {
          background: rgba(139, 0, 0, 0.05);
          padding: 2rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .display-headline {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: #1A0505;
          font-weight: 800;
          letter-spacing: -2px;
        }

        .text-highlight {
          color: var(--blood-red-bright);
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 800px;
          margin: 0 auto 3rem auto;
          line-height: 1.6;
        }

        .cta-group {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .cta-group .btn {
          width: auto;
          min-width: 180px;
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #F0F0F0;
          color: var(--text-primary);
          box-shadow: none;
        }

        .btn-outline:hover {
          background: #F8F9FA;
          border-color: #E0E0E0;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }

        .icon {
          margin-right: 8px;
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .display-headline {
            font-size: 2.5rem;
          }
          .hero-description {
            font-size: 1.1rem;
          }
          .cta-group {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
