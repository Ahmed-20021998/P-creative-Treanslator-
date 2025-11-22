// app/api/AI/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const { text, language } = await req.json();

  const prompt = `ترجم الجملة دي إلى  ${language} بدون مقدمة أو شرح\n\n${text}`;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translated = response.text();

    return Response.json({ translated });
  } catch (error) {
    console.error("Error from Gemini:", error);
    return Response.json({ error: "Translation failed" }, { status: 500 });
  }
}
