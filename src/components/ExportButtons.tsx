import React from 'react';
import { Token } from '../types';
import { exportToCSV, exportToJSON, exportToXLS, exportToPDF } from '../utils/exportUtils';

interface ExportButtonsProps {
  tokens: Token[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ tokens }) => {
  const handleExport = (format: string) => {
    if (tokens.length === 0) {
      alert('No tokens to export. Please generate some tokens first.');
      return;
    }

    switch (format) {
      case 'csv':
        exportToCSV(tokens);
        break;
      case 'json':
        exportToJSON(tokens);
        break;
      case 'xlsx':
        exportToXLS(tokens);
        break;
      case 'pdf':
        exportToPDF(tokens);
        break;
      default:
        console.error('Unknown export format:', format);
    }
  };

  return (
    <div className="export-buttons">
      <button
        onClick={() => handleExport('csv')}
        className="export-button"
        disabled={tokens.length === 0}
      >
        Export CSV
      </button>
      <button
        onClick={() => handleExport('json')}
        className="export-button"
        disabled={tokens.length === 0}
      >
        Export JSON
      </button>
      <button
        onClick={() => handleExport('xlsx')}
        className="export-button"
        disabled={tokens.length === 0}
      >
        Export XLS
      </button>
      <button
        onClick={() => handleExport('pdf')}
        className="export-button"
        disabled={tokens.length === 0}
      >
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;