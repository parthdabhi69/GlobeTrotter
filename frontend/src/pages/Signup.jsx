import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  User,
  Mail,
  Lock,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Phone,
  Building,
  Globe,
  Camera
} from 'lucide-react';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Country');
  const [travelStyle, setTravelStyle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (country === 'Country') {
      setError('Please select your country');
      return;
    }

    setLoading(true);

    try {
      // Generate username from email
      const username = email
        .split('@')[0]
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '');

      const response = await fetch(
        'http://127.0.0.1:8000/api/users/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            password_confirm: confirmPassword,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            city,
            country,
            additional_info: travelStyle,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (typeof data === 'object') {
          const messages = Object.values(data)
            .flat()
            .join(' ');

          throw new Error(
            messages || 'Registration failed.'
          );
        }

        throw new Error('Registration failed.');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout animate-fade-in">

      {/* Back Button */}
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 10
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.5)',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div
        className="auth-glass-panel"
        style={{
          maxWidth: '500px',
          padding: '2.5rem'
        }}
      >

        {/* Logo Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem'
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
                padding: '0.4rem',
                display: 'flex'
              }}
            >
              <MapPin size={20} color="white" />
            </div>

            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#0f172a'
              }}
            >
              GlobeTrotter
            </h1>
          </div>

          <p
            style={{
              fontSize: '0.8rem',
              color: '#475569'
            }}
          >
            Plan your journey. Discover the world.
          </p>
        </div>

        {/* Welcome Text */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              color: '#0f172a',
              marginBottom: '0.25rem'
            }}
          >
            Create your account
          </h2>

          <p
            style={{
              fontSize: '0.85rem',
              color: '#475569'
            }}
          >
            Start planning unforgettable journeys.
          </p>
        </div>

        {/* Avatar Upload Placeholder */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '3px solid rgba(255,255,255,0.8)'
            }}
          >
            <Globe
              size={48}
              color="rgba(255,255,255,0.5)"
            />

            <div
              style={{
                position: 'absolute',
                bottom: '-5px',
                right: '-5px',
                background: 'white',
                borderRadius: '50%',
                padding: '0.25rem',
                display: 'flex',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <Camera
                size={14}
                color="#0f172a"
              />
            </div>
          </div>

          <span
            style={{
              fontSize: '0.8rem',
              color: '#475569',
              marginTop: '0.5rem'
            }}
          >
            Add photo
          </span>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--color-error)',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--color-error)',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >

          {/* First + Last Name */}
          <div className="auth-row">

            <div className="auth-input-container">
              <User
                size={16}
                className="auth-icon"
              />

              <input
                type="text"
                placeholder="First Name"
                className="auth-input"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                required
              />
            </div>

            <div className="auth-input-container">
              <User
                size={16}
                className="auth-icon"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="auth-input"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                required
              />
            </div>

          </div>

          {/* Email + Phone */}
          <div className="auth-row">

            <div className="auth-input-container">
              <Mail
                size={16}
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
                required
              />
            </div>

            <div className="auth-input-container">
              <Phone
                size={16}
                className="auth-icon"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="auth-input"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />
            </div>

          </div>

          {/* City + Country */}
          <div className="auth-row">

            <div className="auth-input-container">
              <Building
                size={16}
                className="auth-icon"
              />

              <input
                type="text"
                placeholder="City"
                className="auth-input"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />
            </div>

            <div className="auth-input-container">
              <Globe
                size={16}
                className="auth-icon"
              />

              <select
                className="auth-input"
                style={{
                  appearance: 'none',
                  color:
                    country === 'Country'
                      ? '#64748b'
                      : '#0f172a'
                }}
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value)
                }
              >
                <option disabled value="Country">
                  Country
                </option>

                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>India</option>
                <option>Other</option>
              </select>
            </div>

          </div>

          {/* Travel Style */}
          <div
            className="auth-input-container"
            style={{ marginTop: '0.5rem' }}
          >
            <div
              style={{
                position: 'absolute',
                left: '1rem',
                top: '1rem',
                color: '#64748b'
              }}
            >
              ✎
            </div>

            <textarea
              placeholder={
                `Tell us about your travel style...\n` +
                `Beach lover, mountain explorer, foodie, backpacker...`
              }
              className="auth-input"
              style={{
                minHeight: '80px',
                paddingLeft: '2.75rem',
                paddingTop: '1rem',
                resize: 'none'
              }}
              value={travelStyle}
              onChange={(e) =>
                setTravelStyle(e.target.value)
              }
            />
          </div>

          {/* Password */}
          <div
            className="auth-input-container"
            style={{ marginTop: '0.5rem' }}
          >
            <Lock
              size={16}
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
              required
            />

            <EyeOff
              size={16}
              className="auth-icon-right"
            />
          </div>

          {/* Confirm Password */}
          <div className="auth-input-container">

            <Lock
              size={16}
              className="auth-icon"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

            <EyeOff
              size={16}
              className="auth-icon-right"
            />

          </div>

          {/* Terms */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: '#475569',
              marginTop: '0.5rem'
            }}
          >
            <input
              type="checkbox"
              required
              style={{
                marginTop: '0.2rem',
                cursor: 'pointer'
              }}
            />

            <span>
              I agree to the{' '}
              <a
                href="#"
                style={{ color: '#1d4ed8' }}
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="#"
                style={{ color: '#1d4ed8' }}
              >
                Privacy Policy
              </a>.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="auth-btn"
            style={{ marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading
              ? 'Creating Account...'
              : 'Create Account'}

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

        {/* Login Link */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontSize: '0.85rem',
            color: '#475569'
          }}
        >
          Already have an account?{' '}

          <Link
            to="/login"
            style={{
              color: '#1d4ed8',
              fontWeight: '600'
            }}
          >
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;