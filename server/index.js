import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connentDB from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Expense Tracker API"
    })
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy"
    })
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);

    connentDB();
})