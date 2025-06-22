
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will be caught by the App component and displayed to the user.
  // In a real production app, you might want to handle this more gracefully
  // or ensure the build process fails if the API key is not set.
  console.error("API_KEY environment variable is not set.");
  // To make it visible in UI, we can throw it so it's caught by the caller.
  // However, for this specific app structure, it's better to let the App.tsx handle errors from analyzeCompany
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const analyzeCompany = async (prompt: string): Promise<string> => {
  if (!ai) {
    throw new Error("Gemini APIクライアントが初期化されていません。APIキーが設定されているか確認してください。");
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
       // No specific thinkingConfig, use default for higher quality.
       // No googleSearch tool specified as the prompt covers general analysis.
       // The prompt asks for web search, which Gemini will interpret based on its capabilities.
    });
    
    // The .text property directly provides the string output.
    const analysisText = response.text;
    if (!analysisText) {
      throw new Error("AIからの応答が空でした。");
    }
    return analysisText;

  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
        // Check for specific Gemini API error structures if available, or rethrow generic.
        // For example, if error has a 'message' property from the API response.
        throw new Error(`Gemini APIリクエストに失敗しました: ${error.message}`);
    }
    throw new Error("Gemini APIリクエスト中に不明なエラーが発生しました。");
  }
};
