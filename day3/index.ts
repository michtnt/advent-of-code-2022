import { readFileSync } from "fs";
import * as path from "path";

type PrioritiesDictionary = {
  [key: string]: number;
};

export const generatePrioritiesDictionary = (): PrioritiesDictionary => {
  let characters: string =
    "abcdefghijklmnopqrustvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let dictionary: PrioritiesDictionary = {};

  characters.split("").map((char) => {
    if (char === char.toLowerCase()) {
      dictionary[char] = char.charCodeAt(0) - 96;
    } else {
      /** uppercase characters start from 27 - 52 */
      dictionary[char] = char.charCodeAt(0) - 38;
    }
  });

  return dictionary;
};

export const getSumOfErroredItemInRucksack = (): number => {
  const data = parseRucksackDataToString();
  const prioritiesDictionary: PrioritiesDictionary =
    generatePrioritiesDictionary();

  let total: number = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const mid = Math.floor(line.length) / 2;
    const firstCompartment = data[i].substring(0, mid).split("");
    const secondCompartment = data[i].substring(mid, line.length).split("");

    for (let j = 0; j < secondCompartment.length; j++) {
      if (firstCompartment.indexOf(secondCompartment[j]) !== -1) {
        /** found the errored item (the matching char) */
        total += prioritiesDictionary[secondCompartment[j]];
        break;
      }
    }
  }

  return total;
};

export const getSumOfBadgeInRucksack = (): number => {
  const data = parseRucksackDataToString();
  const prioritiesDictionary: PrioritiesDictionary =
    generatePrioritiesDictionary();

  let total: number = 0;
  let occurrenceTracker: { [key: string]: number } = {};
  let hasAppeared: { [key: string]: boolean } = {};

  for (let i = 0; i < data.length; i++) {
    const line = data[i];

    if (i % 3 === 0) {
      /** different group: reset */
      occurrenceTracker = {};
    }

    hasAppeared = {};

    for (let j = 0; j < line.length; j++) {
      if (!occurrenceTracker[line[j]] && !hasAppeared[line[j]]) {
        occurrenceTracker[line[j]] = 1;
        hasAppeared[line[j]] = true;
      } else if (occurrenceTracker[line[j]] && !hasAppeared[line[j]]) {
        occurrenceTracker[line[j]]++;
        hasAppeared[line[j]] = true;
      }
    }

    Object.keys(occurrenceTracker).forEach((key, index) => {
      if (occurrenceTracker[key] === 3) {
        total += prioritiesDictionary[key];
      }
    });
  }

  return total;
};

/** utils */
export const parseRucksackDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

/** result */
console.log("sum of errored item in rucksack", getSumOfErroredItemInRucksack());
console.log("sum of badge in rucksack", getSumOfBadgeInRucksack());
