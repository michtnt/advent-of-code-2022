import { readFileSync } from "fs";
import * as path from "path";

/** JS don't support pass by reference */
let leftScenicTrees = 0;
let rightScenicTrees = 0;
let upScenicTrees = 0;
let downScenicTrees = 0;

/** Part 1 */
const goUp = (
  horizontalPosition: number,
  verticalPosition: number,
  arr: string[][]
): boolean => {
  for (let i = verticalPosition - 1; i >= 0; i--) {
    upScenicTrees++;

    if (
      arr[i][horizontalPosition] >= arr[verticalPosition][horizontalPosition]
    ) {
      return false;
    }
  }
  return true;
};

const goDown = (
  horizontalPosition: number,
  verticalPosition: number,
  arr: string[][]
): boolean => {
  for (let i = verticalPosition + 1; i < arr.length; i++) {
    downScenicTrees++;

    if (
      arr[i][horizontalPosition] >= arr[verticalPosition][horizontalPosition]
    ) {
      return false;
    }
  }
  return true;
};

const goLeft = (
  horizontalPosition: number,
  verticalPosition: number,
  arr: string[][]
): boolean => {
  for (let i = horizontalPosition - 1; i >= 0; i--) {
    leftScenicTrees++;

    if (arr[verticalPosition][i] >= arr[verticalPosition][horizontalPosition]) {
      return false;
    }
  }

  return true;
};

const goRight = (
  horizontalPosition: number,
  verticalPosition: number,
  arr: string[][]
): boolean => {
  for (let i = horizontalPosition + 1; i < arr.length; i++) {
    rightScenicTrees++;

    if (arr[verticalPosition][i] >= arr[verticalPosition][horizontalPosition]) {
      return false;
    }
  }
  return true;
};

export const getVisibleTreesOutsideTheGrid = (): number => {
  const data = parseMapDataToString();
  const arr = mapDataTo2DArray(data);

  let count = 0;

  for (
    let verticalPosition = 0;
    verticalPosition < arr.length;
    verticalPosition++
  ) {
    for (
      let horizontalPosition = 0;
      horizontalPosition < arr.length;
      horizontalPosition++
    ) {
      if (
        horizontalPosition === 0 ||
        horizontalPosition === arr.length - 1 ||
        verticalPosition === 0 ||
        verticalPosition === arr.length - 1
      ) {
        /** ignore outer part */
        count++;
      } else {
        /** inner part */
        const left = goLeft(horizontalPosition, verticalPosition, arr);
        const right = goRight(horizontalPosition, verticalPosition, arr);
        const up = goUp(horizontalPosition, verticalPosition, arr);
        const down = goDown(horizontalPosition, verticalPosition, arr);

        if (left || right || up || down) {
          count++;
        }
      }
    }
  }

  return count;
};

/** Part Two */
export const getHighestScenicTrees = () => {
  const data = parseMapDataToString();
  const arr = mapDataTo2DArray(data);

  let maxScenicTreesValue = -1;

  for (
    let verticalPosition = 0;
    verticalPosition < arr.length;
    verticalPosition++
  ) {
    for (
      let horizontalPosition = 0;
      horizontalPosition < arr.length;
      horizontalPosition++
    ) {
      leftScenicTrees = 0;
      rightScenicTrees = 0;
      upScenicTrees = 0;
      downScenicTrees = 0;

      goLeft(horizontalPosition, verticalPosition, arr);
      goRight(horizontalPosition, verticalPosition, arr);
      goUp(horizontalPosition, verticalPosition, arr);
      goDown(horizontalPosition, verticalPosition, arr);

      maxScenicTreesValue = Math.max(
        maxScenicTreesValue,
        leftScenicTrees * rightScenicTrees * upScenicTrees * downScenicTrees
      );
    }
  }

  return maxScenicTreesValue;
};

/** utils */
export const parseMapDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

const mapDataTo2DArray = (data: string[]): string[][] => {
  let matrix: string[][] = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (!matrix[i]) {
        matrix[i] = [];
      }
      matrix[i][j] = data[i][j];
    }
  }

  return matrix;
};

/** result */
console.log("visible trees", getVisibleTreesOutsideTheGrid());
console.log("scenic trees", getHighestScenicTrees());
