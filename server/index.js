import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connentDB from './db.js';
import { checkJWT } from './middlewars/jwt.js';
import { getHome, getHealth } from './controllers/health.js';
import { postSignup, postLogin, putUpdatedProfile, updatePassword } from './controllers/auth.js';
import { postIncome, getAllIncome, updatedIncome, deletedIncome, downloadIncomeExcel, getIncomeOverView  } from './controllers/income.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", getHome);
app.get("/health", getHealth);

app.post("/signup", postSignup);
app.post("/login", postLogin);
app.put("/profile", checkJWT, putUpdatedProfile);
app.put("/password", checkJWT, updatePassword);


app.post("/income", checkJWT, postIncome);
app.get("/income", checkJWT, getAllIncome);

app.put("/income/:id", checkJWT, updatedIncome);
app.get("/income/excel", checkJWT, downloadIncomeExcel);

app.delete("/income/:id", checkJWT, deletedIncome);
app.get("/income/overview", checkJWT, getIncomeOverView);


app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);

    connentDB();
})