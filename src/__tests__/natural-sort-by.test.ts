import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { naturalSort, naturalSortBy, naturalCompare } from '../../dist/index.js';

describe('naturalSortBy', () => {
  it('sorts an array of objects by a string key', () => {
    const items = [{ name: 'item10' }, { name: 'item2' }, { name: 'item1' }];
    const sorted = naturalSortBy(items, 'name');
    assert.deepEqual(sorted, [{ name: 'item1' }, { name: 'item2' }, { name: 'item10' }]);
  });

  it('respects descending option', () => {
    const items = [{ tag: 'v1' }, { tag: 'v10' }, { tag: 'v2' }];
    const sorted = naturalSortBy(items, 'tag', { descending: true });
    assert.deepEqual(sorted, [{ tag: 'v10' }, { tag: 'v2' }, { tag: 'v1' }]);
  });
});

describe('naturalCompare with negative numbers', () => {
  it('sorts -1 before 2', () => {
    assert.ok(naturalCompare('-1', '2') < 0);
  });

  it('sorts -10 before -2', () => {
    assert.ok(naturalCompare('-10', '-2') < 0);
  });

  it('sorts file-2 before file2', () => {
    assert.ok(naturalCompare('file-2', 'file2') < 0);
  });

  it('does not treat hyphen between letters as negative', () => {
    // 'a-b1' vs 'a-b2' should still compare as plain text after the hyphen.
    assert.ok(naturalCompare('a-b1', 'a-b2') < 0);
  });

  it('naturalSort orders signed numbers', () => {
    const sorted = naturalSort(['-3', '1', '-1', '0', '2', '-10']);
    assert.deepEqual(sorted, ['-10', '-3', '-1', '0', '1', '2']);
  });
});
