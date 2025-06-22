import { useState, useCallback } from 'react';
import { StockInputForm } from '@/components/stock-analysis/StockInputForm';
import { AnalysisDisplay } from '@/components/stock-analysis/AnalysisDisplay';
import { LoadingSpinner } from '@/components/stock-analysis/LoadingSpinner';
import { analyzeCompany } from '@/lib/geminiService';
import { PromptTemplates } from '@/lib/constants';

export default function StockAnalysis() {
  const [companyQuery, setCompanyQuery] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!companyQuery.trim()) {
      setError('企業名または銘柄コードを入力してください。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    // Combine company query with the full prompt template
    const fullPrompt = `
以下の企業について分析してください:
${companyQuery}

${PromptTemplates.FULL_ANALYSIS_PROMPT}
`;

    try {
      const result = await analyzeCompany(fullPrompt);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? `分析中にエラーが発生しました: ${err.message}` : '分析中に不明なエラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  }, [companyQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-gray-100 p-4 sm:p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <div className="bg-gradient-to-r from-sky-400 to-blue-600 py-4 px-8 rounded-lg mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            株式分析AIアプリ_v1.0
          </h1>
        </div>
        <p className="text-gray-400 mt-2 text-lg">Gemini APIを活用した詳細な企業分析レポート</p>
      </header>

      <main className="w-full max-w-4xl bg-gray-800 shadow-2xl rounded-xl p-6 sm:p-10">
        <StockInputForm
          companyQuery={companyQuery}
          setCompanyQuery={setCompanyQuery}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 bg-red-700/50 border border-red-500 text-red-300 rounded-lg text-center">
            <p className="font-semibold">エラー</p>
            <p>{error}</p>
          </div>
        )}

        {analysisResult && !isLoading && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-sky-400">分析結果</h2>
            <AnalysisDisplay analysisResult={analysisResult} />
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} 株式分析AIアプリ. All rights reserved.</p>
        <p className="mt-1">分析結果はAIによって生成されたものであり、投資助言ではありません。最終的な投資判断はご自身で行ってください。</p>
      </footer>
    </div>
  );
}
