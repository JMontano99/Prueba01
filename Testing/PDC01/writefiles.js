const fsp = require('fs').promises;
const fs = require('fs');

var methods = {
    writeFileArrayCsv: async function (fileName, data){
        let fileData = '';
        for(let i = 0; i<data.length; i++){
            let line = '';
            for (let p in data[i]){
                if(line != ''){
                    line+= ';';
                }
                var value = '';
                if(typeof(data[i][p]) === 'object'){
                    value = JSON.stringify(data[i][p]);
                }else{
                    value =  `${data[i][p]}`;
                }

                line += value;
            }
            fileData += line + '\n';
        }
    
        await fsp.writeFile(fileName, fileData);
    },
    
    writFileSync: function (fileName, data){
        fs.writeFileSync(fileName, data)
    }
}

exports.data = methods;
