import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import useCards from "@/hooks/useCards";
import { deleteCard } from "@/utils/client";

type DeleteSongDialogProps = {
  delsongs: string[];
  del: boolean;
  onClose: () => void;
};

export default function DeleteSongDialog({ del, delsongs, onClose}: DeleteSongDialogProps) {

  const { songs, fetchCards } = useCards();

  const handleDelete = async () => {
    try {
      for (const songId of delsongs) {
        await deleteCard(songId);
      }
      fetchCards();
    } catch (error) {
      alert("Error: Failed to delete card");
    } finally {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    if (delsongs.length > 0) {
      const isConfirmed = window.confirm("確認刪除歌曲？");
      if (isConfirmed) {handleDelete();}
    }
  }

  return (
    <Dialog open={del} onClose={onClose}>
      <DialogTitle>Deleting Songs</DialogTitle>
      <DialogContent>
      {delsongs.map(songId => {
        // Find the corresponding song object based on the songId
        const selectedSong = songs.find(song => song.id === songId);
        // Check if the song is found
        if (selectedSong) {
          return (
            <div className="flex" key={songId}>
              <div>{selectedSong.song}  /  </div>
              <div>  {selectedSong.singer}</div>
            </div>
          );
        } else { //!!!不管怎樣都進不來
          return null
        }}
      )}
      
    </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDeleteClick()}>delete</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
