import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { MapPin, Home, Map, Compass, Calendar, DollarSign, Search, Bell, ChevronDown, User, Settings, Bookmark, LogOut, Users } from 'lucide-react';

const Layout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'My Trips', icon: Map, path: '/my-trips' },
    { name: 'Explore', icon: Compass, path: '/explore' },
    { name: 'Calendar', icon: Calendar, path: '/calendar' },
    { name: 'Community', icon: Users, path: '/community', active: true },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      
      {/* Top Navigation Bar */}
      <nav style={{ background: 'white', borderBottom: '1px solid var(--color-border)', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '72px', position: 'sticky', top: 0, zIndex: 50 }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', textDecoration: 'none' }}>
          <div style={{ background: 'var(--color-primary)', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
            <MapPin size={20} color="white" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>GlobeTrotter</span>
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Plan your journey. Discover the world.</span>
          </div>
        </Link>

        {/* Center Links */}
        <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
          {navLinks.map((link, idx) => (
            <Link key={idx} to={link.path} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: link.active ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: link.active ? '600' : '500', textDecoration: 'none', borderBottom: link.active ? '2px solid var(--color-primary)' : '2px solid transparent', padding: '0 0.5rem' }}>
              <link.icon size={18} /> {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button style={{ color: 'var(--color-text)', cursor: 'pointer' }}><Search size={20} /></button>
          
          <button style={{ position: 'relative', color: 'var(--color-text)', cursor: 'pointer' }}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--color-error)', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
          </button>

          {/* Profile Dropdown */}
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '2rem', background: isDropdownOpen ? 'var(--color-surface-hover)' : 'transparent', transition: 'background 0.2s' }}
            >
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontWeight: '500', color: 'var(--color-text)', fontSize: '0.95rem' }}>Aditya</span>
              <ChevronDown size={16} color="var(--color-text-muted)" />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div style={{ position: 'absolute', top: '110%', right: 0, width: '220px', background: 'white', borderRadius: '0.75rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)', padding: '0.5rem', display: 'flex', flexDirection: 'column', zIndex: 100 }} className="animate-fade-in">
                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '0.5rem' }} className="hover-bg">
                  <User size={16} color="var(--color-text-muted)" /> My Profile
                </Link>
                <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '0.5rem' }} className="hover-bg">
                  <Settings size={16} color="var(--color-text-muted)" /> Settings
                </Link>
                <Link to="/saved" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--color-text)', textDecoration: 'none', borderRadius: '0.5rem' }} className="hover-bg">
                  <Bookmark size={16} color="var(--color-text-muted)" /> Saved Destinations
                </Link>
                <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.5rem 0' }}></div>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--color-error)', width: '100%', textAlign: 'left', borderRadius: '0.5rem', cursor: 'pointer' }} className="hover-bg">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </nav>
      
      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
