import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  course: Object,
  requestText: String,
  facultyName: String,
  requestedBy: String,
  department: String,
  lastViewed: Date,
  hodComment: String,
  deanComment: String,
  status: String,
  statusForNoti: String
});

const Request = mongoose.model("ChangeRequest", requestSchema);

export default Request;
  