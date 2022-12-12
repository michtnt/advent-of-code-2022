import { readFileSync } from "fs";
import * as path from "path";

let divisiblePart2 = 1;

export const getMonkeyBusiness = (
  numberOfRounds: number,
  boredItemFunction: Function
) => {
  const data = parseMonkeyDataToString();

  let monkeyItems: any[] = [];
  let activeMonkeys = [];
  divisiblePart2 = 1;

  for (let i = 0; i < data.length; i++) {
    const lines = data[i].split("\n");
    const worryLevel = lines[1].match(/\d+/g);
    const divisibleNumber = Number(lines[3].split(" ")[5]);

    monkeyItems[i] = worryLevel;
    activeMonkeys[i] = 0;
    divisiblePart2 *= divisibleNumber;
  }

  for (let j = 0; j < numberOfRounds; j++) {
    for (let i = 0; i < data.length; i++) {
      /** processing */
      const lines = data[i].split("\n");

      const operationArray = lines[2].split(" ");
      let valueX = operationArray[5] === "old" ? -1 : Number(operationArray[5]);
      const operation = operationArray[6];
      let valueY = operationArray[7] === "old" ? -1 : Number(operationArray[7]);

      const divisibleNumber = lines[3].split(" ")[5];

      const trueOperation = Number(lines[4].split(" ")[9]);
      const falseOperation = Number(lines[5].split(" ")[9]);

      /** logic */
      let worryMultiplied = 0;
      let finalOperation: number[] = [];

      for (let k = 0; k < monkeyItems[i]?.length; k++) {
        activeMonkeys[i]++;
        if (valueX < 0) {
          finalOperation[0] = Number(monkeyItems[i][k]);
        }

        if (valueY < 0) {
          finalOperation[2] = Number(monkeyItems[i][k]);
        } else {
          finalOperation[2] = Number(valueY);
        }

        switch (operation) {
          case "*":
            worryMultiplied = finalOperation[0] * finalOperation[2];
            break;

          case "+":
            worryMultiplied = finalOperation[0] + finalOperation[2];
            break;
        }

        let boredItem = boredItemFunction(worryMultiplied);
        let isDivisible = !(boredItem % Number(divisibleNumber));

        if (isDivisible) {
          monkeyItems[trueOperation].push(boredItem);
        } else {
          monkeyItems[falseOperation].push(boredItem);
        }
      }

      monkeyItems[i] = [];
    }
  }

  const sortMax = activeMonkeys.sort((a, b) => b - a);

  return sortMax[0] * sortMax[1];
};

/** utils */
export const parseMonkeyDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n\n");
};

console.log(
  "Part 1: 2 most active monkeys",
  getMonkeyBusiness(20, (worryMultiplied: number) =>
    Math.floor(worryMultiplied / 3)
  )
);
console.log(
  "Part 2: 2 most active monkeys",
  getMonkeyBusiness(
    10000,
    (worryMultiplied: number) => worryMultiplied % divisiblePart2
  )
);
