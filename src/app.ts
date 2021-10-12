import * as readline from "readline";
import * as config from "./config.json";
import { ApplicationResult, READ_PROMISE_LIMIT, SYSTEM_TEXT_LITERALS } from "./utils/applicationConstants";
import { renderResults } from "./utils/renderResults";
import { partialSearch } from "./utils/searchInArray";
import { readStreamFromFile } from "./utils/readStreamFromFile";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let globalDB = [];

let applicationResult: ApplicationResult = {
    input: "",
    output: []
};

export const recursiveAsyncReadLine = () => {
    console.log(SYSTEM_TEXT_LITERALS.exitText);
    rl.question(SYSTEM_TEXT_LITERALS.question, function (inputString: string) {
        if (inputString.trim() === '!q') {
            console.log(SYSTEM_TEXT_LITERALS.exit);
            return rl.close();
        }
        applicationResult = {
            input: inputString,
            output: []
        };
        applicationResult.input = inputString;

        if (config.straightWay) {
            console.log("Word base size", globalDB.length);
            const inputWordArray = inputString.split('').sort();
            const promiseStepsCount = Math.ceil(globalDB.length / READ_PROMISE_LIMIT);
            const promisesArray = [];
            for (let i = 0; i < promiseStepsCount; i++) {
                promisesArray.push(partialSearch(
                    i * READ_PROMISE_LIMIT,
                    (i * READ_PROMISE_LIMIT + READ_PROMISE_LIMIT) - 1,
                    inputWordArray,
                    globalDB,
                    applicationResult));
            }
            Promise.all(promisesArray).then((result) => {
                let concatArray = [];
                const notEmptyResultData = result.filter(item => item && item.length > 0);
                if (notEmptyResultData && notEmptyResultData.length > 1) {
                    for(let i = 0; i < result.length; i++) {
                        concatArray = concatArray.concat(result[i]);
                    }
                }
                applicationResult.output = concatArray;
                renderResults(applicationResult);
                recursiveAsyncReadLine();
            }).catch(e => {
                console.log(e);
            });
        } else {
            applicationResult.output = globalDB[inputString.split('').sort().join('')];
            renderResults(applicationResult);
            recursiveAsyncReadLine();
        }
    });
};

readStreamFromFile(config.dbFile, config.straightWay).then((result: Array<any>) => {
   if (!result || result.length === 0) {
       console.log(SYSTEM_TEXT_LITERALS.errorWithFile);
       return rl.close();
   }
   globalDB = result;
   recursiveAsyncReadLine();
});




