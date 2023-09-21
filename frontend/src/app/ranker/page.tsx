import { ItemData, Match } from "@/src/components/match";
import { combinations, shuffle } from "@/src/utilities/array";
import fs from "fs";
import Papa from "papaparse";
import path from "path";

export default function Ranker() {
    const rows: Papa.ParseResult<ItemData> = Papa.parse(
        fs.readFileSync(
            path.resolve(process.cwd(), "src/app/ranker/items.csv"),
            {encoding: "utf-8"},
        ),
        {header: true},
    );
    const scores = rows.data.reduce(
        (object, item) => ({...object, [item.id]: {wins: [], losses: []}}),
        {},
    );
    const matches = shuffle(combinations(rows.data));
    console.log(matches.length);

    return matches.map(
        (match, index) => {
            return (
                <Match itemOne={match[0]} itemTwo={match[1]} key={index}></Match>
            );
        },
    );
}