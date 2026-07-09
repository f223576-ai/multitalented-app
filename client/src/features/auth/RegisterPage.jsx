import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #F3E1E6 0%, #E1B6C1 100%)',
      }}
    >
      <div
        style={{
          maxWidth: 380,
          width: '100%',
          background: '#fff',
          padding: 40,
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(72, 30, 40, 0.15)',
        }}
      >
        <h2 style={{ color: '#481E28', marginBottom: 8 }}>Create Account</h2>
        <p style={{ color: '#733040', marginBottom: 24, fontSize: 14 }}>
          Join the multitalented app
        </p>

        {error && (
          <p
            style={{
              color: '#752300',
              background: '#F3E1E6',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: 14,
              marginBottom: 16,
            }}
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </form>

        <p style={{ marginTop: 20, fontSize: 14, color: '#733040', textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#BD6077', fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 8,
  border: '1px solid #E1B6C1',
  fontSize: 14,
  outline: 'none',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: 8,
  border: 'none',
  background: '#BD6077',
  color: '#fff',
  fontSize: 15,
  fontWeight: 600,
};