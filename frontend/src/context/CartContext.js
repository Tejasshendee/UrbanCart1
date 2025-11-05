import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case 'CART_CLEAR_ITEMS':
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save to localStorage whenever cartItems change
  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product, quantity) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        quantity: Number(quantity),
      },
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: id,
    });
  };

  const clearCart = () => {
    dispatch({
      type: 'CART_CLEAR_ITEMS',
    });
  };

  // Calculate total items in cart
  const getCartItemsCount = () => {
    return state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Calculate total price
  const getCartTotal = () => {
    return state.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartItemsCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};