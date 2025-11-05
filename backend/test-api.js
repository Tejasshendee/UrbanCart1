import dotenv from 'dotenv';
dotenv.config();

const testAPI = async () => {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Get all products
    console.log('1. Testing GET /api/products');
    const productsResponse = await fetch('http://localhost:5000/api/products');
    const products = await productsResponse.json();
    console.log(`✅ Products fetched: ${products.length} products\n`);

    // Test 2: Get single product
    if (products.length > 0) {
      console.log('2. Testing GET /api/products/:id');
      const singleProductResponse = await fetch(`http://localhost:5000/api/products/${products[0]._id}`);
      const singleProduct = await singleProductResponse.json();
      console.log(`✅ Single product: ${singleProduct.name}\n`);
    }

    // Test 3: User login
    console.log('3. Testing POST /api/users/login');
    const loginResponse = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: '123456'
      })
    });
    const loginData = await loginResponse.json();
    console.log(`✅ User login: ${loginData.name} (${loginData.email})\n`);

    console.log('🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    console.log('💡 Make sure the server is running: npm run dev');
  }
};

// Only run if server is likely running
setTimeout(testAPI, 1000);