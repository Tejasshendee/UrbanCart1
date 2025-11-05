import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';
import products from './data/products.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/urbancart');

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: '123456',
      isAdmin: true,
    });

    console.log('Admin user created:', adminUser.email);

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      isAdmin: false,
    });

    console.log('Regular user created:', regularUser.email);

    // Add the admin user reference to sample products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id };
    });

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log('✅ Data Imported Successfully!');
    console.log(`📦 ${sampleProducts.length} products added`);
    console.log(`👑 Admin user: admin@example.com / 123456`);
    console.log(`👤 Regular user: john@example.com / 123456`);
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('🗑️ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}