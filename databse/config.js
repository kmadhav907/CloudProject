import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://kmadhav:123mad@cloud.4x7z6.mongodb.net/cloud?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
