import { readFileSync } from "fs";
import * as path from "path";

enum Shape {
  A = "A",
  B = "B",
  C = "C",
}

enum GameOutcome {
  WIN = "win",
  DRAW = "draw",
  LOSE = "lose",
}

export const getTotalScore = (): number => {
  /** types */
  type ShapeDictionary = {
    [key: string]: {
      humanName: string;
      elfName: Shape;
      points: number;
      weakness: Shape;
    };
  };

  type GameDictionary = {
    [key: string]: number;
  };

  const shapeDictionary: ShapeDictionary = {
    X: {
      humanName: "rock",
      elfName: Shape.A,
      points: 1,
      weakness: Shape.B,
    },
    Y: {
      humanName: "paper",
      elfName: Shape.B,
      points: 2,
      weakness: Shape.C,
    },
    Z: {
      humanName: "scissors",
      elfName: Shape.C,
      points: 3,
      weakness: Shape.A,
    },
  };

  const gameDictionary: GameDictionary = {
    [GameOutcome.WIN]: 6,
    [GameOutcome.DRAW]: 3,
    [GameOutcome.LOSE]: 0,
  };

  const data = parseStrategyDataToString();
  let totalScore = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i].split(" ");
    const humanAnswer = shapeDictionary[line[1]];
    const elfAnswer = line[0];

    /** draw */
    if (humanAnswer.elfName === elfAnswer) {
      totalScore += gameDictionary[GameOutcome.DRAW];
    } else if (humanAnswer.weakness !== elfAnswer) {
      /** win */
      totalScore += gameDictionary[GameOutcome.WIN];
    }
    /** lose (don't do anything) */

    totalScore += humanAnswer.points;
  }

  return totalScore;
};

export const getTotalScoreWithDesiredOutcome = (): number => {
  /** types */
  type ShapeDictionary = {
    [key: string]: {
      humanName: string;
      points: number;
      weakness: Shape;
      beats: Shape;
    };
  };

  type GameDictionary = {
    [key: string]: {
      name: GameOutcome;
      points: number;
    };
  };

  const shapeDictionary: ShapeDictionary = {
    A: {
      humanName: "rock",
      points: 1,
      weakness: Shape.B,
      beats: Shape.C,
    },
    B: {
      humanName: "paper",
      points: 2,
      weakness: Shape.C,
      beats: Shape.A,
    },
    C: {
      humanName: "scissors",
      points: 3,
      weakness: Shape.A,
      beats: Shape.B,
    },
  };

  const gameDictionary: GameDictionary = {
    X: {
      name: GameOutcome.LOSE,
      points: 0,
    },
    Y: {
      name: GameOutcome.DRAW,
      points: 3,
    },
    Z: {
      name: GameOutcome.WIN,
      points: 6,
    },
  };

  const data = parseStrategyDataToString();
  let totalScore = 0;

  for (let i = 0; i < data.length; i++) {
    const line = data[i].split(" ");
    const elfAnswer = shapeDictionary[line[0]];
    const desiredOutcome = gameDictionary[line[1]];

    /** draw */
    if (desiredOutcome.name === GameOutcome.DRAW) {
      totalScore += elfAnswer.points;
    } else if (desiredOutcome.name === GameOutcome.WIN) {
      /** win */
      totalScore += shapeDictionary[elfAnswer.weakness].points;
    } else {
      /** lose */
      totalScore += shapeDictionary[elfAnswer.beats].points;
    }

    totalScore += desiredOutcome.points;
  }

  return totalScore;
};

/** utils */
export const parseStrategyDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");
};

/** result */
console.log("total score", getTotalScore());
console.log(
  "total score with desired outcome",
  getTotalScoreWithDesiredOutcome()
);
