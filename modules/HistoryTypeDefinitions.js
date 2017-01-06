/* @flow */

export type Match = any

export type Location = {
  pathname: string,
  key: string,
  search: string,
  hash: string,
  state?: Object,
}

export type Entries = Array<Location>

export type History = {
  length: number,
  action: 'POP' | 'REPLACE' | 'STRING',
  location: Location,
  index: number,
  entries: Entries,
  createHref: (location: string) => string,
  push: (path: string, state?: Object) => void,
  replace: (path: string, state?: Object) => void,
  go: (n: number) => void,
  goBack: () => void,
  goForward: () => void,
  canGo: (n: number) => void,
  block: (promt?: boolean) => void,
  listen: (listener: Function) => void,
}
