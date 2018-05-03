import fs from 'fs';
import csv from 'csvtojson';

const Converter = csv.Converter;

export class Importer {
    constructor() {  }

    import(path) {
        return new Promise( (res) => {
            const converter = new Converter({});
            converter.on('end_parsed', (jsonData) => {
                res(jsonData);
            });
            fs.createReadStream(path).pipe(converter);
        });
    }

    importSync(path) {
        const csvString = fs.readFileSync(path).toString();
        return Importer.csvToJsonConverter(csvString);
    }

    static csvToJsonConverter(csvString) {
        const result = [];
        const lines = csvString.split('\n');
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentLine = lines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
        return result;
    }
}