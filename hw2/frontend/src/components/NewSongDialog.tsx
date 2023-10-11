import { useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createCard } from "@/utils/client";

type NewSongDialogProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export default function NewSongDialog({ id, open, onClose }: NewSongDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const songtextfieldRef = useRef<HTMLInputElement>(null);
  const singertextfieldRef = useRef<HTMLInputElement>(null);
  const linktextfieldRef = useRef<HTMLInputElement>(null);
  const { fetchCards } = useCards();

  const handleAddSong = async () => {
    try {
      await createCard({ song: songtextfieldRef.current?.value ?? "", singer: singertextfieldRef.current?.value ?? "", url: linktextfieldRef.current?.value ?? "", list_id: id });
      fetchCards();
    } catch (error) {
      alert("Error: Failed to create song");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Song</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={songtextfieldRef}
          label="Song"
          variant="outlined"
          sx={{ mt: 1 }}
          autoFocus
        />
        <br />
        <TextField
          inputRef={singertextfieldRef}
          label="Singer"
          variant="outlined"
          sx={{ mt: 1 }}
          autoFocus
        />
        <br />
        <TextField
          inputRef={linktextfieldRef}
          label="Link"
          variant="outlined"
          sx={{ mt: 1 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSong}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
