import * as dayTenModule from ".";

const mockParseProgramDataToString = jest.spyOn(
  dayTenModule,
  "parseProgramDataToString"
);

describe("day-10 test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockParseProgramDataToString.mockReturnValueOnce([
      "ืnoop",
      "addx 3",
      "addx -5",
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getSumOfSignalStrengths", () => {
    test("should return 0", () => {
      expect(dayTenModule.getSumOfSignalStrengths()).toEqual(0);
    });
  });
});
