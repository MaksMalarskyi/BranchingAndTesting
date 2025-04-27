let hamming = require('../index.js').hamming;
let assert = require('chai').assert;

describe('Hamming code testing', function() {
  it('should correctly encode 4 bits to 7-bit hamming code', function() {
    let input = [1, 0, 1, 1];
    let encoded = hamming.encode(input);
    assert.deepEqual(encoded, [0, 1, 1, 0, 0, 1, 1]);
  });

  it('should correctly decode a valid 7-bit hamming code', function() {
    let encoded = [0, 1, 1, 0, 0, 1, 1];
    let decoded = hamming.decode(encoded);
    assert.deepEqual(decoded, [1, 0, 1, 1]);
  });

  it('should detect no error in a valid code (isValid = true)', function() {
    let encoded = [0, 1, 1, 0, 0, 1, 1];
    let valid = hamming.isValid(encoded);
    assert.isTrue(valid);
  });

  it('should fix a 1-bit error and still decode correctly', function() {
    let input = [1, 0, 1, 1];
    let encoded = hamming.encode(input);
    let corrupted = hamming.injectError(encoded, 3); // introduce error at position 3
    let decoded = hamming.decode(corrupted);
    assert.deepEqual(decoded, input);
  });
});


describe('Positive unit tests', function() {

  it('stringToBits converts valid string to bit array', function() {
    let str = '1010';
    let expected = [1, 0, 1, 0];
    let result = hamming.stringToBits(str);
    assert.deepEqual(result, expected);
  });

  it('isValid detects correct data without errors', function() {
    let data = hamming.encode([1, 0, 0, 1]);
    let valid = hamming.isValid(data);
    assert.equal(valid, true);
  });

  it('generateRandomData produces 4 bits', function() {
    let randomData = hamming.generateRandomData();
    assert.equal(randomData.length, 4);
    randomData.forEach(bit => {
      assert.include([0, 1], bit);
    });
  });

});


