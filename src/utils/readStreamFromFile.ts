import * as fs from "fs";
import * as es from "event-stream";
import * as config from "../config.json";
import * as path from "path";

export const readStreamFromFile = (file: string, straightWay: boolean, test = false) => {
    return new Promise((resolve, reject) => {
        let db: Array<string> | Partial<any>;
        if (straightWay) {
            db = [];
        } else {
            db = {};
        }
        console.log('Loading file. Please wait...');
        const s = fs.createReadStream(path.join(path.resolve(test ? "./src" : "./dist"),'/public', file))
            .pipe(es.split())
            .pipe(es.mapSync(function(line){
                    s.pause();
                    if (straightWay) {
                        db.push(line);
                    } else {
                       const sorted = line.split('').sort().join('');
                       if (!db[sorted]) {
                           db[sorted] = [];
                       }
                       db[sorted].push(line);
                    }
                    s.resume();
                })
                    .on('error', function(err){
                        console.log('Error while reading file.', err);
                        reject(err);
                    })
                    .on('end', function(){
                        resolve(config.straightWay ? db.sort() : db);
                        console.log('File is loaded. Proceed with an application');
                        s.end();
                        s.destroy();
                    })
            );
    });
}
// export default readStreamFromFile;
