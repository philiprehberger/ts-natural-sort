import type { NaturalSortOptions } from './types';

function isDigit(code: number): boolean {
  return code >= 48 && code <= 57;
}

function isNegativeDigit(s: string, i: number): boolean {
  // Treat '-' as the start of a number when followed by a digit and either at the
  // start of the string or preceded by a non-alphanumeric character.
  if (s.charCodeAt(i) !== 45) return false;
  if (i + 1 >= s.length) return false;
  if (!isDigit(s.charCodeAt(i + 1))) return false;
  if (i === 0) return true;
  const prev = s.charCodeAt(i - 1);
  const prevIsAlnum = isDigit(prev) || (prev >= 65 && prev <= 90) || (prev >= 97 && prev <= 122);
  return !prevIsAlnum;
}

export function naturalCompare(a: string, b: string, caseInsensitive = false): number {
  const ax = caseInsensitive ? a.toLowerCase() : a;
  const bx = caseInsensitive ? b.toLowerCase() : b;

  let ai = 0;
  let bi = 0;

  while (ai < ax.length && bi < bx.length) {
    const aIsNeg = isNegativeDigit(ax, ai);
    const bIsNeg = isNegativeDigit(bx, bi);
    const aIsNum = aIsNeg || isDigit(ax.charCodeAt(ai));
    const bIsNum = bIsNeg || isDigit(bx.charCodeAt(bi));

    if (aIsNum && bIsNum) {
      const aSign = aIsNeg ? -1 : 1;
      const bSign = bIsNeg ? -1 : 1;
      if (aIsNeg) ai++;
      if (bIsNeg) bi++;

      let numA = '';
      let numB = '';
      while (ai < ax.length && isDigit(ax.charCodeAt(ai))) numA += ax[ai++];
      while (bi < bx.length && isDigit(bx.charCodeAt(bi))) numB += bx[bi++];

      const diff = aSign * parseInt(numA, 10) - bSign * parseInt(numB, 10);
      if (diff !== 0) return diff;
      continue;
    }

    const ca = ax.charCodeAt(ai);
    const cb = bx.charCodeAt(bi);
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

type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];

export function naturalSortBy<T extends Record<string, unknown>>(
  array: T[],
  key: StringKeys<T>,
  options?: Omit<NaturalSortOptions<T>, 'accessor'>,
): T[] {
  return naturalSort(array, { ...options, accessor: (item) => item[key] as string });
}
