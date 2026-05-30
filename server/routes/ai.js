import express from "express";
import { processExpenseText } from "../controllers/ai.js";

const aiRouter = express.Router();

// POST request for AI text processing
aiRouter.post("/process", processExpenseText);

export default aiRouter;