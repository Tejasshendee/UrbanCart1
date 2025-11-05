import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Main Footer Content */}
        <div style={contentStyle}>
          {/* Brand Section */}
          <div style={brandSectionStyle}>
            <h3 style={brandTitleStyle}>🚀 UrbanCart</h3>
            <p style={brandTextStyle}>
              Your premier destination for quality products with exceptional service. 
              Experience shopping redefined.
            </p>
            <div style={socialLinksStyle}>
              <a href="#" style={socialLinkStyle}>📘</a>
              <a href="#" style={socialLinkStyle}>🐦</a>
              <a href="#" style={socialLinkStyle}>📷</a>
              <a href="#" style={socialLinkStyle}>💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={linksSectionStyle}>
            <h4 style={sectionTitleStyle}>Quick Links</h4>
            <div style={linksStyle}>
              <a href="/" style={linkStyle}>Home</a>
              <a href="/products" style={linkStyle}>Products</a>
              <a href="/about" style={linkStyle}>About</a>
              <a href="/contact" style={linkStyle}>Contact</a>
            </div>
          </div>

          {/* Support */}
          <div style={linksSectionStyle}>
            <h4 style={sectionTitleStyle}>Support</h4>
            <div style={linksStyle}>
              <a href="/help" style={linkStyle}>Help Center</a>
              <a href="/shipping" style={linkStyle}>Shipping Info</a>
              <a href="/returns" style={linkStyle}>Returns</a>
              <a href="/privacy" style={linkStyle}>Privacy Policy</a>
            </div>
          </div>

          {/* Contact Info */}
          <div style={contactSectionStyle}>
            <h4 style={sectionTitleStyle}>Contact Us</h4>
            <div style={contactInfoStyle}>
              <p style={contactTextStyle}>📧 support@urbancart.com</p>
              <p style={contactTextStyle}>📞 +1 (555) 123-4567</p>
              <p style={contactTextStyle}>📍 123 Commerce St, City, State 12345</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={bottomBarStyle}>
          <p style={copyrightStyle}>
            © 2024 UrbanCart. All rights reserved. Built with ❤️ for modern e-commerce.
          </p>
          <div style={paymentMethodsStyle}>
            <span style={paymentTextStyle}>We accept:</span>
            <span style={paymentIconsStyle}>💳 🅿️ 🍎 📱</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Styles
const footerStyle = {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
  borderTop: '1px solid #333',
  marginTop: 'auto',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '3rem 2rem 1rem',
};

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '3rem',
  marginBottom: '2rem',
};

const brandSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const brandTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const brandTextStyle = {
  color: '#b0b0b0',
  lineHeight: '1.6',
  fontSize: '0.9rem',
};

const socialLinksStyle = {
  display: 'flex',
  gap: '1rem',
};

const socialLinkStyle = {
  color: '#b0b0b0',
  textDecoration: 'none',
  fontSize: '1.2rem',
  transition: 'all 0.3s ease',
  ':hover': {
    color: '#6366f1',
    transform: 'translateY(-2px)',
  }
};

const linksSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const sectionTitleStyle = {
  color: '#ffffff',
  fontSize: '1.1rem',
  fontWeight: '600',
  marginBottom: '0.5rem',
};

const linksStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const linkStyle = {
  color: '#b0b0b0',
  textDecoration: 'none',
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  ':hover': {
    color: '#6366f1',
    paddingLeft: '5px',
  }
};

const contactSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const contactInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const contactTextStyle = {
  color: '#b0b0b0',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const bottomBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '2rem',
  borderTop: '1px solid #333',
  flexWrap: 'wrap',
  gap: '1rem',
};

const copyrightStyle = {
  color: '#888888',
  fontSize: '0.8rem',
};

const paymentMethodsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const paymentTextStyle = {
  color: '#888888',
  fontSize: '0.8rem',
};

const paymentIconsStyle = {
  fontSize: '1rem',
};

export default Footer;