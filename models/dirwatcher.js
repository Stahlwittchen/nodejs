import EventEmitter from 'events';
import fs from 'fs';
import path from "path";

export class DirWatcher extends EventEmitter{

    constructor() {
        super();
        this.filesPathsInDirectory = new Map();
    }

    watch(path, delay) {
        this.interval = setInterval(() => {

            fs.readdir(path, (err, fileName) =>

                fileName.forEach(fileName => {

                    const filePath = `${path}\\${fileName}`;
                    
                    fs.stat(filePath, (error, stats) => {
                        if (this.filesPathsInDirectory[fileName] !== stats.mtimeMs) {
                            this.filesPathsInDirectory[fileName] = stats.mtimeMs;
                            this.emit("changed", filePath);
                        }
                    });
                })
            );

        }, delay);

    }
    unWatch() {
        clearInterval(this.interval);
    }
}