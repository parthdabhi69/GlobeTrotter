import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, SlidersHorizontal, Map, MapPin, Heart, Calendar, Clock, Plus, ArrowRight, Compass } from 'lucide-react';

const Dashboard = () => {

  const topDestinations = [
    { id: 1, name: 'Bali', country: 'Indonesia', rating: 4.8, price: 610, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80', flag: '🇮🇩' },
    { id: 2, name: 'Paris', country: 'France', rating: 4.9, price: 820, img: 'https://images.unsplash.com/photo-1502602881469-4478223656ce?auto=format&fit=crop&w=600&q=80', flag: '🇫🇷' },
    { id: 3, name: 'Swiss Alps', country: 'Switzerland', rating: 4.9, price: 1340, img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80', flag: '🇨🇭' },
    { id: 4, name: 'Tokyo', country: 'Japan', rating: 4.7, price: 1120, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80', flag: '🇯🇵' },
    { id: 5, name: 'Dubai', country: 'UAE', rating: 4.6, price: 890, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80', flag: '🇦🇪' },
  ];

  const previousTrips = [
    {
      id: 1, title: 'Europe Explorer', path: 'Paris → Rome → Barcelona', status: 'In Progress', statusColor: '#3b82f6',
      dates: '12 Jun - 24 Jun 2026', days: 12, cities: 3, budget: 2450, totalBudget: 3000, progress: 82, img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2, title: 'Japan Adventure', path: 'Tokyo → Kyoto → Osaka', status: 'Upcoming', statusColor: '#10b981',
      dates: '05 Oct - 15 Oct 2026', days: 11, cities: 3, budget: 1850, totalBudget: 2200, progress: 68, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3, title: 'Thailand Getaway', path: 'Bangkok → Phuket → Krabi', status: 'Draft', statusColor: '#64748b',
      dates: '20 Nov - 28 Nov 2026', days: 9, cities: 2, budget: 950, totalBudget: 1500, progress: 35, img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80', progressColor: '#f59e0b'
    }
  ];

  return (
    <div style={{ background: 'var(--color-bg)', position: 'relative' }}>
      
      {/* ---------------- HERO SECTION ---------------- */}
      <section style={{ 
        position: 'relative', 
        height: '450px', 
        backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.2)), url("https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=2800&q=80")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        padding: '4rem 4rem 0 4rem',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.5rem', color: '#e2e8f0' }}>Good morning, Aditya 👋</p>
          <h1 style={{ fontSize: '4rem', fontWeight: '700', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Where will you<br/>go next?</h1>
          <p style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.5 }}>
            Plan unforgettable journeys, discover amazing destinations, and keep every trip organized in one place.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/create-trip" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1d4ed8', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', color: 'white', textDecoration: 'none' }}>
              <Plus size={18} /> Plan a New Trip
            </Link>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', padding: '0.8rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', color: 'white', backdropFilter: 'blur(10px)', cursor: 'pointer' }}>
              <Compass size={18} /> Explore Destinations
            </button>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div style={{ 
          position: 'absolute', 
          bottom: '-35px', 
          left: '4rem', 
          right: '4rem', 
          background: 'white', 
          borderRadius: '1rem', 
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, borderRight: '1px solid var(--color-border)', paddingRight: '1rem' }}>
            <Search size={20} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search destinations, cities or activities..." style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: 'var(--color-text)' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Group By</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', color: 'var(--color-text)' }}>Destination <ChevronDown size={16}/></div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'var(--color-border)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Filter</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', color: 'var(--color-text)' }}>Budget <ChevronDown size={16}/></div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'var(--color-border)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Sort By</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer', color: 'var(--color-text)' }}>Popular <ChevronDown size={16}/></div>
            </div>
          </div>
          
          <button style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', cursor: 'pointer', marginLeft: '0.5rem' }}>
            <SlidersHorizontal size={20} color="var(--color-text)" />
          </button>
        </div>
      </section>

      {/* ---------------- MAIN DASHBOARD CONTENT ---------------- */}
      <div style={{ padding: '6rem 4rem 4rem 4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Top Regional Selections */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', color: 'var(--color-text)' }}>
              <Map size={24} color="var(--color-text-muted)"/> Top Regional Selections
            </h2>
            <Link to="/explore" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
            {topDestinations.map(dest => (
              <div key={dest.id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', transition: 'transform 0.2s', cursor: 'pointer' }} className="hover:shadow-md">
                <div style={{ position: 'relative', height: '160px' }}>
                  <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', borderRadius: '50%', padding: '0.4rem', color: 'white' }}>
                    <Heart size={18} />
                  </div>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem', color: 'var(--color-text)' }}>{dest.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                    <span>{dest.flag}</span> {dest.country}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '600' }}>
                      {'★'.repeat(Math.floor(dest.rating))} <span style={{ color: 'var(--color-text-muted)', fontWeight: '400' }}>{dest.rating}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      From <span style={{ color: 'var(--color-text)', fontWeight: '700' }}>${dest.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Trips */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', color: 'var(--color-text)' }}>
              <Compass size={24} color="var(--color-text-muted)"/> Previous Trips
            </h2>
            <Link to="/my-trips" style={{ color: '#1d4ed8', fontWeight: '600', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View all trips <ArrowRight size={16} />
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {previousTrips.map(trip => (
              <div key={trip.id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '140px' }}>
                  <img src={trip.img} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: trip.statusColor, color: 'white', fontSize: '0.7rem', fontWeight: '600', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                    {trip.status}
                  </div>
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', color: 'white', cursor: 'pointer' }}>
                    <Heart size={20} />
                  </div>
                </div>
                
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)' }}>{trip.title}</h3>
                    <button style={{ color: 'var(--color-text-muted)' }}>⋮</button>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>{trip.path}</p>
                  
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14}/> {trip.dates}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> {trip.days} Days</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14}/> {trip.cities} Cities</span>
                  </div>
                  
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Budget</span>
                      <span style={{ color: trip.progressColor || '#10b981', fontWeight: '600' }}>{trip.progress}% Planned</span>
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                      ${trip.budget} <span style={{ color: 'var(--color-text-muted)', fontWeight: '400', fontSize: '0.8rem' }}>/ ${trip.totalBudget}</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--color-surface-hover)', borderRadius: '2px', marginBottom: '1.25rem', overflow: 'hidden' }}>
                      <div style={{ width: `${trip.progress}%`, height: '100%', background: trip.progressColor || '#10b981', borderRadius: '2px' }}></div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ flex: 1, background: '#1d4ed8', color: 'white', padding: '0.6rem', borderRadius: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>Continue Planning</button>
                      <button style={{ flex: 1, background: 'white', border: '1px solid var(--color-border)', color: 'var(--color-text)', padding: '0.6rem', borderRadius: '0.5rem', fontWeight: '600', fontSize: '0.85rem' }}>View Trip</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ---------------- FOOTER ---------------- */}
      <footer style={{ borderTop: '1px solid var(--color-border)', padding: '4rem', background: 'white', display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
        <div style={{ maxWidth: '250px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', marginBottom: '1rem' }}>
            <div style={{ background: 'var(--color-primary)', borderRadius: '50%', padding: '0.25rem', display: 'flex' }}>
              <MapPin size={16} color="white" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>GlobeTrotter</span>
          </div>
          <p style={{ marginBottom: '1.5rem' }}>Plan your journey. Discover the world.</p>
          <p>© 2026 GlobeTrotter. All rights reserved.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ color: 'var(--color-text)' }}>About</strong>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>How it Works</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Careers</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Press</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ color: 'var(--color-text)' }}>Explore</strong>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Destinations</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Activities</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Travel Guides</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Inspiration</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ color: 'var(--color-text)' }}>My Trips</strong>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Trips</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Itineraries</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Bookings</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Favorites</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ color: 'var(--color-text)' }}>Support</strong>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Help Center</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Us</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>FAQs</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <strong style={{ color: 'var(--color-text)' }}>Legal</strong>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
            <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Policy</Link>
          </div>
        </div>

        <div>
          <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '1rem' }}>Follow us</strong>
          <div style={{ display: 'flex', gap: '1rem', color: '#1d4ed8' }}>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>IG</span>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>TW</span>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>FB</span>
            <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>IN</span>
          </div>
        </div>
      </footer>

      {/* ---------------- FLOATING ACTION BUTTON ---------------- */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
        <button style={{ 
          background: '#1d4ed8', color: 'white', width: '64px', height: '64px', borderRadius: '50%', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
          boxShadow: '0 10px 25px rgba(29, 78, 216, 0.4)', cursor: 'pointer', border: 'none', transition: 'transform 0.2s'
        }} className="hover:transform hover:-translate-y-1">
          <Plus size={24} />
          <span style={{ fontSize: '0.6rem', fontWeight: '600' }}>Plan a Trip</span>
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
