import { readFileSync } from "fs";
import * as path from "path";

export const getSumOfSignalStrengths = () => {
  let data = parseProgramToString();
  let map = new Map();
  let cycleCount = 1;
  let x = 1;

  data = data.map((line: any) => line.split(" "));

  data.forEach((item: any) => {
    let [action, addValue] = item;
    addValue = parseInt(addValue);

    if (action === "noop") {
      map.set(cycleCount, x);
      cycleCount++;
    } else {
      /** first cycle */
      map.set(cycleCount, x);
      cycleCount++;
      /** second cycle */
      map.set(cycleCount, x);
      x += addValue;
      cycleCount++;
    }
  });

  let start = 20;
  let cycleToTrack = 40;
  let sum = 0;

  for (let i = start; i <= cycleCount; i = i + cycleToTrack) {
    sum += map.get(i) * i;
  }

  return sum;
};

export const getEightCapitalLetters = () => {
  let data = parseProgramToString();
  let map = new Map();
  let cycleCount = 1;
  let x = 1;

  data = data.map((line: any) => line.split(" "));

  data.forEach((item: any) => {
    let [action, addValue] = item;
    addValue = parseInt(addValue);

    if (action === "noop") {
      map.set(cycleCount, x);
      cycleCount++;
    } else {
      /** first cycle */
      map.set(cycleCount, x);
      cycleCount++;
      /** second cycle */
      map.set(cycleCount, x);
      x += addValue;
      cycleCount++;
    }
  });

  let str = "";

  for (let i = 1; i < cycleCount; i++) {
    if (isSpriteVisible(i, map)) {
      str += "#";
    } else {
      str += ".";
    }
  
    if (i % 40 === 0) {
      str += "\n";
    }
  }
  return str;
};

/** utils */
const isSpriteVisible = (cycle: number, map: any) => {
  let diff = (cycle % 40 ? cycle % 40 : 40) - map.get(cycle);

  return diff >= 0 && diff <= 2;
};

export const parseProgramToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

console.log("signal strengths", getSumOfSignalStrengths());
console.log("8 capital letter on CRT \n", getEightCapitalLetters())