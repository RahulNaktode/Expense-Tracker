import Expense from "../models/Expense.js";
import getDateRange from "../utils/dateFilter.js";
import XLSX from "xlsx";

const postExpense = async (req, res) => {
    const userId = req.user.id;
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const newExpense = new Expense({
            description,
            amount,
            category,
            date: new Date(date),
            userId
        });

        await newExpense.save();

        return res.json({
            success: true,
            message: "Expense added successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error adding expense: ${error.message}`
        })
    }
}

const getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        return res.json({
            success: true,
            message: "Expense fetched successfully",
            data: expense
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error fetching expenses: ${error.message}`
        })
    }
}

const updatedExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { description, amount } = req.body;

    try {
        const updateExpense = await Expense.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { returnDocument: 'after' }
        );

        if (!updateExpense) {
            return res.json({
                success: false,
                message: "Expense not found"
            })
        }

        return res.json({
            success: true,
            message: "Expense updated successfully",
            data: updateExpense
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error updating expense: ${error.message}`
        })
    }
}

const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id });

        if (!expense) {
            return res.json({
                success: false,
                message: "Expense not found"
            })
        }

        return res.json({
            success: true,
            message: "Expense deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error deleting expense: ${error.message}`
        })
    }
}

const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        const plainData = expenses.map((exp) => ({
            Description: exp.description,
            Amount: exp.amount,
            Category: exp.category,
            Date: new Date(exp.date).toLocaleDateString()
        }));

        const workSheet = XLSX.utils.json_to_sheet(plainData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Expenses");
        XLSX.writeFile(workBook, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error downloading expense data: ${error.message}`
        })
    }
}

const getExpenseOverview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { range = "monthly" } = req.query;
        const { start, end } = getDateRange(range);

        const expenses = await Expense.find({
            userId,
            date: { $gte: start, $lte: end },
        }).sort({ date: -1 });

        const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
        const averageExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;
        const numberOfTransactions = expenses.length;

        const recentTransactions = expenses.slice(0, 5);

        return res.json({
            success: true,
            message: "Expense overview fetched successfully",
            data: {
                totalExpense,
                averageExpense,
                numberOfTransactions,
                recentTransactions,
                range
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error fetching income overview: ${error.message}`
        })
    }
}

export { postExpense, getAllExpense, updatedExpense, deleteExpense, downloadExpenseExcel, getExpenseOverview };