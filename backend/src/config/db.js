import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
    console.log("connect success!");
  } catch (error) {
    console.log("connect fall!", error);
    process.exit(1);
    // thoát kết nối với database
    // 1: là thất bại
    // 0: là thành công
  }
};
