const exec  = require("child_process").exec;

var methods = {
    excecuteCommand: function (command){
        return new Promise((resolve, err) => {
            exec(command, (error, stdout, stderr) =>{
                if(err) {
                    console.log(err);
                }
                resolve(stdout? stdout : stderr);
            });
        });
    }
}

exports.data = methods;