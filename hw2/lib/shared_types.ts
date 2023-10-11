// The beauty of using TypeScript on both ends of the application is that we can
// share types between the client and the server very easily. This is a great way
// to keep the client and server in sync and avoid bugs. JavaScript makes you move
// fast, but TypeScript makes you move fast and not break things.

// A "type" can be defined with the `type` keyword or the `interface` keyword.
// They may seem similar, but there are some differences. For more information,
// see: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
// A general rule of thumb is to always use `type` unless you have a good reason
// to use `interface`. `interface` is more powerful, at the cost of baring more
// footguns.
export type CardData = {
  id: string;
  song: string;
  singer: string;
  url: string;
  list_id: string;
};

export type ListData = {
  id: string;
  name: string;
  discription: string;
  cards: CardData[];
};

export type GetCardsResponse = CardData[];

export type GetCardResponse = CardData;

// Types can also be derived from other types using utility types. These are
// a few examples of utility types:
// for more information, see: https://www.typescriptlang.org/docs/handbook/utility-types.html
// You don't need to memorize these, but it's good to know they exist.
export type CreateCardPayload = Omit<CardData, "id">; // 去掉 id

export type CreateCardResponse = Pick<CardData, "id">; // 只要 id

export type UpdateCardPayload = Partial<Omit<CardData, "id">>; // Omit<CardData, "id"> 裡面任選幾個

export type UpdateCardResponse = "OK";

export type DeleteCardResponse = "OK";

export type GetListsResponse = Omit<ListData, "cards">[];

export type CreateListPayload = Omit<ListData, "id" | "cards">;

export type CreateListResponse = Pick<ListData, "id">;

export type UpdateListPayload = Partial<Omit<ListData, "id" | "cards">>;

export type UpdateListResponse = "OK";

export type DeleteListResponse = "OK";
