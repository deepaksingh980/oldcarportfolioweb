import mongoose from "mongoose";

const SpecSchema = new mongoose.Schema({
  engine: String,
  fuelType: String,
  transmission: String,
  mileage: String,
  horsepower: String,
  torque: String,
  topSpeed: String,
  driveType: String,
});

const CarSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand", // <== yeh line hi populate ke liye zaroori hai
      required: true,
    },
    color: String,
    year: Number,
    category: String,
    ownerType: String,
    actualPrice: Number,
    discountedPrice: Number,
    status: { type: String, default: "Available" },
    description: String,
    images: [String],
    specs: SpecSchema,
  },
  { timestamps: true }
);

CarSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }
  next();
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);
