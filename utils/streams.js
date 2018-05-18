const fs = require('fs');
const filePath = '../data/test.csv';
const reader = fs.createReadStream(filePath);
const through = require('through2')
reader
    .pipe(through(reverse))
    .pipe(process.stdout);

function reverse(chunk, enc, callback) {
    var splitString = chunk.toString().split("");
    var reverseArr = splitString.reverse();
    var joinArr = reverseArr.join("");

    this.push(joinArr)
    callback();
}
// function transform(str) { /* ... */ }
// function outputFile(filePath) { /* ... */ }
// function convertFromFile(filePath) { /* ... */ }
// function convertToFile(filePath) { /* ... */ }
