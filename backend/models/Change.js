import mongoose from "mongoose";

const changeSchema = new mongoose.Schema({
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
  action: String,
});

const Change = mongoose.model("ChangesMade", changeSchema);

export default Change;
