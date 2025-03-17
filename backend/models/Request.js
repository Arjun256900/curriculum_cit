import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  course: { type: Object, required: true },
  requestText: { type: String, required: true },
  requestedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Forwarded to HOD" },
  statusChangedAt: { type: Date },
  hodForwardedAt: { type: Date },
  hodComment: { type: String, required: true, default: "Pending" },
  deanAcceptedAt: { type: String, default: "Pending" },
  deanComment: { type: String, required: true, default: "Pending" },
});

const Request = mongoose.model("changeRequest", requestSchema);

export default Request;
