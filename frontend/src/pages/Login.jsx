import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Lock,
  EyeOff,
  ArrowRight
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    // Remove any old authentication data
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/api/users/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      // Django returned an error
      if (!response.ok) {
        let message = 'Invalid email or password.';

        if (typeof data === 'object' && data !== null) {
          const messages = Object.values(data)
            .flat()
            .map((item) => String(item))
            .join(' ');

          if (messages) {
            message = messages;
          }
        }

        throw new Error(message);
      }

      // =====================================================
      // CHECK JWT RESPONSE
      // =====================================================

      if (!data.access) {
        console.error('Login response:', data);

        throw new Error(
          'Login succeeded, but no access token was returned by the server.'
        );
      }

      // =====================================================
      // STORE JWT
      // =====================================================

      localStorage.setItem(
        'access_token',
        data.access
      );

      if (data.refresh) {
        localStorage.setItem(
          'refresh_token',
          data.refresh
        );
      }

      // =====================================================
      // STORE USER
      // =====================================================

      if (data.user) {
        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        );
      }

      // =====================================================
      // GO TO DASHBOARD
      // =====================================================

      navigate('/', { replace: true });

    } catch (err) {
      console.error('Login error:', err);

      setError(
        err.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout animate-fade-in">

      <div
        className="auth-glass-panel"
        style={{ maxWidth: '440px' }}
      >

        {/* =================================================
            LOGO
        ================================================= */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}
          >

            <div
              style={{
                background: 'var(--color-primary)',
                borderRadius: '50%',
                padding: '0.5rem',
                display: 'flex'
              }}
            >
              <MapPin
                size={24}
                color="white"
              />
            </div>

            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#0f172a'
              }}
            >
              GlobeTrotter
            </h1>

          </div>

          <p
            style={{
              fontSize: '0.85rem',
              color: '#475569'
            }}
          >
            Plan your journey. Discover the world.
          </p>

        </div>


        {/* =================================================
            WELCOME
        ================================================= */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >

          <h2
            style={{
              fontSize: '1.5rem',
              color: '#0f172a',
              marginBottom: '0.25rem'
            }}
          >
            Welcome back!
          </h2>

          <p
            style={{
              fontSize: '0.9rem',
              color: '#475569'
            }}
          >
            Continue planning your next adventure.
          </p>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--color-error)',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border:
                '1px solid var(--color-error)',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}
          >
            {error}
          </div>
        )}


        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >

          {/* EMAIL */}

          <div className="auth-input-container">

            <Mail
              size={18}
              className="auth-icon"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="auth-input"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="auth-input-container">

            <Lock
              size={18}
              className="auth-icon"
            />

            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              required
            />

            <EyeOff
              size={18}
              className="auth-icon-right"
            />

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="auth-btn"
            style={{
              marginTop: '0.5rem'
            }}
            disabled={loading}
          >

            {loading
              ? 'Logging in...'
              : 'Log In'}

            {!loading && (
              <ArrowRight
                size={18}
                style={{
                  marginLeft: 'auto',
                  background: 'white',
                  color: '#1d4ed8',
                  borderRadius: '50%',
                  padding: '2px'
                }}
              />
            )}

          </button>

        </form>


        {/* =================================================
            SIGNUP
        ================================================= */}

        <div
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: '#475569'
          }}
        >

          New to GlobeTrotter?{' '}

          <Link
            to="/signup"
            style={{
              color: '#1d4ed8',
              fontWeight: '600'
            }}
          >
            Create an account
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;