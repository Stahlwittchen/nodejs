const fs = require('fs');
const path = require('path');
const through = require('through2');
const csv = require('csvtojson');

function reverse() {
    process.stdin;

    let toUpperCase = through(function (chunk, enc, callback) {
        this.push(chunk.toString().split("").reverse().join("") + '\n');
        callback();
    });
    process.stdin.pipe(toUpperCase).pipe(process.stdout)
}

function transform() {
    process.stdin;

    let toUpperCase = through(function (chunk, enc, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    });
    process.stdin.pipe(toUpperCase).pipe(process.stdout)
}

function outputFile(file) {
    exists(file);
    let reader = fs.createReadStream(file);
    reader.pipe(process.stdout);
}

function convertFromFile(file) {
    exists(file);
    let reader = fs.createReadStream(file);

    reader.pipe(toJson(file)).pipe(process.stdout);
}

function convertToFile(file) {
    exists(file);
    let reader = fs.createReadStream(file);
    let writer = fs.createWriteStream("../data/test.json");

    reader.pipe(toJson(file)).pipe(writer);
}

const args = require('minimist')(process.argv.slice(2), {
    string: ['action', 'file', 'path', 'help'],
    alias: {a: 'action', f: 'file', p: 'path', h: 'help'}
});

function printHelp() {
    console.info(
        'Drop any command: \n' +
        '-a, --action (reverse, transform, outputFile, convertFromFile, convertToFile, cssBundler)\n-f, ' +
        '--file (path to file)\n-p,' +
        ' --path (path to ...)'
    );
}

function exists(filePath) {
    fs.exists(filePath, function (exist) {
        if (!exist) {
            console.log("File not exists!");
            process.exit();
        }
    })
}

const toJson = (file) => {
    return csv().fromFile(file).on("end_parsed", function (jsonData) {
        this.push(jsonData)
    })
};

function cssBundler(folderPath) {
    let bundeledPath = path.join(folderPath, 'bundle.css');

    return fs.readdir(folderPath, (err, files) => {
        if (err) throw err;
        fs.createWriteStream(bundeledPath);
        files
            .filter(fileName => path.extname(fileName) == '.css')
            .forEach(fileName => {
                console.log(fileName);
                fs.createReadStream(`${folderPath}\\${fileName}`)
                    .pipe(through(function(chunk, enc, cb) {
                        fs.appendFile(bundeledPath, Buffer.from(chunk).toString());
                        cb();
                    }));

            });
    });
}

switch (args.action) {
    case 'reverse':
        reverse();
    case 'transform':
        transform();
    case 'outputFile':
        outputFile(args.file);
        break;
    case 'convertFromFile':
        convertFromFile(args.file);
        break;
    case 'convertToFile':
        convertToFile(args.file);
        break;
    case 'cssBundler':
        cssBundler(args.path);
        break;
    default:
        printHelp()
}

