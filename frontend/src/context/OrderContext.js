import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userInfo } = useAuth();

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError('');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:8001/api/orders',
        orderData,
        config
      );

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const getOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      setError('');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:8001/api/orders/${orderId}`,
        config
      );

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const payOrder = async (orderId, paymentResult) => {
    try {
      setLoading(true);
      setError('');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:8001/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const getMyOrders = async () => {
    try {
      setLoading(true);
      setError('');

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(
        'http://localhost:8001/api/orders/myorders',
        config
      );

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const clearError = () => {
    setError('');
  };

  return (
    <OrderContext.Provider
      value={{
        loading,
        error,
        createOrder,
        getOrderDetails,
        payOrder,
        getMyOrders,
        clearError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};