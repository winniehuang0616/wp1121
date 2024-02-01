import { useRef, useState } from "react";
import useCards  from "@/hooks/useCards"
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { updateCard } from "@/utils/client";
import AddToList from "@/components/AddToList";

export type SongProps = {
  id: string;
  song: string;
  singer: string;
  url: string;
  listId: string;
  onBoxChange: (id: string, checked: boolean) => void;
  checked: boolean;
};

export default function Song( { id,song,singer,url,listId, onBoxChange, checked }:SongProps) {
  const [open, setOpen] = useState(false);
  const { fetchCards } = useCards();
  const [edittingSong, setEdittingSong] = useState(false);
  const [edittingSinger, setEdittingSinger] = useState(false);
  const [edittingURL, setEdittingURL] = useState(false);

  const songinputRef = useRef<HTMLInputElement>(null);
  const singerinputRef = useRef<HTMLInputElement>(null);
  const URLinputRef = useRef<HTMLInputElement>(null);

  const handleboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBoxChange(id, e.target.checked);
  };

  const handleUpdateSong = async () => {
    if (!songinputRef.current) return;

    const newSong = songinputRef.current.value;
    if (newSong !== song) {
      try {
        await updateCard(id, { song: newSong });
        fetchCards();
      } catch (error) {
        alert("Error: Failed to update song");
      }
    }
    setEdittingSong(false);
  };

  const handleUpdateSinger = async () => {
    if (!singerinputRef.current) return;

    const newSinger = singerinputRef.current.value;
    if (newSinger !== singer) {
      try {
        await updateCard(id, { singer: newSinger });
        fetchCards();
      } catch (error) {
        alert("Error: Failed to update singer");
      }
    }
    setEdittingSinger(false);
  };

  const handleUpdateURL = async () => {
    if (!URLinputRef.current) return;

    const newURL = URLinputRef.current.value;
    if (newURL !== url) {
      try {
        await updateCard(id, { url: newURL });
        fetchCards();
      } catch (error) {
        alert("Error: Failed to update URL");
      }
    }
    setEdittingURL(false);
  };

  return (
    <> 
      <tr>
        <td className="border-b p-2">
          <input type="checkbox" onChange={handleboxChange} checked={checked}/>
        </td>
        <td className="border-b p-2">
          {edittingSong ? (
            <ClickAwayListener onClickAway={handleUpdateSong}>
              <Input
                autoFocus
                defaultValue={song}
                className="grow"
                placeholder="Enter a new name for this song..."
                inputRef={songinputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEdittingSong(true)}
              className="w-full rounded-md hover:bg-white/10"
            >
              <div className="text-1xl text-left">
                {song}
              </div>
            </button>
          )}
        </td>
        <td className="border-b p-2">
          {edittingSinger ? (
            <ClickAwayListener onClickAway={handleUpdateSinger}>
              <Input
                autoFocus
                defaultValue={singer}
                className="grow"
                placeholder="Enter a new name for this singer..."
                inputRef={singerinputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEdittingSinger(true)}
              className="w-full rounded-md hover:bg-white/10"
            >
              <div className="text-1xl text-left">
                {singer}
              </div>
            </button>
          )}
        </td>
        <td className="border-b p-2">
          <a href={url} target="_blank" rel="noreferrer" className="text-blue-500 underline" 
             onClick={() => setEdittingURL(true)}>
            {edittingURL ? (
            <ClickAwayListener onClickAway={handleUpdateURL}>
            <Input
              autoFocus
              defaultValue={url}
              placeholder="Enter a new name for this URL..."
              inputRef={URLinputRef}
            />
            </ClickAwayListener>
            ) : (
            <div className="text-1xl text-left">
            {url}
            </div>
          )}
          </a>
        </td>
        
        <td className="border-b" onClick={() => setOpen(true)}>
          <Button
            variant="text"
            className="w-4 sm:w-4"
            onClick={() => setOpen(true)}
          >
          +
          </Button>
        </td>
      </tr>  
      <AddToList
      song={song}
      singer={singer}
      url={url}
      listId={listId}
      open={open}
      onClose={()=>setOpen(false)}
      />
    </>
    )
}