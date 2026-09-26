import { useState } from "react";
import { MdNoteAlt } from "react-icons/md";

function NotesWidget() {

  const [note, setNote] = useState("");

  return (

    <div className="widget-card">

      <div className="widget-header">

        <MdNoteAlt className="widget-icon" />

        <h3>Quick Notes</h3>

      </div>

      <textarea
        placeholder="Write your notes..."
        value={note}
        onChange={(e)=>setNote(e.target.value)}
      />

    </div>

  );

}

export default NotesWidget;