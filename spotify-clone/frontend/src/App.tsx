import { useEffect } from "react";
import { useState } from "react";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import ListInfo from "@/components/ListInfo";
import MiddleBar from "@/components/MiddleBar";
import useCards from "@/hooks/useCards";

function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [deleteicon, setDeleteicon] = useState(false);
  const [deleteword, setDeleteword] = useState("delete");
  const [view, setView] = useState(false);
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");

  useEffect(() => {
    (async () => {
      await fetchLists();
      fetchCards();
    })();
  }, [fetchCards, fetchLists]);

  const handledelete = (deleteicon: boolean) => {
    if (deleteicon) {
      setDeleteicon(false);
    } else {
      setDeleteicon(true);
    }
  };

  const handledeleteword = (deleteword: string) => {
    if (deleteword == "delete") {
      setDeleteword("done");
    } else {
      setDeleteword("delete");
    }
  };

  return (
    <>
      <HeaderBar />
      {!view ? (
        <MiddleBar
          deleteicon={deleteicon}
          deleteword={deleteword}
          setDeleteword={(deleteicon) => handledeleteword(deleteicon)}
          setdelete={(deleteword) => handledelete(deleteword)}
        />
      ) : null}
      {!view ? (
        <main className="grid max-h-full grid-cols-2 flex-row gap-6 px-10 py-12 sm:grid-cols-3 sm:px-20 md:grid-cols-4 lg:grid-cols-5">
          {lists.map((list) => (
            <CardList
              key={list.id}
              {...list}
              deleteicon={deleteicon}
              setView={() => setView(true)}
              setID={setID}
              setName={setName}
              setDiscription={setDiscription}
            />
          ))}
        </main>
      ) : null}
      {view ? (
        <ListInfo
          id={id}
          name={name}
          setName={setName}
          discription={discription}
          setDiscription={setDiscription}
        />
      ) : null}
    </>
  );
}

export default App;
