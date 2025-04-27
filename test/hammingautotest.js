let hamming = require('../index.js').hamming;
let assert = require('chai').assert;

describe('hamming', () => {

  it('should encode 4 bits into 7 bits correctly', () => {
    const data = [1, 0, 1, 1];
    const encoded = hamming.encode(data);
    assert.deepEqual(encoded, [0, 1, 1, 0, 0, 1, 1]);
  });

  it('should decode 7 bits into original 4 bits correctly (no errors)', () => {
    const data = [1, 0, 0, 1];
    const encoded = hamming.encode(data);
    const decoded = hamming.decode(encoded);
    assert.deepEqual(decoded, data);
  });

  it('should correct a single-bit error in encoded data', () => {
    const data = [1, 1, 0, 1];
    const encoded = hamming.encode(data);
    const corrupted = hamming.injectError(encoded, 5); // пошкодимо 5-й біт
    const decoded = hamming.decode(corrupted);
    assert.deepEqual(decoded, data);
  });

  it('should validate correct encoded data as valid', () => {
    const data = [0, 1, 0, 1];
    const encoded = hamming.encode(data);
    assert.isTrue(hamming.isValid(encoded));
  });

  it('should detect error in corrupted encoded data', () => {
    const data = [0, 1, 1, 0];
    const encoded = hamming.encode(data);
    const corrupted = hamming.injectError(encoded, 3); // пошкодимо 3-й біт
    assert.isFalse(hamming.isValid(corrupted));
  });

  it('should throw error on invalid encode input length', () => {
    assert.throws(() => hamming.encode([1, 0, 1]), Error);
  });
  it('should throw an error if decode input contains values other than 0 or 1', function() {
    const invalidData = [0, 1, 2, 0, 1, 0, 1]; // 2 — некоректне значення

    assert.throws(() => {
      hamming.decode(invalidData);
    }, Error, "decode: input must consist of bits (0 or 1)");
  });

});
