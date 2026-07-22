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
    }
  },
  { timestamps: true }
);

export default mongoose.model("Analysis", analysisSchema);
