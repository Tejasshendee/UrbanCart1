import React, { useState, useEffect } from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8001/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products. Make sure backend is running on port 8001.');
        setLoading(false);
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>
            Welcome to <span style={gradientTextStyle}>UrbanCart</span>
          </h1>
          <p style={heroSubtitleStyle}>
            Discover premium products with exceptional quality. 
            Shop with confidence and style.
          </p>
          <div style={statsStyle}>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>1000+</span>
              <span style={statLabelStyle}>Products</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>99%</span>
              <span style={statLabelStyle}>Happy Customers</span>
            </div>
            <div style={statItemStyle}>
              <span style={statNumberStyle}>24/7</span>
              <span style={statLabelStyle}>Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div style={productsSectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>
            Featured <span style={gradientTextStyle}>Products</span>
          </h2>
          <p style={sectionSubtitleStyle}>
            Carefully curated selection of premium products
          </p>
        </div>

        {loading ? (
          <div style={loadingStyle}>
            <Spinner animation="border" role="status" style={spinnerStyle}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p style={loadingTextStyle}>Loading amazing products...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" style={alertStyle}>
            <Alert.Heading>Connection Error</Alert.Heading>
            <p>{error}</p>
          </Alert>
        ) : (
          <>
            <Row style={productsGridStyle}>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} style={colStyle}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            
            {/* Call to Action */}
            <div style={ctaSectionStyle}>
              <div style={ctaContentStyle}>
                <h3 style={ctaTitleStyle}>Ready to Transform Your Shopping Experience?</h3>
                <p style={ctaTextStyle}>
                  Join thousands of satisfied customers who trust UrbanCart for quality and service.
                </p>
                <a href="/products" style={ctaButtonStyle}>
                  Explore All Products
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
};

const heroSectionStyle = {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  padding: '4rem 2rem',
  textAlign: 'center',
  borderBottom: '1px solid #333',
};

const heroContentStyle = {
  maxWidth: '800px',
  margin: '0 auto',
};

const heroTitleStyle = {
  fontSize: '3.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#ffffff',
  lineHeight: '1.2',
};

const gradientTextStyle = {
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const heroSubtitleStyle = {
  fontSize: '1.2rem',
  color: '#b0b0b0',
  marginBottom: '3rem',
  lineHeight: '1.6',
};

const statsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '3rem',
  flexWrap: 'wrap',
};

const statItemStyle = {
  textAlign: 'center',
};

const statNumberStyle = {
  display: 'block',
  fontSize: '2rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const statLabelStyle = {
  display: 'block',
  fontSize: '0.9rem',
  color: '#b0b0b0',
  marginTop: '0.5rem',
};

const productsSectionStyle = {
  padding: '4rem 2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const sectionHeaderStyle = {
  textAlign: 'center',
  marginBottom: '3rem',
};

const sectionTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#ffffff',
};

const sectionSubtitleStyle = {
  fontSize: '1.1rem',
  color: '#b0b0b0',
};

const loadingStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
};

const spinnerStyle = {
  color: '#6366f1',
  width: '3rem',
  height: '3rem',
  marginBottom: '1rem',
};

const loadingTextStyle = {
  color: '#b0b0b0',
  fontSize: '1.1rem',
};

const alertStyle = {
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  color: '#ef4444',
  borderRadius: '12px',
};

const productsGridStyle = {
  margin: '0 -0.75rem',
};

const colStyle = {
  padding: '0.75rem',
};

const ctaSectionStyle = {
  background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
  padding: '3rem 2rem',
  borderRadius: '16px',
  border: '1px solid #333',
  marginTop: '4rem',
  textAlign: 'center',
};

const ctaContentStyle = {
  maxWidth: '600px',
  margin: '0 auto',
};

const ctaTitleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#ffffff',
};

const ctaTextStyle = {
  fontSize: '1.1rem',
  color: '#b0b0b0',
  marginBottom: '2rem',
  lineHeight: '1.6',
};

const ctaButtonStyle = {
  display: 'inline-block',
  padding: '1rem 2rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  border: 'none',
  cursor: 'pointer',
};

// Add hover effect
Object.assign(ctaButtonStyle, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
    textDecoration: 'none',
    color: 'white',
  }
});

export default HomeScreen;