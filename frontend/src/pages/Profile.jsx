import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Edit2, MapPin, Mail, Globe, Plane, Calendar, Briefcase, MoreVertical, Copy, ChevronRight, DollarSign } from 'lucide-react';

const Profile = () => {

  const preplannedTrips = [
    {
      id: 1, title: 'Japan Explorer', path: 'Tokyo • Kyoto • Osaka', status: 'Upcoming', statusColor: '#3b82f6',
      dates: 'Sep 03 - Sep 14, 2026', duration: '3 Cities • 12 Days', budget: '3,100', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2, title: 'European Summer Escape', path: 'Paris • Rome • Barcelona', status: 'Upcoming', statusColor: '#3b82f6',
      dates: 'Oct 10 - Oct 22, 2026', duration: '3 Cities • 13 Days', budget: '2,850', img: 'https://images.unsplash.com/photo-1502602881469-4478223656ce?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3, title: 'Bali Adventure', path: 'Bali • Ubud • Seminyak', status: 'Upcoming', statusColor: '#3b82f6',
      dates: 'Nov 05 - Nov 12, 2026', duration: '3 Stops • 8 Days', budget: '1,850', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const previousTrips = [
    {
      id: 4, title: 'Dubai Getaway', path: 'Dubai, UAE', status: 'Completed', statusColor: '#10b981',
      dates: 'Jan 12 - Jan 17, 2026', duration: '1 City • 5 Days', budget: '1,240', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5, title: 'Singapore Escape', path: 'Singapore', status: 'Completed', statusColor: '#10b981',
      dates: 'Feb 04 - Feb 10, 2026', duration: '1 City • 6 Days', budget: '1,560', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6, title: 'Kerala Escape', path: 'Kochi • Munnar • Alleppey', status: 'Completed', statusColor: '#10b981',
      dates: 'Mar 15 - Mar 21, 2026', duration: '3 Places • 7 Days', budget: '1,180', img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', padding: '3rem 4rem 4rem 4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      
      {/* ---------------- HEADER ---------------- */}
      <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>Profile</h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Manage your account, travel preferences, and adventures.</p>
      </div>

      {/* ---------------- USER CARD ---------------- */}
      <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.05)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          
          {/* Avatar Area */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', padding: '4px', background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' }}>
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Alex Morgan" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid white' }} />
            </div>
            <button style={{ position: 'absolute', bottom: '5px', right: '5px', width: '36px', height: '36px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)', color: '#1d4ed8', cursor: 'pointer' }}>
              <Camera size={18} />
            </button>
          </div>

          {/* User Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.25rem' }}>Alex Morgan</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Travel enthusiast • Exploring the world one city at a time</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#475569', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--color-text-muted)" /> alex@example.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--color-text-muted)" /> New York, USA
              </div>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: '#eff6ff', padding: '0.5rem', borderRadius: '50%', color: '#3b82f6' }}><Globe size={24} /></div>
                <div>
                  <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', lineHeight: 1 }}>12</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Trips</span>
                </div>
              </div>
              
              <div style={{ width: '1px', background: 'var(--color-border)' }}></div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: '#fef2f2', padding: '0.5rem', borderRadius: '50%', color: '#ef4444' }}><MapPin size={24} /></div>
                <div>
                  <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', lineHeight: 1 }}>24</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Cities</span>
                </div>
              </div>

              <div style={{ width: '1px', background: 'var(--color-border)' }}></div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: '#f0fdf4', padding: '0.5rem', borderRadius: '50%', color: '#3b82f6' }}><Plane size={24} /></div>
                <div>
                  <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', lineHeight: 1 }}>8</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button style={{ background: '#1d4ed8', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(29, 78, 216, 0.2)' }}>
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>

      </div>

      {/* ---------------- PREPLANNED TRIPS ---------------- */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              <Calendar size={20} color="#1d4ed8" /> Preplanned Trips
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Trips you're planning or have saved for later.</p>
          </div>
          <Link to="/my-trips" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {preplannedTrips.map(trip => (
            <div key={trip.id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '160px' }}>
                <img src={trip.img} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: trip.statusColor, color: 'white', fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.75rem', borderRadius: '2rem' }}>
                  {trip.status}
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.9)', color: 'var(--color-text-muted)', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}>
                  <MoreVertical size={16} />
                </div>
              </div>
              
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.75rem' }}>{trip.title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14}/> {trip.path}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14}/> {trip.dates}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plane size={14}/> {trip.duration}</span>
                </div>
                
                <div style={{ marginTop: 'auto', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: '#f0fdf4', padding: '0.2rem', borderRadius: '50%', color: '#10b981' }}><DollarSign size={14} /></div>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-text)' }}>${trip.budget}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: '1.75rem' }}>Estimated budget</span>
                </div>
                
                <button style={{ width: '100%', background: '#1d4ed8', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                  View Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PREVIOUS TRIPS ---------------- */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              <Briefcase size={20} color="#64748b" /> Previous Trips
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Your completed travel experiences.</p>
          </div>
          <Link to="/my-trips" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View all <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {previousTrips.map(trip => (
            <div key={trip.id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '160px' }}>
                <img src={trip.img} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#dcfce7', color: '#166534', fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.75rem', borderRadius: '2rem' }}>
                  {trip.status}
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.9)', color: 'var(--color-text-muted)', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}>
                  <MoreVertical size={16} />
                </div>
              </div>
              
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.75rem' }}>{trip.title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14}/> {trip.path}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14}/> {trip.dates}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plane size={14}/> {trip.duration}</span>
                </div>
                
                <div style={{ marginTop: 'auto', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ background: '#f0fdf4', padding: '0.2rem', borderRadius: '50%', color: '#10b981' }}><DollarSign size={14} /></div>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--color-text)' }}>${trip.budget}</span> <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '600' }}>spent</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button style={{ flex: 1, background: '#1d4ed8', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                    View Trip
                  </button>
                  <button style={{ flex: 1, background: 'white', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <Copy size={16} /> Copy Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Profile;
