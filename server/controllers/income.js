import Income from "../models/income.js";
import XLSX from "xlsx";

const postIncome = async (req, res) => {
    const userId = req.user.id;
    const { description, amount, category, date } = req.body;

    try {
        if (!description || !amount || !category || !date) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const newIncome = new Income({
            description,
            amount,
            category,
            date: new Date(date),
            userId
        });

        await newIncome.save();

        return res.json({
            success: true,
            message: "Income added successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error adding income: ${error.message}`
        })
    }
}

const getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        return res.json({
            success: true,
            message: "Incomes fetched successfully",
            data: incomes
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error fetching incomes: ${error.message}`
        })
    }
}

const updatedIncome = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { description, amount } = req.body;

    try {
        const updateIncome = await Income.findOneAndUpdate(
            { _id: id, userId },
            { description, amount },
            { returnDocument: 'after' }
        );

        if (!updateIncome) {
            return res.json({
                success: false,
                message: "Income not found"
            })
        }

        return res.json({
            success: true,
            message: "Income updated successfully",
            data: updateIncome
        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error updating income: ${error.message}`
        })
    }
}

const deletedIncome = async (req, res) => {
    try {
        const income = await Income.findOneAndDelete({ _id: req.params.id });

        if (!income) {
            return res.json({
                success: false,
                message: "Income not found"
            })
        }

        return res.json({
            success: true,
            message: "Income deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error deleting income: ${error.message}`
        })
    }
}

const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        const plainData = incomes.map((inc) => ({
            Description: inc.description,
            Amount: inc.amount,
            Category: inc.category,
            Date: new Date(inc.date).toLocaleDateString()
        }));

        const workSheet = XLSX.utils.json_to_sheet(plainData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Incomes");
        XLSX.write(workBook, "income_details.xlsx");
        res.download("income_details.xlsx");
    }
    catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: `Error downloading income data: ${error.message}`
        })
    }
}

const getIncomeOverView = async (req, res) => {
    try {
        const userId = req.user.id;
        const { range = "monthly" } = req.query;
        const { start, end } = getDateRange(range);

        const incomes = await Income.find({
            userId,
            date: { $gte: start, $lte: end },
        }).sort({ date: -1 });

        const totalIncome = incomes.reduce((acc, cur) => acc + cur.amount, 0);
        const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;
        const numberOfTransactions = incomes.length;

        const recentTransactions = incomes.slice(0, 9);

        return res.json({
            success: true,
            message: "Income overview fetched successfully",
            data: {
                totalIncome,
                averageIncome,
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

export { postIncome, getAllIncome, updatedIncome, deletedIncome, downloadIncomeExcel, getIncomeOverView };