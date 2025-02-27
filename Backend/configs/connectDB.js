import mongoose from 'mongoose';


const mongooseConnection = async () => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URI);
        }
        console.log('mongoose connection successful');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

export default mongooseConnection;