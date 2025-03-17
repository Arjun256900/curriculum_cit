import mongoose from "mongoose";

const deanRequestSchema = new mongoose.Schema({
  course: Object,
  requestText: String,
  name: String,
  requestedBy: String,
  department: String,
  lastViewed: Date,
  hodComment: String,
  deanComment: String,
  status: String,
  statusForNoti: String,
  acceptedBy: String,
});

const DeanRequest = mongoose.model("DeanRequest", deanRequestSchema);
export default DeanRequest;
