import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
  const navigate = useNavigate();
  
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const { address, city, postalCode, country } = shippingAddress;

  const submitHandler = (e) => {
    e.preventDefault();
    // Save shipping address to localStorage or context
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    navigate('/payment');
  };

  const changeHandler = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Shipping</h1>
      
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={address}
            onChange={changeHandler}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={city}
            onChange={changeHandler}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={changeHandler}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Country
          </label>
          <input
            type="text"
            name="country"
            placeholder="Enter country"
            value={country}
            onChange={changeHandler}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
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
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;