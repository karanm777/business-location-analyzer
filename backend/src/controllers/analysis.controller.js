import { validationResult } from "express-validator";
import Analysis from "../models/Analysis.js";
import { generateLocationAnalysis, generateAreaSuggestions } from "../services/ai.service.js";
import { success, failure } from "../utils/response.js";

export const analyzeLocation = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return failure(res, 400, "Validation failed", errors.array());
    }

    const { pincode, business } = req.body;

    const result = await generateLocationAnalysis(pincode, business);

    const analysis = await Analysis.create({
      user: req.user.id,
      pincode,
      business,
      score: result.score,
      recommendation: result.recommendation,
      pros: result.pros,
      cons: result.cons,
      summary: result.summary,
      costEstimate: result.costEstimate,
      requirements: result.requirements
    });

    return success(res, 201, "Analysis generated successfully", { analysis });
  } catch (error) {
    next(error);
  }
};

export const getAreaSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return failure(res, 400, "Validation failed", errors.array());
    }

    const { business, excludeDistrict, districts } = req.body;

    const suggestions = await generateAreaSuggestions(business, excludeDistrict, districts);

    return success(res, 200, "Suggestions generated successfully", { suggestions });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { search } = req.query;

    const query = { user: req.user.id };

    if (search) {
      query.$or = [
        { pincode: { $regex: search, $options: "i" } },
        { business: { $regex: search, $options: "i" } }
      ];
    }

    const analyses = await Analysis.find(query).sort({ createdAt: -1 });

    return success(res, 200, "History fetched successfully", { analyses });
  } catch (error) {
    next(error);
  }
};

export const deleteAnalysis = async (req, res, next) => {
  try {
    const { id } = req.params;

    const analysis = await Analysis.findOne({ _id: id, user: req.user.id });

    if (!analysis) {
      return failure(res, 404, "Analysis not found");
    }

    await analysis.deleteOne();

    return success(res, 200, "Analysis deleted successfully");
  } catch (error) {
    next(error);
  }
};
