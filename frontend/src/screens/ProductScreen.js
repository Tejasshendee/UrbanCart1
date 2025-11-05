import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8001/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  // Mock images for demonstration
  const productImages = [
    `https://via.placeholder.com/600x600/6366f1/ffffff?text=${encodeURIComponent(product?.name + ' 1')}`,
    `https://via.placeholder.com/600x600/8b5cf6/ffffff?text=${encodeURIComponent(product?.name + ' 2')}`,
    `https://via.placeholder.com/600x600/10b981/ffffff?text=${encodeURIComponent(product?.name + ' 3')}`,
  ];

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}></div>
        <p style={loadingTextStyle}>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={notFoundStyle}>
        <h2>Product not found</h2>
        <Link to="/" style={backButtonStyle}>← Back to Shopping</Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Breadcrumb */}
      <div style={breadcrumbStyle}>
        <Link to="/" style={breadcrumbLinkStyle}>Home</Link>
        <span style={breadcrumbSeparatorStyle}>/</span>
        <span style={breadcrumbCurrentStyle}>{product.name}</span>
      </div>

      <div style={productContainerStyle}>
        {/* Image Gallery */}
        <div style={gallerySectionStyle}>
          <div style={mainImageStyle}>
            <img 
              src={productImages[selectedImage]} 
              alt={product.name}
              style={imageStyle}
            />
          </div>
          <div style={thumbnailContainerStyle}>
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                style={{
                  ...thumbnailStyle,
                  border: selectedImage === index ? '2px solid #6366f1' : '2px solid #333'
                }}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} style={thumbnailImageStyle} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div style={infoSectionStyle}>
          <div style={infoContentStyle}>
            <h1 style={productTitleStyle}>{product.name}</h1>
            
            <div style={ratingContainerStyle}>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color="#f59e0b"
              />
            </div>

            <div style={priceStyle}>${product.price}</div>

            <div style={descriptionStyle}>
              <h3 style={sectionTitleStyle}>Description</h3>
              <p style={descriptionTextStyle}>{product.description}</p>
            </div>

            <div style={detailsStyle}>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>Brand:</span>
                <span style={detailValueStyle}>{product.brand}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>Category:</span>
                <span style={detailValueStyle}>{product.category}</span>
              </div>
              <div style={detailItemStyle}>
                <span style={detailLabelStyle}>SKU:</span>
                <span style={detailValueStyle}>{product._id.substring(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Box */}
        <div style={purchaseSectionStyle}>
          <div style={purchaseBoxStyle}>
            <div style={priceBoxStyle}>
              <span style={priceLabelStyle}>Price:</span>
              <span style={priceValueStyle}>${product.price}</span>
            </div>

            <div style={statusStyle}>
              <span style={statusLabelStyle}>Status:</span>
              <span style={{
                ...statusValueStyle,
                color: product.countInStock > 0 ? '#10b981' : '#ef4444'
              }}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div style={quantityStyle}>
                <label style={quantityLabelStyle}>Quantity:</label>
                <select 
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={quantitySelectStyle}
                >
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              style={{
                ...addToCartButtonStyle,
                background: product.countInStock > 0 
                  ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                  : '#6c757d',
                cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed'
              }}
            >
              {product.countInStock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>

            <div style={featuresStyle}>
              <div style={featureItemStyle}>
                <span style={featureIconStyle}>🚚</span>
                <span style={featureTextStyle}>Free Shipping</span>
              </div>
              <div style={featureItemStyle}>
                <span style={featureIconStyle}>🔒</span>
                <span style={featureTextStyle}>Secure Payment</span>
              </div>
              <div style={featureItemStyle}>
                <span style={featureIconStyle}>↩️</span>
                <span style={featureTextStyle}>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
  minHeight: '100vh',
  padding: '2rem',
};

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  textAlign: 'center',
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '4px solid #333',
  borderTop: '4px solid #6366f1',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem',
};

const loadingTextStyle = {
  color: '#b0b0b0',
  fontSize: '1.1rem',
};

const notFoundStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  color: '#ffffff',
};

const backButtonStyle = {
  display: 'inline-block',
  marginTop: '1rem',
  padding: '0.75rem 1.5rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: '600',
};

const breadcrumbStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '2rem',
  fontSize: '0.9rem',
  maxWidth: '1200px',
  margin: '0 auto 2rem',
};

const breadcrumbLinkStyle = {
  color: '#6366f1',
  textDecoration: 'none',
};

const breadcrumbSeparatorStyle = {
  color: '#666',
};

const breadcrumbCurrentStyle = {
  color: '#b0b0b0',
};

const productContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 0.8fr',
  gap: '3rem',
  maxWidth: '1200px',
  margin: '0 auto',
  alignItems: 'start',
};

const gallerySectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const mainImageStyle = {
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid #333',
};

const imageStyle = {
  width: '100%',
  height: '400px',
  objectFit: 'cover',
};

const thumbnailContainerStyle = {
  display: 'flex',
  gap: '0.5rem',
};

const thumbnailStyle = {
  flex: 1,
  background: 'transparent',
  border: '2px solid #333',
  borderRadius: '8px',
  padding: '0',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
};

const thumbnailImageStyle = {
  width: '100%',
  height: '60px',
  objectFit: 'cover',
};

const infoSectionStyle = {
  padding: '0 1rem',
};

const infoContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const productTitleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#ffffff',
  lineHeight: '1.2',
  margin: 0,
};

const ratingContainerStyle = {
  marginBottom: '0.5rem',
};

const priceStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#6366f1',
  margin: 0,
};

const descriptionStyle = {
  marginTop: '1rem',
};

const sectionTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#ffffff',
  marginBottom: '0.75rem',
};

const descriptionTextStyle = {
  color: '#b0b0b0',
  lineHeight: '1.6',
  fontSize: '1rem',
};

const detailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

const detailItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 0',
  borderBottom: '1px solid #333',
};

const detailLabelStyle = {
  color: '#b0b0b0',
  fontWeight: '500',
};

const detailValueStyle = {
  color: '#ffffff',
  fontWeight: '600',
};

const purchaseSectionStyle = {
  position: 'sticky',
  top: '2rem',
};

const purchaseBoxStyle = {
  background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
  padding: '2rem',
  borderRadius: '16px',
  border: '1px solid #333',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
};

const priceBoxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #333',
};

const priceLabelStyle = {
  color: '#b0b0b0',
  fontSize: '1.1rem',
};

const priceValueStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#6366f1',
};

const statusStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
};

const statusLabelStyle = {
  color: '#b0b0b0',
};

const statusValueStyle = {
  fontWeight: '600',
  fontSize: '1rem',
};

const quantityStyle = {
  marginBottom: '1.5rem',
};

const quantityLabelStyle = {
  display: 'block',
  color: '#b0b0b0',
  marginBottom: '0.5rem',
  fontWeight: '500',
};

const quantitySelectStyle = {
  width: '100%',
  padding: '0.75rem',
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '1rem',
};

const addToCartButtonStyle = {
  width: '100%',
  padding: '1rem 2rem',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginBottom: '1.5rem',
};

const featuresStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const featureItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.75rem',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const featureIconStyle = {
  fontSize: '1.2rem',
};

const featureTextStyle = {
  color: '#b0b0b0',
  fontSize: '0.9rem',
};

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default ProductScreen;