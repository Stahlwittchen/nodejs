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

            fs.readdir(dir, (error, fileName) => {

                if (error) {
                    throw new error(`this is a wrong path`);
                }

                fileName.forEach(fileName => {

                    fs.stat(path.join(dir, fileName), (error, stats) => {

                        if (error) {
                            throw new error(`can't read a file`);
                        }

                        if (this.filesPathsInDirectory[fileName] !== stats.mtimeMs) {
                            this.filesPathsInDirectory[fileName] = stats.mtimeMs;
                            this.emit("changed",  path.join(dir, fileName));
                        }
                    });
                })
            }
            );

        }, delay);

    }
    unWatch() {
        clearInterval(this.interval);
    }
}