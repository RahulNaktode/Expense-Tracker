import express from "express";
import {checkJWT} from "../middlewars/jwt.js";
import { postExpense, getAllExpense, updatedExpense, deleteExpense, downloadExpenseExcel, getExpenseOverview } from "../controllers/expense.js";

const expenseRouter = express.Router();

expenseRouter.post("/add", checkJWT, postExpense);
expenseRouter.get("/get", checkJWT, getAllExpense);

expenseRouter.put("/update/:id", checkJWT, updatedExpense);
expenseRouter.get("/downloadexcel", checkJWT, downloadExpenseExcel);

expenseRouter.delete("/delete/:id", checkJWT, deleteExpense);
expenseRouter.get("/overview", checkJWT, getExpenseOverview);

export default expenseRouter;