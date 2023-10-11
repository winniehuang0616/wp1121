import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { GetCardsResponse, GetListsResponse } from "@lib/shared_types";

import type { CardListProps } from "@/components/CardList";
import { getCards, getLists } from "@/utils/client";
import type { SongProps } from "@/components/Song";

type CardContextType = {
  songs: SongProps[];
  lists: CardListProps[];
  fetchLists: () => Promise<void>;
  fetchCards: () => Promise<void>;
};

// context is a way to share data between components without having to pass props down the component tree
const CardContext = createContext<CardContextType>({
  songs: [],
  lists: [],
  fetchLists: async () => {},
  fetchCards: async () => {},
});

type CardProviderProps = {
  children: React.ReactNode;
};

// all data fetching and processing is done here, the rest of the app just consumes the data exposed by this provider
// when we run fetchLists or fetchCards, we update the state of the provider, which causes the rest of the app to re-render accordingly
export function CardProvider({ children }: CardProviderProps) {
  const [rawLists, setRawLists] = useState<GetListsResponse>([]);
  const [rawSongs, setRawSongs] = useState<GetCardsResponse>([]);

  const fetchLists = useCallback(async () => {
    try {
      const { data } = await getLists();
      setRawLists(data);
    } catch (error) {
      alert("Error: failed to fetch lists");
    }
  }, []);

  const fetchCards = useCallback(async () => {
    try {
      const { data } = await getCards();
      setRawSongs(data);
    } catch (error) {
      alert("Error: failed to fetch cards");
    }
  }, []);

  const lists = useMemo(() => {
    // you can do functional-ish programming in JS too
    const listMap = rawLists.reduce(
      (acc, list) => {
        acc[list.id] = 
        { ...list, 
          songs: [],
          deleteicon: false,
          setView: () => {},
          setID: () => {},
          setName: () => {},
          setDiscription: () => {},
        };
        return acc;
      },
      {} as Record<string, CardListProps>,
    );
    for (const song of rawSongs) {
      listMap[song.list_id].songs.push({
        ...song,
        listId: song.list_id,
        checked: false,
        onBoxChange: () => {}
      });
    }
    return Object.values(listMap);
  }, [rawSongs, rawLists]);

  const songs = useMemo(() => {
    // you can do functional-ish programming in JS too
    const songMap = rawSongs.reduce(
      (acc, song) => {
        acc[song.id] = { ...song, listId: song.list_id, onBoxChange: () => {}, checked: false};
        return acc;
      },
      {} as Record<string, SongProps>,
    );
    return Object.values(songMap);
  }, [rawSongs]);


  return (
    <CardContext.Provider
      value={{
        songs,
        lists,
        fetchLists,
        fetchCards,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

// this is a custom hook, the name must start with "use"
export default function useCards() {
  return useContext(CardContext);
}
