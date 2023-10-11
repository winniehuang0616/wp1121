import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

import useCards from "@/hooks/useCards";
import { createCard } from "@/utils/client";

type NewSongDialogProps = {
  song: string;
  singer: string;
  url: string;
  listId: string;
  open: boolean;
  onClose: () => void;
};

export default function NewSongDialog({ song, singer, url, listId, open, onClose }: NewSongDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const [newListId, setNewListId] = useState(listId);
  const { lists, fetchCards } = useCards();

  const handleAddSong = async () => {
    try {
      await createCard({ song: song, singer: singer, url: url, list_id: newListId });
      fetchCards();
    } catch (error) {
      alert("Error: Failed to create song");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Song To Other List</DialogTitle>
      <DialogContent>
      <Select
          value={newListId}
          onChange={(e) => setNewListId(e.target.value)}
        >
          {lists.map((list) => {
          return (
            <MenuItem value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          );
          })}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSong}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
