import * as dayFiveModule from ".";

const mockParseCratesDataToString = jest.spyOn(
  dayFiveModule,
  "parseCratesDataToString"
);

describe("day-5 test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // mockParseCratesDataToString.mockReturnValueOnce([
    //   `[D]
    //      [N] [C]
    //      [Z] [M] [P]`,
    //   `move 1 from 2 to 1
    //      move 3 from 1 to 3
    //      move 2 from 2 to 1
    //      move 1 from 1 to 2`,
    // ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getCombinationOfTopCrateInStack", () => {
    test("should return CMZ", () => {
      expect(dayFiveModule.getCombinationOfTopCrateInStack()).toEqual("CMZ");
    });
  });

  describe("getCombinationOfTopCrateInStackPartTwo", () => {
    test("should return MCD", () => {
      expect(dayFiveModule.getCombinationOfTopCrateInStackPartTwo()).toEqual(
        "MCD"
      );
    });
  });
});
