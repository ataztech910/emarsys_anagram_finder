import readline from "readline";
import { SYSTEM_TEXT_LITERALS } from "./applicationConstants";

export const percentage = (partialValue, totalValue) => {
    const percents = Math.floor((100 * partialValue) / totalValue);
    return percents < 99 ? percents : 100;
}

export const writeWaitingPercent = (percent: number) => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${SYSTEM_TEXT_LITERALS.search}${percent}%`);
}
