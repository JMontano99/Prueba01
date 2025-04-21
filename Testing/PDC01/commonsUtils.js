var methods = {
     getCsvPath: function(file){
        var path = __dirname + file;
        path = path.replace('.','');
        while(path.includes('\\')){
            path = path.replace('\\','/');
        }
        return path;
    },
    getData: function(amount, schema, dataArray) {
        let arrayObjects=[];
        for(var i = 0; i <amount; i++){
            let baseObject = new Object();
            baseObject = generateObject(schema.properties, dataArray, baseObject);
            arrayObjects.push(baseObject);
        }
        return arrayObjects;
    }
}

function generateObject(obj, dataArray, baseObject){
    for (let p in obj){
        if(Reflect.get(obj, p).type !== undefined && Reflect.get(obj, p).type === 'object') {
            addObjectProperty(obj, p, dataArray, baseObject);
        }
        else if(Reflect.get(obj, p).type !== undefined && Reflect.get(obj, p).type === 'array') {
            addArrayProperty(obj, p, dataArray, baseObject);
        }
        else{
            setBaseProperty(baseObject, p, dataArray);
        }
    }
    return baseObject;
}

function generateRandomData(dataArray, property){
         var dataValues = dataArray.filter(x => Reflect.get(x, property) !== undefined).map(y => Reflect.get(y, property));
         let randomNumber = Math.floor(Math.random() * (dataValues.length)); 
     return dataValues[randomNumber];

}

function setBaseProperty(object, property, dataArray){
    Reflect.set(object, property, generateRandomData(dataArray, property));
}

function addObjectProperty(objectAnalize, property, dataArray, baseObject){
    baseObject = baseObject === undefined ? {} : baseObject;
    Reflect.set(baseObject, property, {});
    var objectToSend = Reflect.get(objectAnalize, property);
    
    if(objectToSend.type === 'array'){
        generateObject(objectToSend.items.properties, dataArray, Reflect.get(baseObject, property));
    }
    else{
        generateObject(objectToSend.properties, dataArray, Reflect.get(baseObject, property));
    }
    
    return baseObject;
}

function addArrayProperty(objectAnalize, property, dataArray, baseObject){
    var arrayData = [];
    let objectToSend = Reflect.get(objectAnalize, property);
    let count = objectToSend.maxLength;
    var type =objectToSend.items.type;
    for(var i = 0; i < count; i++){
        if(type === 'object'){
            
            var object = addObjectProperty(objectAnalize, property, dataArray, new Object());
            arrayData.push(Reflect.get(object, property));
        }
        else{
            var value = generateRandomData(dataArray, property);
            arrayData.push(value);
        }    
    }
    Reflect.set(baseObject, property, arrayData);
}

exports.data = methods;