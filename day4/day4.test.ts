import * as dayFourModule from ".";

const mockParseAssignmentDataToString = jest.spyOn(
  dayFourModule,
  "parseAssignmentDataToString"
);

describe("day-4 test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getAssignmentPairsCount", () => {
    test("should return 2 based on the overlapping pairs", () => {
      mockParseAssignmentDataToString.mockReturnValueOnce([
        "2-4,6-8",
        "2-3,4-5",
        "5-7,7-9",
        "2-8,3-7",
        "6-6,4-6",
        "2-6,4-8",
        "2-8,4-6",
        "4-6,2-8",
        "6-6,6-6",
        "8-12,2-14",
        "2-14,8-12",
      ]);
      expect(dayFourModule.getAssignmentPairsCount()).toEqual(7);
    });

    test("should return 1 based on the overlapping pairs", () => {
      mockParseAssignmentDataToString.mockReturnValueOnce(["6-10,6-8"]);
      expect(dayFourModule.getAssignmentPairsCount()).toEqual(1);
    });

    test("should return 1 based on the overlapping pairs", () => {
      mockParseAssignmentDataToString.mockReturnValueOnce(["6-8,6-10"]);
      expect(dayFourModule.getAssignmentPairsCount()).toEqual(1);
    });

    test("should return 0 based on the overlapping pairs", () => {
      mockParseAssignmentDataToString.mockReturnValueOnce(["8-16,2-14"]);
      expect(dayFourModule.getAssignmentPairsCount()).toEqual(0);
    });

    test("should return 0 based on the overlapping pairs", () => {
      mockParseAssignmentDataToString.mockReturnValueOnce(["2-6,6-8"]);
      expect(dayFourModule.getAssignmentPairsCount()).toEqual(0);
    });

    test("should return 0 based on the overlapping pairs", () => {
      mockParseAssignmentDataToString.mockReturnValueOnce(["2-8,4-10"]);
      expect(dayFourModule.getAssignmentPairsCount()).toEqual(0);
    });
  });

  describe("getAssignmentOverlappedPairsCount", () => {
    test('should return 4 based on the overlapping pairs', () => {
      mockParseAssignmentDataToString.mockReturnValueOnce([
        "2-4,6-8",
        "2-3,4-5",
        "5-7,7-9",
        "2-8,3-7",
        "6-6,4-6",
        "2-6,4-8",
      ]);

      expect(dayFourModule.getAssignmentOverlappedPairsCount()).toEqual(4);
    })
  })
});
