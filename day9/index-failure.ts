import { readFileSync } from "fs";
import * as path from "path";

export const getNumOfVisitedPosition = () => {
  const data = parseMoveDataToString();

  /** initial state Y,X */
  let headPosition = [6, 0];
  let tailPosition = [6, 0];
  let visited: boolean[][] = [];

  for (let i = 0; i < data.length; i++) {
    const line: string[] = data[i].split(" ");
    const direction = line[0];
    const steps = Number(line[1]);

    for (let j = 0; j < steps; j++) {
      if (!visited[tailPosition[0]]) {
        visited[tailPosition[0]] = [];
      }

      if (!visited[tailPosition[0]][tailPosition[1]]) {
        visited[tailPosition[0]][tailPosition[1]] = false;
      }

      if (direction === "R") {
        headPosition[1] += 1;
        visited[tailPosition[0]][tailPosition[1]] = true;
        if (tailPosition[0] !== headPosition[0]) {
          tailPosition[0] = headPosition[0];
        }
        if (j < steps - 1) {
          tailPosition[1] += 1;
        }
      } else if (direction === "U") {
        headPosition[0] -= 1;
        visited[tailPosition[0]][tailPosition[1]] = true;
        if (tailPosition[1] !== headPosition[1]) {
          tailPosition[1] = headPosition[1];
        }
        if (j < steps - 1) {
          tailPosition[0] -= 1;
        }
      } else if (direction === "L") {
        headPosition[1] -= 1;
        visited[tailPosition[0]][tailPosition[1]] = true;
        if (tailPosition[0] !== headPosition[0]) {
          tailPosition[0] = headPosition[0];
        }
        if (j < steps - 1) {
          tailPosition[1] -= 1;
        }
      } else if (direction == "D") {
        headPosition[0] += 1;
        visited[tailPosition[0]][tailPosition[1]] = true;
        if (tailPosition[1] != headPosition[1]) {
          tailPosition[1] = headPosition[1];
        }
        if (j < steps - 1) {
          tailPosition[0] += 1;
        }
      }
    }
  }

  console.log(headPosition, tailPosition, visited);
};

/** utils */
export const parseMoveDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

console.log("total visited points", getNumOfVisitedPosition());
