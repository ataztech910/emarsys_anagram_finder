export const enum SYSTEM_TEXT_LITERALS {
    question = "Please type the word to check ?: ",
    exit = "Thanks for using this software. See you next time",
    search = "Search in database. Please wait...",
    errorWithFile = "Unfortunately database is not loaded. Please check the file",
    exitText = "Type '!q' to stop the program."
}
export const READ_PROMISE_LIMIT = 1000;

export type ApplicationResult = {
        input: string,
        output: Array<string>
}
