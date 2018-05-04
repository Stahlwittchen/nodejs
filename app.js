//import path from 'path';

import { DirWatcher } from './models/dirwatcher';
import { Importer } from './models/importer';

const dirWatcher = new DirWatcher();
const importer = new Importer();

const directoryPath = './data';
const delayForWatching = 3000;
const delayForUnWatch = 50000;

dirWatcher.on('changed', (filePath) => {
    importer
        .import(filePath)
        .then((data) => {
            console.log(data[0]);
        });
    console.log(importer.importSync(filePath)[0]);
});

dirWatcher.watch(directoryPath, delayForWatching);

setTimeout(() => {
    dirWatcher.unWatch();
}, delayForUnWatch);