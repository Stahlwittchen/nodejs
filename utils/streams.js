const fs = require('fs');
const filePath = '../data/test.csv';
const reader = fs.createReadStream(filePath);
const through = require('through2');
reader
    .pipe(through(reverse))
    .pipe(through(transform))
    .pipe(process.stdout);

function reverse(chunk, enc, callback) {
    var splitString = chunk.toString().split("");
    var reverseArr = splitString.reverse();
    var joinArr = reverseArr.join("");

    this.push(joinArr)
    callback();
}
function transform(chunk, enc, callback) {
    var transform = chunk.toString().toUpperCase();
    this.push(transform)
    callback();
}
// function outputFile(filePath) { /* ... */ }
// function convertFromFile(filePath) { /* ... */ }
// function convertToFile(filePath) { /* ... */ }
