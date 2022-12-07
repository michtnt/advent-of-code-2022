import * as daySixModule from ".";

const mockParseSignalDataToString = jest.spyOn(
  daySixModule,
  "parseSignalDataToString"
);

describe("day-6 test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockParseSignalDataToString.mockReturnValueOnce(
      "bvwbjplbgvbhsrlpgdmjqwftvncz"
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getFirstPacketMarkerFromSignalData", () => {
    test("should return 5", () => {
      expect(daySixModule.getFirstPacketMarkerFromSignalData()).toEqual(5);
    });
  });

  describe("getFirstMessageMarkerFromSignalData", () => {
    test("should return 23", () => {
      expect(daySixModule.getFirstMessageMarkerFromSignalData()).toEqual(23);
    });
  });
});
