export interface NaturalSortOptions<T = string> {
  caseInsensitive?: boolean;
  descending?: boolean;
  accessor?: (item: T) => string;
}
