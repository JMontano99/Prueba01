var methods = {
    validateParams: function (objectParams, dictFields) {
        if (objectParams == undefined ||
            objectParams.TestGroups == undefined ||
            !Array.isArray(objectParams.TestGroups)) {
            return false;
        }
    
        var fileCorrect = true;
        objectParams.TestGroups.forEach(tg =>{
            tg.Requests.forEach(test => {
                for (var key in dictFields) {
    
                    if (!Reflect.has(test, key) && dictFields[key] !== 'TextNullable') {
                        fileCorrect = false;
                        break;
                    }
    
                    if (dictFields[key] === 'Number' && typeof(Reflect.get(test, key)) != 'number'){
                        fileCorrect = false;
                        break;
                    }
    
                    if(dictFields[key] === 'TextNoNull' && (Reflect.get(test, key) == undefined || Reflect.get(test, key == '' ))){
                        fileCorrect = false;
                        break;
                    }
    
                    if(dictFields[key] === 'Text' && Reflect.get(test, key) == undefined) {
                        fileCorrect = false;
                        break;
                    }
                }
            });
        });

        return fileCorrect;
    }
}

exports.data = methods;