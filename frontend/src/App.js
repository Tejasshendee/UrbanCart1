import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ProductProvider>
            <Router>
              <Header />
              <main className="py-3">
                <Container>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/product/:id" element={<ProductScreen />} />
                    <Route path="/cart" element={<CartScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterScreen />} />
                    
                    {/* Checkout Routes */}
                    <Route path="/shipping" element={<ShippingScreen />} />
                    <Route path="/payment" element={<PaymentScreen />} />
                    <Route path="/placeorder" element={<PlaceOrderScreen />} />
                    <Route path="/order/:id" element={<OrderScreen />} />
                    <Route path="/order/success" element={<OrderSuccessScreen />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin/products" element={<ProductListScreen />} />
                    <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                    <Route path="/admin/product/create" element={<ProductEditScreen />} />
                  </Routes>
                </Container>
              </main>
              <Footer />
            </Router>
          </ProductProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;