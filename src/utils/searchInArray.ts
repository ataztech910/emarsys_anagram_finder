import { ApplicationResult, SYSTEM_TEXT_LITERALS } from "./applicationConstants";
import { percentage, writeWaitingPercent } from "./percenRender";

export const partialSearch = (start: number, end: number, inputWordArray: Array<string>, database: Array<any>, result: ApplicationResult): Promise<unknown> => {
    const internalResult = [];
    return new Promise( (resolve, reject) => {
        if (!database || database.length === 0) {
            reject(SYSTEM_TEXT_LITERALS.errorWithFile);
        }
        for (let i = start; i < end; i++) {
            if (database[i] && database[i].trim() !== "") {
                const wordArray = database[i].split('').sort();
                if (JSON.stringify(wordArray) === JSON.stringify(inputWordArray)) {
                    internalResult.push(database[i]);
                }
                const percent = percentage(i + 1, database.length);
                writeWaitingPercent(percent);
            }
        }
        resolve(internalResult);
    });
};
