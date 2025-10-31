import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    image: [String], // ✅ Array of image URLs
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);
