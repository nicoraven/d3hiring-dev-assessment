const studentService = require('../services/students');

describe('Count helper function', () => {
  it('should return an Object', () => {
    const array = ['a', 'b', 'c', 'd', 'a', 'c', 'd', 'a'];
    let result = studentService.count(array);
    expect(result).toBeInstanceOf(Object);
  });
  it('should return the count of similar elements in an array', () => {
    const array = ['a', 'b', 'c', 'd', 'a', 'c', 'd', 'a'];
    let result = studentService.count(array);
    expect(result).toEqual({'a': 3, 'b': 1, 'c': 2, 'd': 2});
  });
});
