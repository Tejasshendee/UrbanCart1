import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  if (cartItems.length === 0) {
    return (
      <div style={emptyCartStyle}>
        <div style={emptyCartContentStyle}>
          <div style={emptyCartIconStyle}>🛒</div>
          <h2 style={emptyCartTitleStyle}>Your Cart is Empty</h2>
          <p style={emptyCartTextStyle}>
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/" style={continueShoppingStyle}>
            🏠 Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Calculate totals
  const itemsTotal = getCartTotal();
  const shippingPrice = itemsTotal > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsTotal).toFixed(2));
  const totalPrice = Number((itemsTotal + shippingPrice + taxPrice).toFixed(2));

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Shopping Cart</h1>
        <p style={itemCountStyle}>
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items in cart
        </p>
      </div>

      <div style={contentStyle}>
        {/* Cart Items */}
        <div style={itemsSectionStyle}>
          {cartItems.map((item) => (
            <div key={item.product} style={cartItemStyle}>
              <img
                src={`https://via.placeholder.com/100x100/6366f1/ffffff?text=${encodeURIComponent(item.name)}`}
                alt={item.name}
                style={itemImageStyle}
              />
              
              <div style={itemDetailsStyle}>
                <Link to={`/product/${item.product}`} style={itemNameStyle}>
                  {item.name}
                </Link>
                <p style={itemPriceStyle}>${item.price}</p>
                <p style={itemStockStyle}>
                  {item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              <div style={itemQuantityStyle}>
                <span style={quantityLabelStyle}>Qty: {item.quantity}</span>
                <span style={itemTotalStyle}>
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => removeFromCart(item.product)}
                style={removeButtonStyle}
                title="Remove item"
              >
                🗑️
              </button>
            </div>
          ))}

          <div style={cartActionsStyle}>
            <button
              onClick={clearCart}
              style={clearCartButtonStyle}
            >
              🗑️ Clear Cart
            </button>
            <Link to="/" style={continueShoppingButtonStyle}>
              🛍️ Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div style={summarySectionStyle}>
          <div style={summaryBoxStyle}>
            <h3 style={summaryTitleStyle}>Order Summary</h3>
            
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
              <span style={summaryValueStyle}>${itemsTotal.toFixed(2)}</span>
            </div>
            
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>Shipping</span>
              <span style={summaryValueStyle}>
                {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
              </span>
            </div>
            
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>Tax</span>
              <span style={summaryValueStyle}>${taxPrice.toFixed(2)}</span>
            </div>
            
            <div style={dividerStyle}></div>
            
            <div style={totalRowStyle}>
              <span style={totalLabelStyle}>Total</span>
              <span style={totalValueStyle}>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={checkoutHandler}
              style={checkoutButtonStyle}
            >
              🚀 Proceed to Checkout
            </button>

            <div style={securityStyle}>
              <div style={securityItemStyle}>
                <span style={securityIconStyle}>🔒</span>
                <span style={securityTextStyle}>Secure checkout</span>
              </div>
              <div style={securityItemStyle}>
                <span style={securityIconStyle}>🛡️</span>
                <span style={securityTextStyle}>Buyer protection</span>
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

const headerStyle = {
  textAlign: 'center',
  marginBottom: '3rem',
  maxWidth: '1200px',
  margin: '0 auto 3rem',
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: '0.5rem',
};

const itemCountStyle = {
  color: '#b0b0b0',
  fontSize: '1.1rem',
};

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: '3rem',
  maxWidth: '1200px',
  margin: '0 auto',
  alignItems: 'start',
};

const itemsSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const cartItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  padding: '1.5rem',
  background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
  borderRadius: '12px',
  border: '1px solid #333',
  transition: 'all 0.3s ease',
};

const itemImageStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '8px',
  objectFit: 'cover',
  border: '1px solid #333',
};

const itemDetailsStyle = {
  flex: 1,
};

const itemNameStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#ffffff',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '0.5rem',
};

const itemPriceStyle = {
  color: '#6366f1',
  fontWeight: 'bold',
  margin: '0.25rem 0',
};

const itemStockStyle = {
  color: '#10b981',
  fontSize: '0.9rem',
  margin: 0,
};

const itemQuantityStyle = {
  textAlign: 'center',
  minWidth: '100px',
};

const quantityLabelStyle = {
  display: 'block',
  color: '#b0b0b0',
  fontSize: '0.9rem',
  marginBottom: '0.5rem',
};

const itemTotalStyle = {
  display: 'block',
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '1.1rem',
};

const removeButtonStyle = {
  background: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  color: '#ef4444',
  padding: '0.5rem',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '1.2rem',
  transition: 'all 0.3s ease',
};

const cartActionsStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
};

const clearCartButtonStyle = {
  padding: '0.75rem 1.5rem',
  background: 'rgba(239, 68, 68, 0.1)',
  color: '#ef4444',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  transition: 'all 0.3s ease',
};

const continueShoppingButtonStyle = {
  padding: '0.75rem 1.5rem',
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  textDecoration: 'none',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '8px',
  fontWeight: '600',
  transition: 'all 0.3s ease',
};

const summarySectionStyle = {
  position: 'sticky',
  top: '2rem',
};

const summaryBoxStyle = {
  background: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
  padding: '2rem',
  borderRadius: '16px',
  border: '1px solid #333',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
};

const summaryTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: '1.5rem',
  textAlign: 'center',
};

const summaryRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #333',
};

const summaryLabelStyle = {
  color: '#b0b0b0',
};

const summaryValueStyle = {
  color: '#ffffff',
  fontWeight: '500',
};

const dividerStyle = {
  height: '1px',
  background: '#333',
  margin: '1rem 0',
};

const totalRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  padding: '1rem 0',
  borderTop: '1px solid #333',
};

const totalLabelStyle = {
  color: '#ffffff',
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

const totalValueStyle = {
  color: '#6366f1',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const checkoutButtonStyle = {
  width: '100%',
  padding: '1rem 2rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginBottom: '1.5rem',
};

const securityStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

const securityItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.75rem',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '6px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const securityIconStyle = {
  fontSize: '1rem',
};

const securityTextStyle = {
  color: '#b0b0b0',
  fontSize: '0.9rem',
};

const emptyCartStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
  background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
  padding: '2rem',
};

const emptyCartContentStyle = {
  textAlign: 'center',
  maxWidth: '400px',
};

const emptyCartIconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem',
};

const emptyCartTitleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#ffffff',
  marginBottom: '1rem',
};

const emptyCartTextStyle = {
  color: '#b0b0b0',
  fontSize: '1.1rem',
  lineHeight: '1.6',
  marginBottom: '2rem',
};

const continueShoppingStyle = {
  display: 'inline-block',
  padding: '1rem 2rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
};

// Hover effects
Object.assign(cartItemStyle, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    borderColor: '#6366f1',
  }
});

Object.assign(removeButtonStyle, {
  ':hover': {
    background: 'rgba(239, 68, 68, 0.2)',
    transform: 'scale(1.1)',
  }
});

Object.assign(clearCartButtonStyle, {
  ':hover': {
    background: 'rgba(239, 68, 68, 0.2)',
    transform: 'translateY(-2px)',
  }
});

Object.assign(continueShoppingButtonStyle, {
  ':hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-2px)',
    textDecoration: 'none',
    color: '#ffffff',
  }
});

Object.assign(checkoutButtonStyle, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
  }
});

Object.assign(continueShoppingStyle, {
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)',
    textDecoration: 'none',
    color: 'white',
  }
});

export default CartScreen;