import { useState, useEffect } from 'react';
import api from '../../services/api';
import Layout from '../../components/Layout';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotes = () => {
    api.get('/notes').then((res) => setNotes(res.data));
  };

  useEffect(() => {
    fetchNotes();
    setLoading(false);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.post('/notes', { title, content });
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const togglePin = async (note) => {
    await api.put(`/notes/${note._id}`, { isPinned: !note.isPinned });
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    fetchNotes();
  };

  if (loading) {
    return (
      <Layout>
        <p style={{ color: '#733040' }}>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#481E28', margin: 0 }}>Notes</h1>
        <p style={{ color: '#733040', margin: '4px 0 0' }}>
          {notes.length} note{notes.length !== 1 ? 's' : ''}
        </p>
      </header>

      <form onSubmit={handleAdd} style={formStyle}>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={textareaStyle}
        />
        <button type="submit" style={addBtnStyle}>Add Note</button>
      </form>

      <div style={gridStyle}>
        {notes.length === 0 && <p style={{ color: '#CF8B9C' }}>No notes yet — add one above.</p>}
        {notes.map((note) => (
          <div key={note._id} style={noteCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <h4 style={{ color: '#481E28', margin: 0 }}>{note.title}</h4>
              <button onClick={() => togglePin(note)} style={pinBtnStyle}>
                {note.isPinned ? '📌' : '📍'}
              </button>
            </div>
            <p style={{ color: '#733040', fontSize: 14, marginTop: 8, whiteSpace: 'pre-wrap' }}>
              {note.content}
            </p>
            <button onClick={() => handleDelete(note._id)} style={deleteBtnStyle}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginBottom: 24,
  background: '#fff',
  padding: 20,
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(72, 30, 40, 0.08)',
};

const inputStyle = {
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid #E1B6C1',
  fontSize: 14,
  outline: 'none',
};

const textareaStyle = {
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid #E1B6C1',
  fontSize: 14,
  outline: 'none',
  minHeight: 80,
  fontFamily: 'inherit',
  resize: 'vertical',
};

const addBtnStyle = {
  padding: '12px 24px',
  borderRadius: 8,
  border: 'none',
  background: '#BD6077',
  color: '#fff',
  fontWeight: 600,
  alignSelf: 'flex-start',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
  gap: 16,
};

const noteCardStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 4px 12px rgba(72, 30, 40, 0.08)',
};

const pinBtnStyle = {
  border: 'none',
  background: 'transparent',
  fontSize: 16,
  cursor: 'pointer',
};

const deleteBtnStyle = {
  marginTop: 12,
  fontSize: 12,
  padding: '5px 10px',
  borderRadius: 6,
  border: '1px solid #752300',
  background: 'transparent',
  color: '#752300',
};