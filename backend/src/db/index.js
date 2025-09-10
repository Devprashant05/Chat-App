import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        console.log("DB Connected at: ", connectionInstance.connection.host);
    } catch (error) {
        console.error("DB Connection error, ", error);
    }
};
