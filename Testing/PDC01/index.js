const readFile = require('./readfiles');
const writeFile = require('./writefiles');
const excecCom = require('./excecuteCommand');
const re = require('./readExcel');
const br = require('./buildRequest');
const vi = require('./validateInput');
const constants = require('./constants');
const commons = require('./commonsUtils');

const start = async () => {

    var totalEntities = process.argv[2];
    
    var excelJson = re.data.readExcel(constants.excelfile, constants.sheet);
    let testParamss = readFile.data.readFileSync(constants.jsonSchema, constants.fileEncoding);
    var schema = JSON.parse(testParamss);
    
    var arrayEntities = commons.data.getData(totalEntities, schema, excelJson);
    let xml_string = readFile.data.readFileSync(constants.fileXmlInput, constants.fileEncoding);
    let testParams = readFile.data.readFileSync(constants.fileDataInput, constants.fileEncoding);

    await writeFile.data.writeFileArrayCsv(constants.fileCsv, arrayEntities);
    var path = commons.data.getCsvPath(constants.fileCsv);

    var objectParams = JSON.parse(testParams);

    if (!vi.data.validateParams(objectParams, constants.dictFields)){
        console.log("The input is now well constructed");
        return;
    }

    var countFiles = objectParams.TestGroups.length

    for(var i = 0; i < countFiles; i++){
        var testGroup = objectParams.TestGroups[i];
        var loop  = testGroup.ThreadGroup.Loop;
        var thread = testGroup.ThreadGroup.Thread;
        var ramp = testGroup.ThreadGroup.Ramp;

        for (var req in testGroup.Requests){

            if(testGroup.Requests[req].UseCsv){
                testGroup.Requests[req].CsvVariables = br.data.createCsvVariables(schema);
                testGroup.Requests[req].CsvRoute = path;
            }
            if(testGroup.Requests[req].Method.toUpperCase() !== "GET") {
                testGroup.Requests[req].Body = br.data.createBody(testGroup.Requests[req], schema);
            }
            
            testGroup.Requests[req].Loop = loop;
            testGroup.Requests[req].Thread = thread;
            testGroup.Requests[req].Ramp = ramp;
            xml_string =  br.data.replaceData(xml_string, testGroup.Requests[req]);
        }

        let fileName = `${constants.fileXmlOutput}${i}.jmx`;
        let command = `jmeter -n -t ${fileName} -p ${constants.jmeterProperties} -f -l ${constants.xmlResultsOutput} -j ${constants.jmeterLogOutput}`;
        console.log(command);

        writeFile.data.writFileSync(fileName, xml_string);
        await excecCom.data.excecuteCommand(command);
    }
}

start();