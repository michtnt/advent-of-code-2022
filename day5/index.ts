import { readFileSync } from "fs";
import * as path from "path";

export const getCombinationOfTopCrateInStack = (): string => {
  let answer = "";
  let [moves, sortedStacks] = parseCratesDataToString();

  for (let move of moves) {
    let [count, from, to] = move
      .replace(/(move |from |to )/g, "")
      .split(" ")
      .map(Number);

    for (let i = 0; i < count; i++) {
      /** @ts-ignore */
      sortedStacks[to - 1].push(sortedStacks[from - 1].pop());
    }
  }

  for (let stack of sortedStacks) {
    answer += stack[stack.length - 1];
  }

  return answer;
};

export const getCombinationOfTopCrateInStackPartTwo = (): string => {
  let answer = "";
  let [moves, sortedStacks] = parseCratesDataToString();

  for (let move of moves) {
    let [count, from, to] = move
      .replace(/(move |from |to )/g, "")
      .split(" ")
      .map(Number);
    const start = sortedStacks[from - 1].length - count;

    for (let i = 0; i < count; i++) {
      if (sortedStacks[from - 1][start + i]) {
        sortedStacks[to - 1].push(sortedStacks[from - 1][start + i]);
      }
    }
    for (let k = 0; k < count; k++) {
      sortedStacks[from - 1].pop();
    }
  }

  for (let stack of sortedStacks) {
    answer += stack[stack.length - 1];
  }

  return answer;
};

/** utils */
export const parseCratesDataToString = (): [
  moves: string[],
  sortedStacks: string[][]
] => {
  const input = readFileSync(path.join(__dirname, "./input.txt")).toString();

  const moves = input
    .substring(input.indexOf("move"), input.length)
    .split("\n");

  const unsortedStack = input
    .substring(0, input.lastIndexOf("]") + 1)
    .split("\n")
    .map((stack) =>
      [...stack.matchAll(/(\[([A-Z])\]\s?|\s{4})/gi)].map((item) => item[2])
    );

  let sortedStacks: string[][] = [];

  for (let i = 0; i < 9; i++) {
    sortedStacks[i] = [] as any;
    for (let j = unsortedStack.length - 1; j >= 0; j--) {
      if (unsortedStack[j].length && unsortedStack[j][i]) {
        /** @ts-ignore */
        sortedStacks[i].push(unsortedStack[j][i]);
      }
    }
  }

  return [moves, sortedStacks];
};

/** result */
console.log(
  "combination of top crate in stack",
  getCombinationOfTopCrateInStack()
);

console.log(
  "combination of top crate in stack part 2",
  getCombinationOfTopCrateInStackPartTwo()
);
