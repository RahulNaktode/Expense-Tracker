import express from "express";
import {checkJWT} from "../middlewars/jwt.js";
import { postIncome, getAllIncome, updatedIncome, deletedIncome, downloadIncomeExcel, getIncomeOverView } from "../controllers/income.js";

const incomeRouter = express.Router();

incomeRouter.post("/add", checkJWT, postIncome);
incomeRouter.get("/get", checkJWT, getAllIncome);

incomeRouter.put("/update/:id", checkJWT, updatedIncome);
incomeRouter.get("/downloadexcel", checkJWT, downloadIncomeExcel);

incomeRouter.delete("/delete/:id", checkJWT, deletedIncome);
incomeRouter.get("/overview", checkJWT, getIncomeOverView);

export default incomeRouter;