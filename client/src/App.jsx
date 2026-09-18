import { useEffect, useState } from "react";

const SERVER = "http://localhost:5000/api/notes";

function App() {
  const [list, setList] = useState([]);
  const [t, setT] = useState("");
  const [c, setC] = useState("");
  const [status, setStatus] = useState("connecting...");

  async function loadNotes() {
    try {
      const res = await fetch(SERVER);
      const data = await res.json();
      setList(data);
      setStatus("");
    } catch (err) {
      setStatus("ERROR: server not responding");
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function saveNote(e) {
    e.preventDefault();
    if (t.trim().length === 0 || c.trim().length === 0) {
      setStatus("both title and text needed");
      return;
    }
    try {
      const res = await fetch(SERVER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: t, content: c }),
      });
      const newNote = await res.json();
      setList([newNote, ...list]);
      setT("");
      setC("");
      setStatus("saved.");
    } catch (err) {
      setStatus("ERROR: could not save");
    }
  }

  async function delNote(id) {
    try {
      await fetch(SERVER + "/" + id, { method: "DELETE" });
      setList(list.filter((x) => x._id !== id));
      setStatus("deleted.");
    } catch (err) {
      setStatus("ERROR: could not delete");
    }
  }

  return (
    <div className="wrap">
      <div className="topbar">
        <span className="logo">&gt;_ notepad</span>
        <span className="count">{list.length} note(s)</span>
      </div>

      <form className="entry" onSubmit={saveNote}>
        <input
          type="text"
          placeholder="title goes here"
          value={t}
          onChange={(e) => setT(e.target.value)}
        />
        <textarea
          placeholder="type something..."
          rows="3"
          value={c}
          onChange={(e) => setC(e.target.value)}
        />
        <div className="btnrow">
          <button type="submit">[ save ]</button>
          <button
            type="button"
            onClick={() => {
              setT("");
              setC("");
            }}
          >
            [ clear ]
          </button>
        </div>
      </form>

      {status && <div className="statusline">{status}</div>}

      <div className="grid">
        {list.map((item) => (
          <div className="box" key={item._id}>
            <div className="boxtitle">
              {item.title}
              <button className="x" onClick={() => delNote(item._id)}>
                x
              </button>
            </div>
            <div className="boxtext">{item.content}</div>
            <div className="boxdate">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>

      {list.length === 0 && !status && (
        <p className="empty">-- no notes saved --</p>
      )}
    </div>
  );
}

export default App;
