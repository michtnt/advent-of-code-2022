import { readFileSync } from "fs";
import * as path from "path";

export const getCombinationOfTopCrateInStack = (): string => {
  let stackiest = [];
  let answer = "";
  let input = parseInputDataToString();

  const lines = input
    .substring(input.indexOf("move"), input.length)
    .split("\n");

  const stackish = input
    .substring(0, input.lastIndexOf("]") + 1)
    .split("\n")
    .map((stack) =>
      [...stack.matchAll(/(\[([A-Z])\]\s?|\s{4})/gi)].map((item) => item[2])
    );

  for (let i = 0; i < 9; i++) {
    stackiest[i] = [];
    for (let j = stackish.length - 1; j >= 0; j--) {
      if (stackish[j].length && stackish[j][i]) {
        /** @ts-ignore */
        stackiest[i].push(stackish[j][i]);
      }
    }
  }

  for (let line of lines) {
    let [count, from, to] = line
      .replace(/(move |from |to )/g, "")
      .split(" ")
      .map(Number);
    for (let i = 0; i < count; i++) {
      /** @ts-ignore */
      stackiest[to - 1].push(stackiest[from - 1].pop());
    }
  }

  for (let stack of stackiest) {
    answer += stack[stack.length - 1];
  }

  return answer;
};

export const getCombinationOfTopCrateInStackPartTwo = (): string => {
  let stackiest = [];
  let answer = "";
  let input = parseInputDataToString();

  const lines = input
    .substring(input.indexOf("move"), input.length)
    .split("\n");

  const stackish = input
    .substring(0, input.lastIndexOf("]") + 1)
    .split("\n")
    .map((stack) =>
      [...stack.matchAll(/(\[([A-Z])\]\s?|\s{4})/gi)].map((item) => item[2])
    );

  for (let i = 0; i < 9; i++) {
    stackiest[i] = [];
    for (let j = stackish.length - 1; j >= 0; j--) {
      if (stackish[j].length && stackish[j][i]) {
        /** @ts-ignore */
        stackiest[i].push(stackish[j][i]);
      }
    }
  }

  for (let line of lines) {
    let [count, from, to] = line
      .replace(/(move |from |to )/g, "")
      .split(" ")
      .map(Number);
    const start = stackiest[from - 1].length - count;
    for (let j = 0; j < count; j++) {
      if (stackiest[from - 1][start + j]) {
        stackiest[to - 1].push(stackiest[from - 1][start + j]);
      }
    }
    for (let k = 0; k < count; k++) {
      stackiest[from - 1].pop();
    }
  }

  for (let stack of stackiest) {
    answer += stack[stack.length - 1];
  }

  return answer;
};

/** utils */
export const parseInputDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt")).toString();
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
