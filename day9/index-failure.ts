import { readFileSync } from "fs";
import * as path from "path";

let moves: any[][] = [];
let tails: number[][] = [];
let visited = new Set(["0/0"]);
let hX = 0;
let hY = 0;

const moveHeadTo = (direction: string, tailSize: number) => {
  switch (direction) {
    case "U":
      hY = hY + 1;
      break;
    case "D":
      hY = hY - 1;
      break;
    case "L":
      hX = hX - 1;
      break;
    case "R":
      hX = hX + 1;
      break;
  }

  for (let i = 0; i < tailSize; i++) {
    moveTail(i);

    if (i === tailSize - 1) {
      let [lasttX, lasttY] = tails[tailSize - 1];
      visited.add(`${lasttX}/${lasttY}`);
    }
  }
};

const moveTail = (i: number) => {
  let [tX, tY] = tails[i];

  let refX = 0;
  let refY = 0;

  if (i > 0) {
    let [prevtX, prevtY] = tails[i - 1];
    refX = prevtX;
    refY = prevtY;
  } else {
    refX = hX;
    refY = hY;
  }

  let diffX = Math.abs(refX - tX);
  let diffY = Math.abs(refY - tY);

  if (diffX < 2 && diffY < 2) {
    return;
  }

  if (diffX > 1 && !diffY) {
    tX += refX - tX > 0 ? 1 : -1;
  } else if (diffY > 1 && !diffX) {
    tY += refY - tY > 0 ? 1 : -1;
  } else {
    tX += refX - tX > 0 ? 1 : -1;
    tY += refY - tY > 0 ? 1 : -1;
  }

  tails[i] = [tX, tY];
};

/** Part 1 */
export const getSumOfTailVisitedPosition = (tailSize: number) => {
  /** reset */
  moves = [];
  tails = [];
  visited = new Set(["0/0"]);
  hX = 0;
  hY = 0;

  const data = parseMoveDataToString();

  for (const line of data) {
    const tmp = line.split(" ");
    moves.push([tmp[0], parseInt(tmp[1])]);
  }

  for (let i = 0; i < tailSize; i++) {
    tails.push([0, 0]);
  }

  let i = 0;

  for (const [direction, steps] of moves) {
    for (let n = 0; n < steps; n++) {
      moveHeadTo(direction, tailSize);
    }
    i++;
  }

  return visited.size;
};

/** utils */
export const parseMoveDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

/** result */
console.log("visited places length=1", getSumOfTailVisitedPosition(1));
console.log("visited places length=9", getSumOfTailVisitedPosition(9));
