import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    },
    business: {
      type: String,
      required: true,
      trim: true
    },
    score: {
      type: Number,
      required: true
    },
    recommendation: {
      type: String,
      required: true
    },
    pros: {
      type: [String],
      default: []
    },
    cons: {
      type: [String],
      default: []
    },
    summary: {
      type: String,
      required: true
    },
    costEstimate: {
      monthlyRent: { type: String, default: "Not available" },
      setupCost: { type: String, default: "Not available" },
      note: { type: String, default: "" }
    },
    requirements: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);
