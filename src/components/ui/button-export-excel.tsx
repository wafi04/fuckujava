import * as XLSX from 'xlsx';
import { Button } from './button';

export const ExportToExcel = ({ data, fileName }: { data: [], fileName: string }) => {
  const handleExport = () => {
    // Buat worksheet dari data
    const ws = XLSX.utils.json_to_sheet(data);

    // Buat workbook dan tambahkan worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Export file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Button onClick={handleExport}>
      Export to Excel
    </Button>
  );
};