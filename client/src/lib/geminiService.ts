import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_MODEL_NAME } from './constants';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY environment variable is not set.");
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const analyzeCompany = async (prompt: string): Promise<string> => {
  if (!genAI) {
    throw new Error("Gemini APIクライアントが初期化されていません。APIキーが設定されているか確認してください。");
  }

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();
    
    if (!analysisText) {
      throw new Error("AIからの応答が空でした。");
    }
    return analysisText;

  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
        throw new Error(`Gemini APIリクエストに失敗しました: ${error.message}`);
    }
    throw new Error("Gemini APIリクエスト中に不明なエラーが発生しました。");
  }
};
