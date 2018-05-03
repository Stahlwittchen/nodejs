import EventEmitter from 'events';
import fs from 'fs';

export class DirWatcher extends EventEmitter{

    constructor() {
        super();
        this.filesPathsInDirectory = new Map();
    }

    watch(path, delay) {
        fs.stat(path, (error, stats) => {

            this.interval = setInterval(() => {
                fs.readdir(path, (error, files) => {

                    files.forEach((fileName) => {
                        const filePath = `${path}\\${fileName}`;

                        fs.stat(filePath, (error, stats) => {
                            this.checkWasFileAdded(filePath, stats);
                            this.checkWasFileChanged(filePath, stats);
                            this.checkWasFileDeleted(path, files);
                        });
                    });
                });
            }, delay);
        });
    }

    checkWasFileAdded(filePath, stats) {
        if (!this.filesPathsInDirectory.has(filePath)) {
            this.filesPathsInDirectory.set(filePath, stats.size);
            this.emit('changed', filePath);
        }
    }

    checkWasFileChanged(filePath, stats) {
        if (this.filesPathsInDirectory.has(filePath) && this.filesPathsInDirectory.get(filePath) !== stats.size) {
            this.filesPathsInDirectory.set(filePath, stats.size);
            this.emit('changed', filePath);
        }
    }

    checkWasFileDeleted(path, files) {
        if (this.filesPathsInDirectory.size !== files.length) {
            for(let filePath of this.filesPathsInDirectory.keys()) {
                const fileName = filePath.substring(path.length + 1);
                if (!~files.indexOf(fileName)) {
                    this.filesPathsInDirectory.delete(filePath);
                }
            }
        }
    }

    unWatch() {
        clearInterval(this.interval);
    }
}