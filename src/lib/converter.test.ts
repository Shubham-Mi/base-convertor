import { describe, it, expect } from "vitest";
import { buildValidationRegex, isValidForBase, convert } from "./converter";

describe("buildValidationRegex", () => {
  it("returns a never-matching regex for base < 2", () => {
    expect(buildValidationRegex(1).test("0")).toBe(false);
  });
  it("returns a never-matching regex for base > 36", () => {
    expect(buildValidationRegex(37).test("0")).toBe(false);
  });
  it("matches only 0 and 1 for base 2", () => {
    const re = buildValidationRegex(2);
    expect(re.test("101")).toBe(true);
    expect(re.test("102")).toBe(false);
  });
  it("matches 0-7 for base 8", () => {
    const re = buildValidationRegex(8);
    expect(re.test("777")).toBe(true);
    expect(re.test("8")).toBe(false);
  });
  it("matches 0-9 and a-f case-insensitively for base 16", () => {
    const re = buildValidationRegex(16);
    expect(re.test("ff")).toBe(true);
    expect(re.test("FF")).toBe(true);
    expect(re.test("1g")).toBe(false);
  });
  it("matches 0-9 and a-z for base 36", () => {
    const re = buildValidationRegex(36);
    expect(re.test("z9")).toBe(true);
    expect(re.test("Z9")).toBe(true);
  });
  it("allows only 0-9 and a for base 11", () => {
    const re = buildValidationRegex(11);
    expect(re.test("9a")).toBe(true);
    expect(re.test("b")).toBe(false);
  });
});

describe("isValidForBase", () => {
  it("returns true for empty string", () => {
    expect(isValidForBase("", 10)).toBe(true);
  });
  it("returns true for valid binary", () => {
    expect(isValidForBase("101", 2)).toBe(true);
  });
  it("returns false for invalid binary", () => {
    expect(isValidForBase("2", 2)).toBe(false);
  });
  it("returns true for valid hex", () => {
    expect(isValidForBase("FF", 16)).toBe(true);
  });
  it("returns false for invalid hex", () => {
    expect(isValidForBase("g", 16)).toBe(false);
  });
});

describe("convert", () => {
  it("returns empty string for empty input", () => {
    expect(convert("", 10, 2)).toBe("");
  });
  it('converts "0" to "0"', () => {
    expect(convert("0", 10, 2)).toBe("0");
  });
  it("converts decimal to binary", () => {
    expect(convert("10", 10, 2)).toBe("1010");
  });
  it("converts binary to hex uppercase", () => {
    expect(convert("1010", 2, 16)).toBe("A");
  });
  it("converts hex to decimal", () => {
    expect(convert("ff", 16, 10)).toBe("255");
  });
  it("returns empty string for NaN result", () => {
    expect(convert("xyz", 10, 2)).toBe("");
  });
});
