import { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../auth/AuthContext';
import Layout from '../../components/Layout';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwMessage, setPwMessage] = useState('');
  const [pwError, setPwError] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await api.put('/profile', { name });
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPwMessage('');
    setPwError('');
    try {
      await api.put('/profile/password', { currentPassword, newPassword });
      setPwMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPwError(err.response?.data?.message || 'Password update failed');
    }
  };

  return (
    <Layout>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ color: '#481E28', margin: 0 }}>Profile</h1>
        <p style={{ color: '#733040', margin: '4px 0 0' }}>Manage your account settings</p>
      </header>

      <div style={columnsStyle}>
        <section style={cardStyle}>
          <h3 style={cardTitleStyle}>Basic Info</h3>
          {message && <p style={successStyle}>{message}</p>}
          {error && <p style={errorStyle}>{error}</p>}
          <form onSubmit={handleProfileUpdate}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
            <label style={labelStyle}>Email</label>
            <input type="email" value={user?.email || ''} disabled style={disabledInputStyle} />
            <button type="submit" style={btnStyle}>Save Changes</button>
          </form>
        </section>

        <section style={cardStyle}>
          <h3 style={cardTitleStyle}>Change Password</h3>
          {pwMessage && <p style={successStyle}>{pwMessage}</p>}
          {pwError && <p style={errorStyle}>{pwError}</p>}
          <form onSubmit={handlePasswordUpdate}>
            <label style={labelStyle}>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
              required
              minLength={6}
            />
            <button type="submit" style={btnStyle}>Update Password</button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

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

const labelStyle = {
  display: 'block',
  fontSize: 13,
  color: '#733040',
  marginBottom: 6,
  marginTop: 12,
};

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #E1B6C1',
  fontSize: 14,
  outline: 'none',
};

const disabledInputStyle = {
  ...inputStyle,
  background: '#F3E1E6',
  color: '#733040',
};

const btnStyle = {
  marginTop: 20,
  padding: '10px 20px',
  borderRadius: 8,
  border: 'none',
  background: '#BD6077',
  color: '#fff',
  fontWeight: 600,
};

const successStyle = {
  color: '#B79C2E',
  fontSize: 13,
  background: '#F3E1E6',
  padding: '8px 12px',
  borderRadius: 8,
  marginBottom: 8,
};

const errorStyle = {
  color: '#752300',
  fontSize: 13,
  background: '#F3E1E6',
  padding: '8px 12px',
  borderRadius: 8,
  marginBottom: 8,
};