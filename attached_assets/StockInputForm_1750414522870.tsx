
import React from 'react';

interface StockInputFormProps {
  companyQuery: string;
  setCompanyQuery: (query: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const StockInputForm: React.FC<StockInputFormProps> = ({
  companyQuery,
  setCompanyQuery,
  onAnalyze,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="companyQuery" className="block text-sm font-medium text-gray-300 mb-1">
          企業名または銘柄コード
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="companyQuery"
            id="companyQuery"
            value={companyQuery}
            onChange={(e) => setCompanyQuery(e.target.value)}
            className="flex-1 block w-full rounded-none rounded-l-md bg-gray-700 border-gray-600 focus:ring-sky-500 focus:border-sky-500 sm:text-sm p-3 placeholder-gray-500 text-gray-100"
            placeholder="例: ソシオネクスト または 6526"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !companyQuery.trim()}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-150"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                分析中...
              </>
            ) : (
              'GO'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
