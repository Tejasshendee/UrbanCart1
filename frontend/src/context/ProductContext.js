import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case 'PRODUCT_CREATE_REQUEST':
      return { ...state, loading: true };
    
    case 'PRODUCT_CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
        error: null,
      };
    
    case 'PRODUCT_CREATE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    
    case 'PRODUCT_CREATE_RESET':
      return {
        ...state,
        loading: false,
        success: false,
        product: null,
        error: null,
      };
    
    case 'PRODUCT_UPDATE_REQUEST':
      return { ...state, loading: true };
    
    case 'PRODUCT_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
        error: null,
      };
    
    case 'PRODUCT_UPDATE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    
    case 'PRODUCT_DELETE_REQUEST':
      return { ...state, loading: true };
    
    case 'PRODUCT_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    
    case 'PRODUCT_DELETE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  success: false,
  product: null,
  error: null,
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const { userInfo } = useAuth();

  const createProduct = async () => {
    try {
      dispatch({ type: 'PRODUCT_CREATE_REQUEST' });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:8001/api/products',
        {},
        config
      );

      dispatch({ type: 'PRODUCT_CREATE_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: 'PRODUCT_CREATE_FAIL',
        payload: error.response?.data?.message || error.message,
      });
      throw error;
    }
  };

  const updateProduct = async (product) => {
    try {
      dispatch({ type: 'PRODUCT_UPDATE_REQUEST' });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:8001/api/products/${product._id}`,
        product,
        config
      );

      dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: 'PRODUCT_UPDATE_FAIL',
        payload: error.response?.data?.message || error.message,
      });
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      dispatch({ type: 'PRODUCT_DELETE_REQUEST' });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.delete(
        `http://localhost:8001/api/products/${productId}`,
        config
      );

      dispatch({ type: 'PRODUCT_DELETE_SUCCESS' });
    } catch (error) {
      dispatch({
        type: 'PRODUCT_DELETE_FAIL',
        payload: error.response?.data?.message || error.message,
      });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const resetCreate = () => {
    dispatch({ type: 'PRODUCT_CREATE_RESET' });
  };

  return (
    <ProductContext.Provider
      value={{
        loading: state.loading,
        success: state.success,
        product: state.product,
        error: state.error,
        createProduct,
        updateProduct,
        deleteProduct,
        clearError,
        resetCreate,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};