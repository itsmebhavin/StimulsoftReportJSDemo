﻿exports.printReport = function () {
    var fs = require('fs');
    var stripBom = require('strip-bom');
    var sr = require('./stimulsoft.reports.js');
    console.log("Stimulsoft Reports Loaded");

    var report = new sr.Stimulsoft.Report.StiReport();
    console.log("New Report Created");

    var reportTemplate = fs.readFileSync('./VINReport.mrt', "utf8");
    report.load(reportTemplate);
    console.log("Report Template Loaded");

    var demoData = stripBom(fs.readFileSync('./VINPrintObject.json', "utf8"));
    report.dictionary.databases.clear();
    report.regData("Demo", "Demo", demoData);
    console.log("Demo data loaded into the report. Tables Count: ", report.dataStore.count);

    report.render();
    console.log("Report rendered. Pages Count: ", report.renderedPages.count);

    // Creating export settings
    var settings = new sr.Stimulsoft.Report.Export.StiPdfExportSettings();

    // Creating export service
    var service = new sr.Stimulsoft.Report.Export.StiPdfExportService();

    // Creating MemoryStream
    var stream = new sr.System.IO.MemoryStream();

    // Exportong report into the MemoryStream
    service.exportTo(report, stream, settings);

    // Converting MemoryStream into Array
    var data = stream.toArray();

    // Converting Array into buffer
    var buffer = new Buffer(data, "utf-8")

    // Saving rendered report in PDF into a file
    fs.writeFileSync('./VinReport.pdf', buffer);
    console.log("Rendered report saved into PDF-file.");
    
}