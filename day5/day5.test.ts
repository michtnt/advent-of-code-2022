import * as dayFiveModule from ".";

const mockParseInputDataToString = jest.spyOn(
  dayFiveModule,
  "parseInputDataToString"
);

describe("day-4 test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockParseInputDataToString.mockReturnValueOnce(`
    [D]    
    [N] [C]    
    [Z] [M] [P]
     1   2   3 
    
    move 1 from 2 to 1
    move 3 from 1 to 3
    move 2 from 2 to 1
    move 1 from 1 to 2`);
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
