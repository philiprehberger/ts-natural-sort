# @philiprehberger/natural-sort

[![CI](https://github.com/philiprehberger/ts-natural-sort/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-natural-sort/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/natural-sort.svg)](https://www.npmjs.com/package/@philiprehberger/natural-sort)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-natural-sort)](https://github.com/philiprehberger/ts-natural-sort/commits/main)

Natural string sorting -- file2 before file10, not after.

## Installation

```bash
npm install @philiprehberger/natural-sort
```

## Usage

```ts
import { naturalSort, naturalCompare } from '@philiprehberger/natural-sort';

// Sort file names naturally
naturalSort(['file10', 'file2', 'file1', 'file20']);
// => ['file1', 'file2', 'file10', 'file20']

// Case insensitive
naturalSort(['Banana', 'apple', 'Cherry'], { caseInsensitive: true });
// => ['apple', 'Banana', 'Cherry']

// Descending
naturalSort(['v1', 'v10', 'v2'], { descending: true });
// => ['v10', 'v2', 'v1']

// Sort objects with accessor
const items = [{ name: 'item10' }, { name: 'item2' }, { name: 'item1' }];
naturalSort(items, { accessor: (i) => i.name });
// => [{ name: 'item1' }, { name: 'item2' }, { name: 'item10' }]

// Low-level comparison
naturalCompare('file2', 'file10'); // negative (file2 < file10)
```

## API

### `naturalSort<T>(array: T[], options?: NaturalSortOptions<T>): T[]`

Returns a new sorted array without mutating the original.

**Options:**

| Option            | Type               | Default | Description                    |
| ----------------- | ------------------ | ------- | ------------------------------ |
| `caseInsensitive` | `boolean`          | `false` | Ignore case when comparing     |
| `descending`      | `boolean`          | `false` | Sort in descending order       |
| `accessor`        | `(item: T) => string` | -    | Extract string from each item  |

### `naturalCompare(a: string, b: string, caseInsensitive?: boolean): number`

Compares two strings using natural ordering. Returns negative, zero, or positive.

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-natural-sort)

🐛 [Report issues](https://github.com/philiprehberger/ts-natural-sort/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-natural-sort/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
