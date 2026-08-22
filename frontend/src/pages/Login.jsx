import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, User, Lock, EyeOff, ArrowRight } from 'lucide-react';
import { authApi } from '../services/mockApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout animate-fade-in">
      <div className="auth-glass-panel" style={{ maxWidth: '440px' }}>
        
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ background: 'var(--color-primary)', borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
              <MapPin size={24} color="white" />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a' }}>GlobeTrotter</h1>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#475569' }}>Plan your journey. Discover the world.</p>
        </div>

        {/* Welcome Text */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.25rem' }}>Welcome back!</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>Continue planning your next adventure.</p>
        </div>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--color-error)', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Email Input */}
          <div className="auth-input-container">
            <User size={18} className="auth-icon" />
            <input 
              type="email" 
              placeholder="Email or Username" 
              className="auth-input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          {/* Password Input */}
          <div className="auth-input-container">
            <Lock size={18} className="auth-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              className="auth-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
            <EyeOff size={18} className="auth-icon-right" />
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', cursor: 'pointer' }}>
              <input type="checkbox" style={{ cursor: 'pointer' }} /> Remember me
            </label>
            <a href="#" style={{ color: '#1d4ed8', fontWeight: '500' }}>Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="auth-btn" style={{ marginTop: '0.5rem' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
            {!loading && <ArrowRight size={18} style={{ marginLeft: 'auto', background: 'white', color: '#1d4ed8', borderRadius: '50%', padding: '2px' }} />}
          </button>
        </form>
        
        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#475569' }}>
          New to GlobeTrotter? <Link to="/signup" style={{ color: '#1d4ed8', fontWeight: '600' }}>Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
