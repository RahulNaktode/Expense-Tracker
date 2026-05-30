import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Gemini AI ko initialize karein
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("API KEY:", process.env.GEMINI_API_KEY);

const processExpenseText = async (req, res) => {
  try {
    const { userText } = req.body;

    if (!userText) {
      return res.json({ error: "Text is required" });
    }

    // Gemini Pro model ka use karenge text processing ke liye
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // AI ko strict instructions dene ke liye PROMPT engineering
    const prompt = `
      You are an expert financial data extractor. 
      Analyze the following text and extract the expense details: "${userText}".
      
      Respond ONLY with a valid JSON object. Do not include any markdown formatting like \`\`\`json or regular text. 
      The JSON must strictly follow this structure:
      {
        "amount": number or null,
        "category": "Food" | "Travel" | "Shopping" | "Entertainment" | "Utilities" | "Others",
        "description": "string describing the expense",
        "date": "YYYY-MM-DD" (Use current date ${new Date().toISOString().split('T')[0]} if year/date is missing or implies today)
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // AI ke response (String) ko JSON me parse karein
    const expenseData = JSON.parse(responseText);

    // Response frontend ko bhej dein
    res.json({
      success: true,
      data: expenseData
    });

  } catch (error) {
    console.error("AI Processing Error:", error);
    res.json({ error: "AI could not process the text. Please try again." });
  }
};

export { processExpenseText };