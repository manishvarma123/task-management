import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connection successful on port - ${connectionInstance.connection.port}`)
    } catch (error) {
        console.log('MongoDb connection failed')
    }
}

export default connectDB