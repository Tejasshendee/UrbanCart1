import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    // Save payment method to localStorage
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/placeorder');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Payment Method</h1>
      
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Select Method</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              <strong>PayPal</strong>
            </label>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === 'Credit Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              <strong>Credit Card</strong>
            </label>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '0.5rem' }}
              />
              <strong>Stripe</strong>
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Continue to Review Order
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;