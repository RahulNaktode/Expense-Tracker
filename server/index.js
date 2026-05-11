import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connentDB from './db.js';
import { checkJWT } from './middlewars/jwt.js';
import { getHome, getHealth } from './controllers/health.js';
import userRouter from './routes/user.js';
import expenseRouter from './routes/expense.js';
import incomeRouter from './routes/income.js';
import dashboardRouter from './routes/dashboard.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", getHome);
app.get("/health", getHealth);

app.use("/user", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);
app.use("/dashboard", checkJWT, dashboardRouter);


app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);

    connentDB();
})