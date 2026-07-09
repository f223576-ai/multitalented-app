import { useState, useEffect } from 'react';
import api from '../../services/api';
import Layout from '../../components/Layout';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');

  const fetchTasks = () => {
    api.get('/tasks').then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
    setLoading(false);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.post('/tasks', { title, status: 'pending' });
    setTitle('');
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const next =
      task.status === 'pending' ? 'in-progress' : task.status === 'in-progress' ? 'completed' : 'pending';
    await api.put(`/tasks/${task._id}`, { status: next });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
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
        <h1 style={{ color: '#481E28', margin: 0 }}>Tasks</h1>
        <p style={{ color: '#733040', margin: '4px 0 0' }}>
          {tasks.length} total task{tasks.length !== 1 ? 's' : ''}
        </p>
      </header>

      <form onSubmit={handleAdd} style={formStyle}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={addBtnStyle}>Add</button>
      </form>

      <div style={listStyle}>
        {tasks.length === 0 && <p style={{ color: '#CF8B9C' }}>No tasks yet — add one above.</p>}
        {tasks.map((task) => (
          <div key={task._id} style={taskRowStyle}>
            <span style={{ color: '#481E28' }}>{task.title}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => toggleStatus(task)} style={badgeBtnStyle(task.status)}>
                {task.status}
              </button>
              <button onClick={() => handleDelete(task._id)} style={deleteBtnStyle}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

const formStyle = {
  display: 'flex',
  gap: 12,
  marginBottom: 24,
};

const inputStyle = {
  flex: 1,
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid #E1B6C1',
  fontSize: 14,
  outline: 'none',
};

const addBtnStyle = {
  padding: '12px 24px',
  borderRadius: 8,
  border: 'none',
  background: '#BD6077',
  color: '#fff',
  fontWeight: 600,
};

const listStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 4px 12px rgba(72, 30, 40, 0.08)',
};

const taskRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 8px',
  borderBottom: '1px solid #F3E1E6',
};

const badgeBtnStyle = (status) => ({
  fontSize: 11,
  padding: '5px 12px',
  borderRadius: 20,
  border: 'none',
  background:
    status === 'completed' ? '#B79C2E' : status === 'in-progress' ? '#BD6077' : '#E1B6C1',
  color: '#fff',
  textTransform: 'capitalize',
});

const deleteBtnStyle = {
  fontSize: 12,
  padding: '5px 10px',
  borderRadius: 6,
  border: '1px solid #752300',
  background: 'transparent',
  color: '#752300',
};