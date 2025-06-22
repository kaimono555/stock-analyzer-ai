
import React from 'react';

interface AnalysisDisplayProps {
  analysisResult: string;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysisResult }) => {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg shadow-inner">
      <pre className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed font-mono text-gray-200">
        {analysisResult}
      </pre>
    </div>
  );
};
