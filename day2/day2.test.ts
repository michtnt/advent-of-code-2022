import * as dayTwoModule from ".";

/* mocking function
jest.mock(".", () => {
  const originalModule = jest.requireActual(".");

  return {
    ...originalModule,
    parseStrategyDataToString: jest.fn(),
  };
});
*/

const mockParseStrategyDataToString = jest.spyOn(
  dayTwoModule,
  "parseStrategyDataToString"
);

describe("day-2 test", () => {
  describe("getTotalScore", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe("rock", () => {
      test("should return 4 as draw (3) + rock (1) because rock vs rock is draw ", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["A X"]);

        // (parseStrategyDataToString as jest.Mock).mockReturnValueOnceOnce("A X"); // 'as jest.Mock' so that typescript understands you're not using the real 'parseStrategyDataToString' but a mocked one.

        expect(dayTwoModule.getTotalScore()).toEqual(4);
      });
      test("should return 8 as win (6) + paper (2) because rock vs paper is win", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["A Y"]);
        expect(dayTwoModule.getTotalScore()).toEqual(8);
      });

      test("should return 3 as lose (0) + scissors (3) because rock vs scissors is lose", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["A Z"]);
        expect(dayTwoModule.getTotalScore()).toEqual(3);
      });
    });

    describe("paper", () => {
      test("should return 5 as draw (3) + paper (2) because paper vs paper is draw ", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["B Y"]);
        expect(dayTwoModule.getTotalScore()).toEqual(5);
      });
      test("should return 9 as win (6) + scissors (3) because paper vs scissors is win", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["B Z"]);
        expect(dayTwoModule.getTotalScore()).toEqual(9);
      });

      test("should return 1 as lose (0) + rock (1) because paper vs rock is lose", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["B X"]);
        expect(dayTwoModule.getTotalScore()).toEqual(1);
      });
    });

    describe("scissors", () => {
      test("should return 6 as draw (3) + scissors (3) because scissors vs scissors is draw ", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["C Z"]);
        expect(dayTwoModule.getTotalScore()).toEqual(6);
      });
      test("should return 7 as win (6) + rock (1) because scissors vs rock is win", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["C X"]);
        expect(dayTwoModule.getTotalScore()).toEqual(7);
      });

      test("should return 2 as lose (0) + paper (2) because scissors vs paper is lose", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["C Y"]);
        expect(dayTwoModule.getTotalScore()).toEqual(2);
      });
    });
  });

  describe("getTotalScoreWithDesiredOutcome", () => {
    describe("when desired outcome is lose", () => {
      test("should return lose (0) + scissors (3) because rock vs scissors is lose", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["A X"]);

        expect(dayTwoModule.getTotalScoreWithDesiredOutcome()).toEqual(3);
      });
    });

    describe("when desired outcome is draw", () => {
      test("should return draw (3) + paper (2) because paper vs paper is draw", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["B Y"]);

        expect(dayTwoModule.getTotalScoreWithDesiredOutcome()).toEqual(5);
      });
    });

    describe("when desired outcome is win", () => {
      test("should return win (6) + rock (1) because scissors vs rock is win", () => {
        mockParseStrategyDataToString.mockReturnValueOnce(["C Z"]);

        expect(dayTwoModule.getTotalScoreWithDesiredOutcome()).toEqual(7);
      });
    });
  });
});
