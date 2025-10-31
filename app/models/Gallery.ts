import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    image: [String],
    title: String,
    caption: String,
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
