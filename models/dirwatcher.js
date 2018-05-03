import EventEmitter from 'events';
import fs from 'fs';
import path from "path";

export class DirWatcher extends EventEmitter{

    constructor() {
        super();
        this.filesPathsInDirectory = new Map();
    }

    watch(dir, delay) {
        this.interval = setInterval(() => {

            fs.readdir(dir, (err, fileName) =>

                fileName.forEach(fileName => {

                    fs.stat(path.join(dir, fileName), (error, stats) => {
                        if (this.filesPathsInDirectory[fileName] !== stats.mtimeMs) {
                            this.filesPathsInDirectory[fileName] = stats.mtimeMs;
                            this.emit("changed",  path.join(dir, fileName));
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