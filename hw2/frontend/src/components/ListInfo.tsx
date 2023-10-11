import { useRef, useState, useEffect } from "react";
import useCards  from "@/hooks/useCards"
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Song from "@/components/Song";
import NewSongDialog from "./NewSongDialog";
import DeleteSongDialog from "./DeleteSongDialog";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import { updateList } from "@/utils/client";

type listinfoprops = {
  id: string;
  name: string;
  discription: string;
  setName: (name:string)=>void;
  setDiscription: (discription:string)=>void;
};

export default function ListInfo({id, name, discription, setName, setDiscription}:listinfoprops) {
    const { songs, fetchLists } = useCards();
    const [edittingName, setEdittingName] = useState(false);
    const [edittingDis, setEdittingDis] = useState(false);
    const [open, setOpen] = useState(false);
    const [del, setDel] = useState(false);
    const [songSelections, setSongSelections] = useState<Record<string, boolean>>({});
    const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const filteredSongs = songs.filter(song => song.listId === id);
    const nameinputRef = useRef<HTMLInputElement>(null);
    const disinputRef = useRef<HTMLInputElement>(null);

    const handleboxChange = (id: string, checked: boolean) => {
      setSongSelections((prevSelections) => ({
        ...prevSelections,
        [id]: checked,
      }));
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectAll(e.target.checked);
      // 清空已选择的歌曲列表
      if (!selectAll) {
        const allSongIds = filteredSongs.map((song) => song.id);
        const newSongSelections = allSongIds.reduce(
          (acc, songId) => ({ ...acc, [songId]: true }),
          {}
        );
        setSongSelections(newSongSelections);
      } else {
        setSongSelections({});
      }
    };

    useEffect(() => {
      // 将 songSelections 转换为选中的歌曲数组
      const newSelectedSongs = Object.entries(songSelections)
        .filter(([, isSelected]) => isSelected)
        .map(([id]) => id);
  
      // 更新 selectedSongs 状态
      setSelectedSongs(newSelectedSongs);
    }, [songSelections]);

    const handleUpdateName = async () => {
      if (!nameinputRef.current) return;
 
      const newName = nameinputRef.current.value;
      setName(newName);
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

    const handleUpdateDis = async () => {
      if (!disinputRef.current) return;
  
      const newDis = disinputRef.current.value;
      setDiscription(newDis)
      if (newDis !== discription) {
        try {
          await updateList(id, { discription: newDis });
          fetchLists();
        } catch (error) {
          alert("Error: Failed to update list discription");
        }
      }
      setEdittingDis(false);
    };

    return (
      <>  
        <div className="flex flex-col sm:flex-row mx-10 sm:mx-20 mt-10 sm:mt-20">
          <div className="w-1/3 sm:w-2/5 lg:w-1/5">
            <img src="./song.png"  alt="album"></img>
          </div>
          <div className="sm:w-3/5 lg:w-4/5 ml-0 mt-5 sm:ml-5 sm:mt-0" >
          <div className="text-x1 sm:text-2xl">
            {edittingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a new name for this song..."
                sx={{ fontSize: "1.5rem" }}
                inputRef={nameinputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEdittingName(true)}
              className="w-full rounded-md hover:bg-white/10"
            >
              <div className="text-1x1 sm:text-2xl text-left">
                {name}
              </div>
            </button>
          )}  
          </div>
          <div className="text-sm sm:text-base mt-2 sm:mt-5  break-words">
            {edittingDis ? (
            <ClickAwayListener onClickAway={handleUpdateDis}>
              <Input
                autoFocus
                defaultValue={discription}
                className="grow"
                placeholder="Enter a new discription for this song..."
                sx={{ fontSize: "1rem" }}
                inputRef={disinputRef}
              />
            </ClickAwayListener>
            ) : (
            <button
              onClick={() => setEdittingDis(true)}
              className="w-full rounded-md hover:bg-white/10"
            >
              <div className="text-1xl text-left">
                {discription}
              </div>
            </button>
          )}  
          </div>
          </div>
        </div>   

        <div className=" flex justify-end space-x-4 mx-10 sm:mx-20 mt-5 md:mt-0">
            <Button
                variant="contained"
                className="w-16 sm:w-20 h-8 sm:h-10"
                onClick={() => setOpen(true)}
            >
            <AddIcon className="text-sm sm:text-base" />
                Add
            </Button>

            <Button
                variant="contained"
                className="w-24 sm:w-30 h-8 sm:h-10"
                onClick={() => {
                  if (selectedSongs.length > 0) {
                    setDel(true);
                  } else {
                    setDel(false);
                    alert("請選擇歌曲");
                  }
                }}
            >
            <AddIcon />
                Delete
            </Button>
        </div>
        
        <NewSongDialog 
        id={id}
        open={open}
        onClose={() => setOpen(false)}
        />

        <DeleteSongDialog 
        del={del}
        delsongs={selectedSongs}
        onClose={() => setDel(false)}

        />

        <div className="mx-10 sm:mx-20 mt-5 mb-20 text-sm sm:text-base ">
          <table className="w-full">
          <thead>
            <tr>
            <td className="border-b p-2">
              <input type="checkbox" onChange={handleSelectAll}/>
            </td>
            <td className="border-b p-2">Song</td>
            <td className="border-b p-2">Singer</td>
            <td className="border-b p-2">Link</td>
            <td className="border-b p-2">Append</td>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map((song) => (
              <Song
              key={song.id}{...song}
              onBoxChange={(id, checked) => handleboxChange(id, checked)}
              checked={songSelections[song.id] || false}
            />
            ))}
          </tbody>
      </table>
    </div>    
    </>
    )
}