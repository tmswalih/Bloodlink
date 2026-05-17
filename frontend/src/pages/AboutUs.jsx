function AboutUs({ toggleSidebar }) {
  return (
    <div className="about-container">
      <nav className="header" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 10 }}>
        <div className="left-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0.5rem 2rem' }}>
          <button className="menu-btn" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <svg viewBox="0 0 24 24" fill="#D00000" width="24" height="24">
              <path d="M12 2.5s-7 7.5-7 11.5c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4-7-11.5-7-11.5z" />
            </svg>
            <h1 style={{ fontSize: '1.25rem', color: 'var(--blood-red-deep)' }}>BloodLink</h1>
          </div>
        </div>
      </nav>

      <div style={{ padding: '8rem 2rem 4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div className="card text-center">
          <div style={{ marginBottom: '2rem' }}>
            <svg viewBox="0 0 24 24" fill="#D00000" width="80" height="80">
              <path d="M12 2.5s-7 7.5-7 11.5c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4-7-11.5-7-11.5z" />
            </svg>
          </div>
          <h1 style={{ marginBottom: '1.5rem' }}>About BloodLink</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            BloodLink is a dedicated platform connecting blood donors with hospitals and patients in need. 
            Our mission is to streamline the blood donation process, making it faster, more transparent, and accessible to everyone.
          </p>
          <div style={{ marginTop: '3rem', textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Our Goal</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              We believe that no life should be lost due to a lack of blood availability. By using technology, 
              we empower donors to find requests near them and help hospitals manage their blood inventory more effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
