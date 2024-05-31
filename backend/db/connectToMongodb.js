import mongoose from "mongoose";

const connectToMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connect to mongoDB")
    } catch (error) {
        console.log("Error connect to mongodb", error.data);
    }
};

export default connectToMongodb;