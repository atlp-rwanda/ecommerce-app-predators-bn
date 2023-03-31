import calculator from "./sample";

test("adds 1 + 2 to equal 3", () => {
  expect(calculator.sum(1, 2)).toBe(3);
});

test("subtraction 10-6to equel 4", () => {
  expect(calculator.subtract(10, 6)).toBe(4);
});
