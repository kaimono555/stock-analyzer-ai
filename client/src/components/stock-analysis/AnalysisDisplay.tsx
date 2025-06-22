import React from 'react';

interface AnalysisDisplayProps {
  analysisResult: string;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysisResult }) => {
  // Convert markdown-style tables to HTML tables
  const formatAnalysisResult = (text: string) => {
    const lines = text.split('\n');
    const formattedLines = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if this line is a table row (contains |)
      if (line.includes('|') && line.trim().length > 0) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);
        
        // Check if next line is a separator (contains ---)
        const nextLine = lines[i + 1];
        const isSeparatorNext = nextLine && nextLine.includes('---');
        
        if (!inTable && isSeparatorNext) {
          // Start of table - this is header
          inTable = true;
          tableHeaders = cells;
          formattedLines.push('<div class="overflow-x-auto my-4">');
          formattedLines.push('<table class="min-w-full border-collapse border border-gray-600">');
          formattedLines.push('<thead class="bg-gray-600">');
          formattedLines.push('<tr>');
          cells.forEach(cell => {
            formattedLines.push(`<th class="border border-gray-500 px-3 py-2 text-left text-sky-400 font-semibold">${cell}</th>`);
          });
          formattedLines.push('</tr>');
          formattedLines.push('</thead>');
          formattedLines.push('<tbody>');
          i++; // Skip separator line
        } else if (inTable && cells.length > 0) {
          // Table row
          formattedLines.push('<tr class="hover:bg-gray-600/30">');
          cells.forEach((cell, index) => {
            const isFirstColumn = index === 0;
            const cellClass = isFirstColumn 
              ? "border border-gray-500 px-3 py-2 font-medium text-gray-200" 
              : "border border-gray-500 px-3 py-2 text-gray-300";
            formattedLines.push(`<td class="${cellClass}">${cell}</td>`);
          });
          formattedLines.push('</tr>');
        } else {
          // End of table or single line with |
          if (inTable) {
            formattedLines.push('</tbody>');
            formattedLines.push('</table>');
            formattedLines.push('</div>');
            inTable = false;
          }
          formattedLines.push(line);
        }
      } else {
        // Regular line
        if (inTable) {
          formattedLines.push('</tbody>');
          formattedLines.push('</table>');
          formattedLines.push('</div>');
          inTable = false;
        }
        
        // Format headings and special text
        let formattedLine = line;
        
        // Format headings with emojis and special styling
        if (line.startsWith('✅') || line.startsWith('🟡') || line.startsWith('⚠️') || line.startsWith('🔺') || line.startsWith('❌')) {
          formattedLine = `<div class="font-bold text-lg my-3 text-sky-400">${line}</div>`;
        } else if (line.startsWith('【') && line.endsWith('】')) {
          formattedLine = `<div class="font-bold text-lg my-3 text-yellow-400 bg-gray-600/30 p-2 rounded">${line}</div>`;
        } else if (line.startsWith('🔔') || line.startsWith('🔎') || line.startsWith('📈') || line.startsWith('🧭') || line.startsWith('🔚')) {
          formattedLine = `<div class="font-semibold text-base my-2 text-green-400">${line}</div>`;
        } else if (line.startsWith('◆')) {
          formattedLine = `<div class="font-semibold text-base my-2 text-orange-400 ml-4">${line}</div>`;
        } else if (line.trim().length === 0) {
          formattedLine = '<br/>';
        }
        
        formattedLines.push(formattedLine);
      }
    }
    
    // Close any open table
    if (inTable) {
      formattedLines.push('</tbody>');
      formattedLines.push('</table>');
      formattedLines.push('</div>');
    }
    
    return formattedLines.join('\n');
  };

  return (
    <div className="bg-gray-700/50 p-6 rounded-lg shadow-inner">
      <div 
        className="text-sm sm:text-base leading-relaxed text-gray-200"
        dangerouslySetInnerHTML={{ __html: formatAnalysisResult(analysisResult) }}
      />
    </div>
  );
};
