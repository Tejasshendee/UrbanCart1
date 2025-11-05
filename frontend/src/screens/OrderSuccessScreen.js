import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessScreen = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem 2rem',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ 
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #c3e6cb',
        marginBottom: '2rem'
      }}>
        <h1 style={{ color: '#155724', marginBottom: '1rem' }}>🎉 Order Placed Successfully!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Thank you for your purchase!
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          Your order has been received and is being processed.
        </p>
        <p>
          You will receive an email confirmation shortly.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          to="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          Continue Shopping
        </Link>
        
        <Link
          to="/orders"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessScreen;