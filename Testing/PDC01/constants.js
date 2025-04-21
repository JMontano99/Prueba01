module.exports = {
 fileXmlInput :"./resources/jmeterResources/XmlInputs/CSV_SingleGet_With_Post_Connected.xml",
 fileDataInput : "./resources/input.txt",
 fileXmlOutput : "./resources/jmeterResources/requestBuild",
 fileEncoding : "utf8",
 fileCsv : './resources/entities.csv',
 jsonSchema : './jsonSchema',
 excelfile : './resources/DataPool.xlsx',
 jmeterProperties: './resources/jmeterResources/properties/myjmeter.properties',
 xmlResultsOutput: './outputLogs/testresults.xml',
 jmeterLogOutput: './outputLogs/jmeterLog.log', 
 sheet : 'Data',
 dictFields: {
    "Body":"TextNullable",
    "Host": "TextNoNull",
    "Port": "Number",
    "Protocol": "TextNoNull",
    "Path":"TextNoNull",
    "Method":"TextNoNull",
    "Content":"TextNullable",
    "Accept":"TextNullable",
    "ApplicationJson": "TextNullable",
}
}