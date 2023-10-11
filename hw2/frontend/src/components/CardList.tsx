import { useRef, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";

import useCards from "@/hooks/useCards";
import { deleteList, updateList } from "@/utils/client";

import type { SongProps } from "./Song";

export type CardListProps = {
  id: string;
  name: string;
  discription: string;
  songs: SongProps[];
  deleteicon: boolean;
  setView: ()=>void;
  setID: (id:string)=>void;
  setName: (name:string)=>void;
  setDiscription: (discription:string)=>void;
};

export default function CardList( {id, name, discription, songs, deleteicon, setView, setID, setName, setDiscription }: CardListProps) {
  const [edittingName, setEdittingName] = useState(false);
  const { fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleUpdateName = async () => {
    if (!inputRef.current) return;

    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingName(false);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  const handleClick = () => {
    setView();
    setID(id);
    setName(name);
    setDiscription(discription);
  }

  return (
    <>
        <div className="relative b-10" >
        <div className="grid place-items-center z-10 absolute right-0">
            <IconButton  disabled={!deleteicon} color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
        </div>
        <img src="./song.png"  className="relative" alt="album" onClick={handleClick}></img>
        <div className="mt-2 text-blue ">{songs.length} songs</div>
        <div className="flex gap-4">
          {edittingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a new name for this list..."
                sx={{ fontSize: "1.25rem" }}
                inputRef={inputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEdittingName(true)}
              className="w-full rounded-md hover:bg-white/10"
            >
              <div className="text-xl text-left">
                {name}
              </div>
            </button>
          )}
        </div>
        </div>
  </>
  );
}
