import mongoose from "mongoose";

const connection = mongoose
  .connect("mongodb://localhost:27017/curriculum_cit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => {
    console.log("Error connecting to MongoDB");
    console.error(err);
  });

export default connection;