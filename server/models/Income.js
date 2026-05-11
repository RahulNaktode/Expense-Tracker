import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    type: {
        type: String,
        default: "income"
    }
},{
    timestamps: true
}
)

const Income = mongoose.models.Income || mongoose.model("Income", IncomeSchema);

export default Income;