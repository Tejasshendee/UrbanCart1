import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card style={cardStyle}>
      <Link to={`/product/${product._id}`} style={imageLinkStyle}>
        <Card.Img 
          src={`https://via.placeholder.com/300x300/6366f1/ffffff?text=${encodeURIComponent(product.name)}`}
          variant="top" 
          style={imageStyle}
        />
        {/* Overlay on hover */}
        <div style={overlayStyle}>
          <span style={viewDetailsStyle}>View Details →</span>
        </div>
      </Link>

      <Card.Body style={cardBodyStyle}>
        <Link to={`/product/${product._id}`} style={titleLinkStyle}>
          <Card.Title style={titleStyle}>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text style={ratingStyle}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color="#f59e0b"
          />
        </Card.Text>

        <div style={priceSectionStyle}>
          <Card.Text style={priceStyle}>
            ${product.price}
          </Card.Text>
          <Card.Text style={stockStyle}>
            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </Card.Text>
        </div>

        {/* Quick actions */}
        <div style={actionsStyle}>
          <Link 
            to={`/product/${product._id}`} 
            style={viewButtonStyle}
          >
            Quick View
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

// Styles
const cardStyle = {
  background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
  border: '1px solid #333',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  height: '100%',
  position: 'relative',
};

const imageLinkStyle = {
  display: 'block',
  position: 'relative',
  overflow: 'hidden',
};

const imageStyle = {
  height: '250px',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(99, 102, 241, 0.9)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease',
};

const viewDetailsStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.1rem',
};

const cardBodyStyle = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 250px)',
};

const titleLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
};

const titleStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#ffffff',
  marginBottom: '0.75rem',
  lineHeight: '1.4',
  minHeight: '3rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

const ratingStyle = {
  marginBottom: '1rem',
};

const priceSectionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  marginTop: 'auto',
};

const priceStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#6366f1',
  margin: 0,
};

const stockStyle = {
  fontSize: '0.8rem',
  color: '#10b981',
  fontWeight: '500',
  margin: 0,
};

const actionsStyle = {
  display: 'flex',
  gap: '0.5rem',
};

const viewButtonStyle = {
  flex: 1,
  padding: '0.75rem 1rem',
  background: 'rgba(99, 102, 241, 0.1)',
  color: '#6366f1',
  textDecoration: 'none',
  borderRadius: '8px',
  textAlign: 'center',
  fontWeight: '600',
  border: '1px solid rgba(99, 102, 241, 0.3)',
  transition: 'all 0.3s ease',
  fontSize: '0.9rem',
};

// Hover effects
Object.assign(cardStyle, {
  ':hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    borderColor: '#6366f1',
  }
});

Object.assign(imageStyle, {
  ':hover': {
    transform: 'scale(1.05)',
  }
});

Object.assign(overlayStyle, {
  ':hover': {
    opacity: 1,
  }
});

Object.assign(viewButtonStyle, {
  ':hover': {
    background: 'rgba(99, 102, 241, 0.2)',
    transform: 'translateY(-2px)',
    textDecoration: 'none',
    color: '#6366f1',
  }
});

export default Product;