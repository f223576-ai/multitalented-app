import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../auth/AuthContext';
import Layout from '../../components/Layout';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Layout>
        <p style={{ color: '#733040' }}>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#481E28', margin: 0 }}>Hi, {user?.name} 👋</h1>
        <p style={{ color: '#733040', margin: '4px 0 0' }}>Here's your overview</p>
      </header>

      <div style={statsGridStyle}>
        <StatCard label="Total Tasks" value={data.stats.totalTasks} color="#BD6077" />
        <StatCard label="Pending" value={data.stats.pendingTasks} color="#CF8B9C" />
        <StatCard label="Completed" value={data.stats.completedTasks} color="#B79C2E" />
        <StatCard label="Notes" value={data.stats.totalNotes} color="#752300" />
      </div>

      <div style={columnsStyle}>
        <section style={cardStyle}>
          <h3 style={cardTitleStyle}>Recent Tasks</h3>
          {data.recentTasks.length === 0 && <p style={emptyStyle}>No tasks yet</p>}
          {data.recentTasks.map((task) => (
            <div key={task._id} style={itemStyle}>
              <span>{task.title}</span>
              <span style={badgeStyle(task.status)}>{task.status}</span>
            </div>
          ))}
        </section>

        <section style={cardStyle}>
          <h3 style={cardTitleStyle}>Recent Notes</h3>
          {data.recentNotes.length === 0 && <p style={emptyStyle}>No notes yet</p>}
          {data.recentNotes.map((note) => (
            <div key={note._id} style={itemStyle}>
              <span>{note.title}</span>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ ...statCardStyle, borderTop: `4px solid ${color}` }}>
      <p style={{ fontSize: 28, fontWeight: 700, color: '#481E28', margin: 0 }}>{value}</p>
      <p style={{ fontSize: 13, color: '#733040', margin: '4px 0 0' }}>{label}</p>
    </div>
  );
}

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
  gap: 16,
  marginBottom: 32,
};

const statCardStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: '20px',
  boxShadow: '0 4px 12px rgba(72, 30, 40, 0.08)',
};

const columnsStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
};

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  padding: 24,
  boxShadow: '0 4px 12px rgba(72, 30, 40, 0.08)',
};

const cardTitleStyle = {
  color: '#481E28',
  marginTop: 0,
  marginBottom: 16,
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid #F3E1E6',
  color: '#481E28',
  fontSize: 14,
};

const emptyStyle = {
  color: '#CF8B9C',
  fontSize: 14,
};

const badgeStyle = (status) => ({
  fontSize: 11,
  padding: '3px 10px',
  borderRadius: 20,
  background:
    status === 'completed' ? '#B79C2E' : status === 'in-progress' ? '#BD6077' : '#E1B6C1',
  color: '#fff',
  textTransform: 'capitalize',
});