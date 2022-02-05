export type Scope = string | string[];

export interface SelectorList {
  [key: string]: string | string[] | SelectorList | SelectorList[];
}

export type FilterCallback = (value: string, element?: any) => any;

export interface FilterList {
  [key: string]: FilterCallback;
}
