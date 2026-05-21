import toast from 'react-hot-toast'
import * as XLSX from 'xlsx'

export const exportToExcel = (data, fileName="transaction") => {
    if(!data || data.length === 0){
        toast.error("No data to export");
        return;
    }

    try{
        const workSheet = XLSX.utils.json_to_sheet(data);

        const workBook =XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Transactions");

        XLSX.writeFile(workBook, `${fileName}.xlsx`, {
            bookType: 'xlsx',
            type: 'array'
        });
    }catch(error){
        console.error("Export error:", error)
        toast.error("Error export data, Please Try again.")
    }
}