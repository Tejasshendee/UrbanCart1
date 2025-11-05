import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

const OrderScreen = () => {
  const { id } = useParams();
  const { getOrderDetails, loading, error } = useOrder();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderDetails(id);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id, getOrderDetails]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading order details...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Error loading order</h2>
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">Go Home</Link>
      </div>
    );
  }

  if (!order) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Order not found</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Order #{order._id}</h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Order Details */}
        <div style={{ flex: 2 }}>
          {/* Shipping Section */}
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '1.5rem',
            marginBottom: '1rem'
          }}>
            <h3>Shipping</h3>
            <p><strong>Name:</strong> {order.user?.name}</p>
            <p><strong>Email:</strong> {order.user?.email}</p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <p style={{ color: order.isDelivered ? 'green' : 'red' }}>
              <strong>Status:</strong> {order.isDelivered ? `Delivered on ${new Date(order.deliveredAt).toLocaleDateString()}` : 'Not Delivered'}
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
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            <p style={{ color: order.isPaid ? 'green' : 'red' }}>
              <strong>Status:</strong> {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Not Paid'}
            </p>
          </div>

          {/* Order Items */}
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '1.5rem'
          }}>
            <h3>Order Items</h3>
            {order.orderItems.map((item) => (
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
                  <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>{item.name}</p>
                  </Link>
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

        {/* Order Summary */}
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
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Shipping:</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Tax:</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <hr style={{ margin: '1rem 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;