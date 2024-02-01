export type User = {
  id: string;
  username: string;
};

export type Message = {
  id: string;
  chatroom: string;
  userId: string;
  content: string;
  cancel: string;
};
