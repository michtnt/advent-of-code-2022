import { readFileSync } from "fs";
import * as path from "path";

export const getAssignmentPairsCount = () => {
  const data = parseAssignmentDataToString();
  let total = 0;

  for (let i = 0; i < data.length; i++) {
    const lineData = data[i].split(",");
    /** don't compare string! mistake before: '10' < '6' = true, 10 < 6 = false  */
    const firstSegment = lineData[0].split("-").map(Number); /** A B */
    const secondSegment = lineData[1].split("-").map(Number); /** C D */

    if (
      /** when A < C:
       * A is definitely lesser than C, so C is the inner range
       * therefore D have to be less or equal to B */
      firstSegment[0] < secondSegment[0] &&
      secondSegment[1] <= firstSegment[1]
    ) {
      total++;
    } else if (
      /** when A = C:
       * A or C could be inner range */
      firstSegment[0] === secondSegment[0]
    ) {
      total++;
    } else if (
      /** when A > C:
       * C is definitely lesser than A, so A is the inner range
       * therefore B has to be less or equal to D
       */
      firstSegment[0] > secondSegment[0] &&
      secondSegment[1] >= firstSegment[1]
    ) {
      total++;
    }
  }

  return total;
};

/** utils */
export const parseAssignmentDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

/** result */
console.log("get assignment pairs count", getAssignmentPairsCount());
