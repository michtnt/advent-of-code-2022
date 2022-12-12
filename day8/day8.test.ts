import * as dayEightModule from ".";

const mockParseMapDataToString = jest.spyOn(
  dayEightModule,
  "parseMapDataToString"
);

describe("day-8 test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockParseMapDataToString.mockReturnValueOnce([
      "30373",
      "25512",
      "65332",
      "33549",
      "35390",
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getVisibleTreesOutsideTheGrid", () => {
    test("should return 21", () => {
      expect(dayEightModule.getVisibleTreesOutsideTheGrid()).toEqual(21);
    });
  });

  describe("getHighestScenicTrees", () => {
    test("should return 8", () => {
      expect(dayEightModule.getHighestScenicTrees()).toEqual(8);
    });
  });
});
