import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useProduct } from '../context/ProductContext';

const ProductEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct, loading, error, success, clearError } = useProduct();

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
  });

  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8001/api/products/${id}`);
        setProduct(data);
        setLoadingProduct(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoadingProduct(false);
      }
    };

    if (id !== 'create') {
      fetchProduct();
    } else {
      setLoadingProduct(false);
    }
  }, [id]);

  useEffect(() => {
    if (success) {
      navigate('/admin/products');
    }
  }, [success, navigate]);

  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(product);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const changeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  if (loadingProduct) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading product...</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>{id === 'create' ? 'Create Product' : 'Edit Product'}</h1>
        <button
          onClick={() => navigate('/admin/products')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Products
        </button>
      </div>

      <form onSubmit={submitHandler} style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '2rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
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
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={product.price}
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
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            value={product.image}
            onChange={changeHandler}
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
            Brand
          </label>
          <input
            type="text"
            name="brand"
            placeholder="Enter brand"
            value={product.brand}
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
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={product.category}
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
            Count In Stock
          </label>
          <input
            type="number"
            name="countInStock"
            placeholder="Enter count in stock"
            value={product.countInStock}
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
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={product.description}
            onChange={changeHandler}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Updating...' : (id === 'create' ? 'Create Product' : 'Update Product')}
        </button>
      </form>
    </div>
  );
};

export default ProductEditScreen;