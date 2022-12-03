import * as dayThreeModule from ".";

const mockParseRucksackDataToString = jest.spyOn(
  dayThreeModule,
  "parseRucksackDataToString"
);

describe("day-3 test", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockParseRucksackDataToString.mockReturnValueOnce([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getSumOfErroredItemInRucksack", () => {
    test("should return 157 based on the priorities value", () => {
      expect(dayThreeModule.getSumOfErroredItemInRucksack()).toEqual(157);
    });
  });

  describe("getSumOfBadgeInRucksack", () => {
    test("should return 70 based on the groups and priorities value", () => {
      expect(dayThreeModule.getSumOfBadgeInRucksack()).toEqual(70);
    });
  });
});
