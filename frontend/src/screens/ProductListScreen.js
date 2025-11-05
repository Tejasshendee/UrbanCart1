import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useProduct } from '../context/ProductContext';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const { deleteProduct, loading: productLoading, error, success, clearError } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const { data } = await axios.get('http://localhost:8001/api/products');
        console.log('Products received:', data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setFetchError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [success]);

  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const createProductHandler = () => {
    navigate('/admin/product/create');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>;
  }

  if (fetchError) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Error Loading Products</h2>
        <p>{fetchError}</p>
        <p>Make sure your backend is running on port 8001</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Products ({products.length})</h1>
        <button
          onClick={createProductHandler}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Create Product
        </button>
      </div>

      {productLoading && (
        <div style={{ textAlign: 'center', padding: '1rem' }}>Processing...</div>
      )}

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>No Products Found</h3>
          <p>There are no products in the database.</p>
          <button
            onClick={createProductHandler}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create First Product
          </button>
        </div>
      ) : (
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          overflow: 'hidden'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>NAME</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>PRICE</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>CATEGORY</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>BRAND</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>STOCK</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{product._id.substring(0, 8)}...</td>
                  <td style={{ padding: '1rem' }}>{product.name}</td>
                  <td style={{ padding: '1rem' }}>${product.price}</td>
                  <td style={{ padding: '1rem' }}>{product.category}</td>
                  <td style={{ padding: '1rem' }}>{product.brand}</td>
                  <td style={{ padding: '1rem' }}>{product.countInStock}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#007bff',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '4px',
                          fontSize: '0.9rem'
                        }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;