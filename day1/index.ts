import { readFileSync } from "fs";
import * as path from "path";

const getTheMostCalories = () => {
  const data: Array<string> = parseElvesDataToString();

  let maxCalories: number = -1;
  let elfTotalCalories: number = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "") {
      elfTotalCalories += parseInt(data[i]);
    } else {
      if (elfTotalCalories > maxCalories) {
        maxCalories = elfTotalCalories;
      }
      elfTotalCalories = 0;
    }
  }

  return maxCalories;
};

const getSumOfTopThreeMostCalories = () => {
  const data: Array<string> = parseElvesDataToString();

  let caloriesArray: Array<number> = [];
  let elfTotalCalories: number = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "") {
      elfTotalCalories += parseInt(data[i]);
    } else {
      caloriesArray.push(elfTotalCalories);
      elfTotalCalories = 0;
    }
  }

  caloriesArray.sort((a, b) => b - a);

  return caloriesArray[0] + caloriesArray[1] + caloriesArray[2];
};

/** utils */
const parseElvesDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

/** result */
console.log("elves with the most calories", getTheMostCalories());
console.log(
  "top 3 elves with the most calories",
  getSumOfTopThreeMostCalories()
);
