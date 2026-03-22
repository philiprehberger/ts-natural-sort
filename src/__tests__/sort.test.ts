import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { naturalSort, naturalCompare } from '../../dist/index.js';

describe('naturalCompare', () => {
  it('should sort file1 < file2 < file10 < file20', () => {
    assert.ok(naturalCompare('file1', 'file2') < 0);
    assert.ok(naturalCompare('file2', 'file10') < 0);
    assert.ok(naturalCompare('file10', 'file20') < 0);
  });

  it('should sort img1 < img2 < img12', () => {
    assert.ok(naturalCompare('img1', 'img2') < 0);
    assert.ok(naturalCompare('img2', 'img12') < 0);
  });

  it('should handle pure alphabetic strings', () => {
    assert.ok(naturalCompare('apple', 'banana') < 0);
    assert.ok(naturalCompare('banana', 'apple') > 0);
    assert.equal(naturalCompare('same', 'same'), 0);
  });

  it('should handle pure numeric strings', () => {
    assert.ok(naturalCompare('1', '2') < 0);
    assert.ok(naturalCompare('2', '10') < 0);
    assert.ok(naturalCompare('100', '20') > 0);
  });

  it('should handle mixed strings like abc123def456', () => {
    assert.ok(naturalCompare('abc1def2', 'abc1def10') < 0);
    assert.ok(naturalCompare('abc2def1', 'abc10def1') < 0);
  });
});

describe('naturalSort', () => {
  it('should sort an array of file names naturally', () => {
    const input = ['file10', 'file2', 'file1', 'file20'];
    const result = naturalSort(input);
    assert.deepEqual(result, ['file1', 'file2', 'file10', 'file20']);
  });

  it('should sort img names naturally', () => {
    const input = ['img12', 'img1', 'img2'];
    const result = naturalSort(input);
    assert.deepEqual(result, ['img1', 'img2', 'img12']);
  });

  it('should support case insensitive sorting', () => {
    const input = ['Banana', 'apple', 'Cherry'];
    const result = naturalSort(input, { caseInsensitive: true });
    assert.deepEqual(result, ['apple', 'Banana', 'Cherry']);
  });

  it('should support descending order', () => {
    const input = ['file1', 'file10', 'file2'];
    const result = naturalSort(input, { descending: true });
    assert.deepEqual(result, ['file10', 'file2', 'file1']);
  });

  it('should support accessor for objects', () => {
    const input = [
      { name: 'item10' },
      { name: 'item2' },
      { name: 'item1' },
    ];
    const result = naturalSort(input, { accessor: (item) => item.name });
    assert.deepEqual(result, [
      { name: 'item1' },
      { name: 'item2' },
      { name: 'item10' },
    ]);
  });

  it('should handle empty array', () => {
    assert.deepEqual(naturalSort([]), []);
  });

  it('should handle single element', () => {
    assert.deepEqual(naturalSort(['only']), ['only']);
  });

  it('should not mutate the original array', () => {
    const input = ['b', 'a'];
    naturalSort(input);
    assert.deepEqual(input, ['b', 'a']);
  });
});
