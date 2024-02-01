import { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewListDialog from "@/components/NewListDialog";

type delprops = {
  deleteicon: boolean
  deleteword: string;
  setDeleteword: (deleteicon:string) => void;
  setdelete: (deleteword:boolean) => void;
}

export default function MiddleBar( { deleteicon, deleteword, setDeleteword, setdelete }:delprops) {
    const [newListDialogOpen, setNewListDialogOpen] = useState(false);
    return (
      <>  
        <div className="flex flex-col sm:flex-row mt-8 mr-8 ml-10 sm:ml-20">
            <div className="text-2xl">
                <h1>My PlayList</h1>
            </div>
            <div className=" flex justify-end space-x-4 ml-0 sm:ml-auto mr-auto sm:mr-10 mt-5 sm:mt-0">
                <Button
                  variant="contained"
                  className="w-16 sm:w-24"
                  onClick={() => setNewListDialogOpen(true)}
                >
                <AddIcon />
                  Add
                </Button>

                <Button
                  variant="contained"
                  className="w-24 sm:w-32"
                  onClick={() => { 
                    setDeleteword(deleteword);
                    setdelete(deleteicon);
                  }}
                >
                <AddIcon />
                  {deleteword}
                </Button>
            </div>
        </div>
        <NewListDialog
        open={newListDialogOpen}
        onClose={() => setNewListDialogOpen(false)}
        />
    </>
    )
}