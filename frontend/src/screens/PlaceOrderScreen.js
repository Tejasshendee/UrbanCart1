import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { createOrder, loading, error } = useOrder();
  const { userInfo } = useAuth();

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Get shipping address and payment method from localStorage
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
  const paymentMethod = localStorage.getItem('paymentMethod') || '';

  // Calculate prices
  const itemsPrice = getCartTotal();
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  const placeOrderHandler = async () => {
    try {
      if (!userInfo) {
        navigate('/login?redirect=shipping');
        return;
      }

      const orderData = {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const createdOrder = await createOrder(orderData);
      
      // Clear cart and local storage
      clearCart();
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      
      // Navigate to order success page with order ID
      navigate(`/order/${createdOrder._id}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    navigate('/cart');
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Review Order</h1>
      
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '0.75rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          border: '1px solid #f5c6cb'
        }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Order Summary */}
        <div style={{ flex: 2 }}>
          {/* Shipping Section */}
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '1.5rem',
            marginBottom: '1rem'
          }}>
            <h3>Shipping</h3>
            <p>
              <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city}, {' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          {/* Payment Section */}
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '1.5rem',
            marginBottom: '1rem'
          }}>
            <h3>Payment Method</h3>
            <p><strong>Method:</strong> {paymentMethod}</p>
          </div>

          {/* Order Items */}
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '1.5rem'
          }}>
            <h3>Order Items</h3>
            {cartItems.map((item) => (
              <div
                key={item.product}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: '1px solid #eee'
                }}
              >
                <img
                  src={`https://via.placeholder.com/50x50/007bff/ffffff?text=${encodeURIComponent(item.name.substring(0, 2))}`}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', marginRight: '1rem' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                </div>
                <div>
                  <p style={{ margin: 0 }}>
                    {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Total */}
        <div style={{ 
          flex: 1,
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '1.5rem',
          height: 'fit-content'
        }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Items:</span>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Shipping:</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Tax:</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <hr style={{ margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            onClick={placeOrderHandler}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: loading ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;