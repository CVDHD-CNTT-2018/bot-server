// @flow

export type EntryType = {
  id: string,
  time: number,
  messaging: Array<>,
};

export type EventType = {
  object: string,
  entry: Array<EntryType>,
};
