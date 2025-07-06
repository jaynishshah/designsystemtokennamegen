import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { Token } from '../types';

export const exportToCSV = (tokens: Token[]) => {
  const headers = ['Token Name', 'Token Type'];
  const rows = tokens.map(token => [token.name, token.type]);
  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'design-tokens.csv');
};

export const exportToJSON = (tokens: Token[]) => {
  const jsonContent = JSON.stringify(tokens, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  saveAs(blob, 'design-tokens.json');
};

export const exportToXLS = (tokens: Token[]) => {
  const worksheet = XLSX.utils.json_to_sheet(tokens.map(token => ({
    'Token Name': token.name,
    'Token Type': token.type
  })));
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Design Tokens');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, 'design-tokens.xlsx');
};

export const exportToPDF = (tokens: Token[]) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Design Tokens', 20, 20);
  
  doc.setFontSize(12);
  let y = 40;
  
  doc.text('Token Name', 20, y);
  doc.text('Token Type', 120, y);
  y += 10;
  
  doc.line(20, y, 190, y);
  y += 10;
  
  tokens.forEach(token => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    doc.text(token.name, 20, y);
    doc.text(token.type, 120, y);
    y += 8;
  });
  
  doc.save('design-tokens.pdf');
};