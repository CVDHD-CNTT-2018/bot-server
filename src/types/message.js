// @flow

export type SenderType = {
  id: number,
};

export type MessageType = {
  is_echo: boolean,
  sender: SenderType,
  recipient: SenderType,
  text?: string,
}
