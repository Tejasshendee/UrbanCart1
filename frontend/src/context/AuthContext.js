import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    
    case 'LOGIN_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        userInfo: null,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        userInfo: null,
        error: null,
      };
    
    case 'REGISTER_REQUEST':
      return { ...state, loading: true };
    
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };
    
    case 'REGISTER_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
        userInfo: null,
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
  loading: false,
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Save user info to localStorage
  useEffect(() => {
    if (state.userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [state.userInfo]);

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOGIN_REQUEST' });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:8001/api/users/login',
        { email, password },
        config
      );

      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'REGISTER_REQUEST' });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        'http://localhost:8001/api/users',
        { name, email, password },
        config
      );

      dispatch({ type: 'REGISTER_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo: state.userInfo,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};