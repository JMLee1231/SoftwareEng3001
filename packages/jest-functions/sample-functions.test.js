const myFunctions = require('./sample-functions.js');

describe('div', () => {
  test('divides two positive integers', () => {
    expect(myFunctions.div(12, 3)).toBe(4);
  });

  test('divides negative and decimal values', () => {
    expect(myFunctions.div(-7.5, 2.5)).toBe(-3);
  });

  test('returns zero when the numerator is zero', () => {
    expect(myFunctions.div(0, 5)).toBe(0);
  });

  test('returns Infinity when dividing a positive number by zero', () => {
    expect(myFunctions.div(5, 0)).toBe(Infinity);
  });
});

describe('containsNumbers', () => {
  test('returns true when text includes a digit', () => {
    expect(myFunctions.containsNumbers('Room 301')).toBe(true);
  });

  test('returns false when text contains no digits', () => {
    expect(myFunctions.containsNumbers('hello world')).toBe(false);
  });

  test('returns false for an empty string', () => {
    expect(myFunctions.containsNumbers('')).toBe(false);
  });

  test('returns false when text contains only whitespace', () => {
    expect(myFunctions.containsNumbers('   \t\n')).toBe(false);
  });
});
