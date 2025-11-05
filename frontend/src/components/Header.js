import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { getCartItemsCount } = useCart();
  const { userInfo, logout } = useAuth();
  const cartItemsCount = getCartItemsCount();

  const logoutHandler = () => {
    logout();
  };

  return (
    <header style={headerStyle}>
      <div style={navStyle}>
        {/* Logo */}
        <div style={logoStyle}>
          <a href="/" style={logoLinkStyle}>
            <span style={logoTextStyle}>🚀 UrbanCart</span>
          </a>
        </div>

        {/* Navigation */}
        <nav style={navLinksStyle}>
          <a href="/" style={navLinkStyle}>
            🏠 Home
          </a>
          
          <a href="/cart" style={navLinkStyle}>
            <span style={cartContainerStyle}>
              🛒 Cart 
              {cartItemsCount > 0 && (
                <span style={cartBadgeStyle}>{cartItemsCount}</span>
              )}
            </span>
          </a>

          {userInfo ? (
            <div style={userMenuStyle}>
              <span style={welcomeStyle}>👋 Welcome, {userInfo.name}</span>
              {userInfo.isAdmin && (
                <a href="/admin/products" style={adminLinkStyle}>
                  ⚙️ Admin
                </a>
              )}
              <button
                onClick={logoutHandler}
                style={logoutButtonStyle}
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <a href="/login" style={navLinkStyle}>
              🔐 Login
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

// Styles
const headerStyle = {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  padding: '1rem 0',
  borderBottom: '1px solid #333',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem',
};

const logoStyle = {
  flex: 1,
};

const logoLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const logoTextStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const navLinksStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
};

const navLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  fontWeight: '500',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const cartContainerStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const cartBadgeStyle = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  color: 'white',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  fontSize: '0.7rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
};

const userMenuStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const welcomeStyle = {
  color: '#b0b0b0',
  fontSize: '0.9rem',
};

const adminLinkStyle = {
  color: '#8b5cf6',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  background: 'rgba(139, 92, 246, 0.1)',
  border: '1px solid rgba(139, 92, 246, 0.3)',
  fontSize: '0.9rem',
};

const logoutButtonStyle = {
  background: 'rgba(239, 68, 68, 0.1)',
  color: '#ef4444',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
};

// Add hover effects
Object.assign(navLinkStyle, {
  ':hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
  }
});

Object.assign(adminLinkStyle, {
  ':hover': {
    background: 'rgba(139, 92, 246, 0.2)',
    transform: 'translateY(-2px)',
  }
});

Object.assign(logoutButtonStyle, {
  ':hover': {
    background: 'rgba(239, 68, 68, 0.2)',
    transform: 'translateY(-2px)',
  }
});

export default Header;