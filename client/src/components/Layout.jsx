import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/tasks', label: 'Tasks', icon: '✅' },
  { path: '/notes', label: 'Notes', icon: '📝' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={wrapperStyle}>
      {/* Mobile top bar */}
      <div style={mobileBarStyle} className="mobile-only">
        <span style={{ fontWeight: 700, color: '#481E28' }}>Multitalented</span>
        <button onClick={() => setMenuOpen(!menuOpen)} style={menuBtnStyle}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      <aside style={{ ...sidebarStyle, ...(menuOpen ? sidebarOpenMobile : {}) }} className="sidebar">
        <div style={brandStyle}>
          <div style={logoCircleStyle}>{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: '#481E28', fontSize: 15 }}>
              {user?.name}
            </p>
            <p style={{ margin: 0, fontSize: 12, color: '#CF8B9C' }}>{user?.email}</p>
          </div>
        </div>

        <nav style={{ marginTop: 24 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{ ...navLinkStyle, ...(active ? navLinkActiveStyle : {}) }}
              >
                <span style={{ marginRight: 10 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} style={logoutBtnStyle}>
          <span style={{ marginRight: 8 }}>🚪</span> Logout
        </button>
      </aside>

      {/* Overlay for mobile menu */}
      {menuOpen && <div style={overlayStyle} onClick={() => setMenuOpen(false)} />}

      {/* Main content */}
      <main style={mainStyle}>{children}</main>
    </div>
  );
}

const wrapperStyle = {
  display: 'flex',
  minHeight: '100vh',
  background: '#F3E1E6',
  fontFamily: 'Segoe UI, sans-serif',
};

const sidebarStyle = {
  width: 240,
  background: '#fff',
  padding: '28px 20px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '2px 0 12px rgba(72, 30, 40, 0.06)',
  position: 'sticky',
  top: 0,
  height: '100vh',
  flexShrink: 0,
};

const sidebarOpenMobile = {};

const brandStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  paddingBottom: 20,
  borderBottom: '1px solid #F3E1E6',
};

const logoCircleStyle = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: '#BD6077',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 16,
  flexShrink: 0,
};

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '11px 14px',
  borderRadius: 10,
  color: '#733040',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
  marginBottom: 4,
  transition: 'background 0.15s',
};

const navLinkActiveStyle = {
  background: '#F3E1E6',
  color: '#481E28',
  fontWeight: 700,
};

const logoutBtnStyle = {
  marginTop: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: '11px 14px',
  borderRadius: 10,
  border: 'none',
  background: 'transparent',
  color: '#752300',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
};

const mainStyle = {
  flex: 1,
  padding: '32px 40px',
  minWidth: 0,
};

const mobileBarStyle = {
  display: 'none',
};

const menuBtnStyle = {
  border: 'none',
  background: 'transparent',
  fontSize: 20,
  color: '#481E28',
};

const overlayStyle = {
  display: 'none',
};