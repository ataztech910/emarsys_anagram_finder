import { partialSearch } from "./utils/searchInArray";
import { readStreamFromFile } from "./utils/readStreamFromFile";
import { ApplicationResult } from "./utils/applicationConstants";

describe.only("Application Test", () => {
    let applicationResultMock = null;
    const mockDB = [
        "fenester",    "fenestor",
        "fenestr",     "fenestra",
        "fenestrae",   "fenestraje",
        "fenestral",   "fenestralis",
        "fenestram",   "fenestrans",
        "fenestrare",  "fenestrata",
        "fenestraion", "stratafene",
        "fstrataene",  "strfeneata",
        ""
    ];
    const mockGroupedPart = {
        "aaeefnrstt": [ "fenestrata", "stratafene", "fstrataene", "strfeneata" ],
    };
    const applicationResult: ApplicationResult = {
        input: "",
        output: []
    }

    beforeEach(() => {
        applicationResultMock = applicationResult;
    });

    it.only("Should initiate an Application", () => {
        expect(applicationResultMock.input).toEqual("");
        expect(applicationResultMock.output).toHaveLength(0);
    });


    it.only("Should read file in grouped array", () => {
        return readStreamFromFile("wordlist_test.txt", false, true).then(
            (result: Partial<any>) => {
               expect(result["aaeefnrstt"]).toEqual(mockGroupedPart["aaeefnrstt"]);
            });
    });

    it.only("Should read file in straight array", () => {
        return readStreamFromFile("wordlist_test.txt", true, true).then(
            (result: Array<string>) => {
                expect(result).toEqual(mockDB);
            });
    });

    it.only("Should find a value in array", async () => {
        return partialSearch(
            0,
            mockDB.length,
            "stratafene".split("").sort(),
            mockDB,
            applicationResultMock).then((result: Array<string>) => {
                expect(result.length).toBeGreaterThan(1);
        });
    });
});
