import path from 'path';

import { DirWatcher } from './models/dirwatcher';
import { Importer } from './models/importer';

const dirWatcher = new DirWatcher();
const importer = new Importer();

const directoryPath = `${__dirname.slice(0, -4)}src${path.sep}data`;
const delayForWatching = 3000;
const delayForUnWatch = 50000;

try {
    dirWatcher.on('changed', (filePath) => {
        importer
            .import(filePath)
            .then((data) => {
                console.log(data[0]);
            });
    });

    dirWatcher.on('changed', (filePath) => {
        console.log(importer.importSync(filePath)[0]);
    });

    dirWatcher.watch(directoryPath, delayForWatching);

} catch (error) { }

setTimeout(() => {
    dirWatcher.unWatch();
}, delayForUnWatch);