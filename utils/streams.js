const fs = require('fs');
const filePath = '../data/test.csv';
const reader = fs.createReadStream(filePath);
const through = require('through2')
reader
    .on('data', (data) => {
        console.log(data.toString())
    })
    .on('end', function () {
        console.log('done')
    })

//function reverse(str) {}
// function transform(str) { /* ... */ }
// function outputFile(filePath) { /* ... */ }
// function convertFromFile(filePath) { /* ... */ }
// function convertToFile(filePath) { /* ... */ }