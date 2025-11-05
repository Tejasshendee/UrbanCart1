import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testLocalMongoDB = async () => {
  try {
    console.log('🔗 Testing Local MongoDB Connection...');
    console.log('Connection string:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Local MongoDB Connected Successfully!');
    
    // Get database info
    const db = mongoose.connection.db;
    console.log('📊 Database name:', db.databaseName);
    
    // List collections (should be empty initially)
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('🔒 Connection closed.');
    
  } catch (error) {
    console.error('❌ Local MongoDB Connection Failed:', error.message);
    
    console.log('\n🔧 Troubleshooting Steps:');
    console.log('1. Make sure MongoDB service is running');
    console.log('2. Open Services (services.msc) and check "MongoDB" service');
    console.log('3. If service not found, reinstall MongoDB');
    console.log('4. Try running Command Prompt as Admin: "net start MongoDB"');
    console.log('5. Check if MongoDB Compass can connect to mongodb://localhost:27017');
  }
};

testLocalMongoDB();