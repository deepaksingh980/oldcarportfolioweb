import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    message: { type: String, required: true },
    carName: String,
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
