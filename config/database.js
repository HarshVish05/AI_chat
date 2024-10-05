import mongoose from 'mongoose'


export const connectDB = async() =>{
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo DB is connected with ${connection.host}`);

    } catch (error) {
        console.log(error.message);
    }
}

export const disconnectDB = async() =>{
    try {
        const {disconnect} = mongoose.disconnect(process.env.MONGODB_URI)
        console.log(`Mongo DB has been disconnected`);
        
    } catch (error) {
        console.error(error);
        
    }
}