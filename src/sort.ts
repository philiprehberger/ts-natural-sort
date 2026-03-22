import type { NaturalSortOptions } from './types';

export function naturalCompare(a: string, b: string, caseInsensitive = false): number {
  const ax = caseInsensitive ? a.toLowerCase() : a;
  const bx = caseInsensitive ? b.toLowerCase() : b;

  let ai = 0;
  let bi = 0;

  while (ai < ax.length && bi < bx.length) {
    const ca = ax.charCodeAt(ai);
    const cb = bx.charCodeAt(bi);

    const aIsDigit = ca >= 48 && ca <= 57;
    const bIsDigit = cb >= 48 && cb <= 57;

    if (aIsDigit && bIsDigit) {
      let numA = '';
      let numB = '';
      while (ai < ax.length && ax.charCodeAt(ai) >= 48 && ax.charCodeAt(ai) <= 57) {
        numA += ax[ai++];
      }
      while (bi < bx.length && bx.charCodeAt(bi) >= 48 && bx.charCodeAt(bi) <= 57) {
        numB += bx[bi++];
      }
      const diff = parseInt(numA, 10) - parseInt(numB, 10);
      if (diff !== 0) return diff;
      continue;
    }

    if (ca !== cb) return ca - cb;
    ai++;
    bi++;
  }

  return ax.length - bx.length;
}

export function naturalSort<T = string>(
  array: T[],
  options?: NaturalSortOptions<T>,
): T[] {
  const { caseInsensitive = false, descending = false, accessor } = options ?? {};
  const sorted = [...array].sort((a, b) => {
    const strA = accessor ? accessor(a) : String(a);
    const strB = accessor ? accessor(b) : String(b);
    return naturalCompare(strA, strB, caseInsensitive);
  });
  return descending ? sorted.reverse() : sorted;
}
