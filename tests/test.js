const studentService = require('../services/students');

describe('Count helper function', () => {
  it('should return an Object', () => {
    const array = ['a', 'b', 'c', 'd', 'a', 'c', 'd', 'a'];
    const result = studentService.count(array);
    expect(result).toBeInstanceOf(Object);
  });
  it('should return the count of similar elements in an array', () => {
    const array = ['a', 'b', 'c', 'd', 'a', 'c', 'd', 'a'];
    expect(studentService.count(array)).toEqual({ a: 3, b: 1, c: 2, d: 2 });
  });
});

describe('Duplicates helper function', () => {
  it('should return an Array', () => {
    const object = { a: 3, b: 1, c: 2, d: 2 };
    const result = studentService.duplicates(object, 3);
    expect(result).toBeInstanceOf(Array);
  });
  it('should return an array of elements whose count equals the second parameter', () => {
    const object = { a: 3, b: 1, c: 2, d: 2 };
    expect(studentService.duplicates(object, 3)).toEqual(['a']);
    const object2 = { a: 3, b: 3, c: 1, d: 4 };
    expect(studentService.duplicates(object2, 3)).toEqual(['a', 'b']);
  });
});
