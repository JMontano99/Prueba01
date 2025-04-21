const xlsx = require('xlsx');

var methods = {
    readExcel: function(excelFile, sheet){
        const workbook = xlsx.readFile(excelFile);
        return xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    }
}


exports.data = methods;