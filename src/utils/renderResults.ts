import readline from "readline";
import { ApplicationResult } from "./applicationConstants";

export const renderResults = (applicationResult: ApplicationResult) => {
    readline.clearLine(process.stdout, 0);
    process.stdout.write(`\r\r`);
    console.log("");
    console.log(applicationResult);
}
