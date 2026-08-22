import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, MapPin, Calendar, Building, Star, Wallet, ArrowRight, MoreVertical, Plus, Edit2, Copy, Plane, Heart, Map } from 'lucide-react';

const MyTrips = () => {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* ---------------- HEADER BANNER ---------------- */}
      <section style={{ 
        position: 'relative', 
        height: '240px', 
        backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2800&q=80")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center 20%',
        padding: '3rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.4) 100%)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>My Trips</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>Manage, explore, and revisit your travel adventures.</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ transform: 'rotate(-5deg)', color: '#94a3b8', fontFamily: '"Comic Sans MS", cursive, sans-serif', fontSize: '1.2rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Plane size={24} style={{ transform: 'rotate(45deg)' }} />
              <div>Collect<br/>Moments<br/>Not Things</div>
            </div>
            <Link to="/create-trip" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1d4ed8', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 4px 6px rgba(29, 78, 216, 0.2)' }}>
              <Plus size={18} /> Plan New Trip
            </Link>
          </div>
        </div>
      </section>

      <div style={{ padding: '0 4rem' }}>
        
        {/* ---------------- FILTER BAR ---------------- */}
        <div style={{ 
          background: 'white', 
          borderRadius: '1rem', 
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          marginTop: '-2rem',
          position: 'relative',
          zIndex: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
            <Search size={20} color="var(--color-text-muted)" />
            <input type="text" placeholder="Search trips or destinations..." style={{ border: 'none', outline: 'none', width: '100%', fontSize: '1rem', color: 'var(--color-text)' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', minWidth: '150px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Filter</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', cursor: 'pointer', color: 'var(--color-text)', fontSize: '0.9rem' }}>All Trips <ChevronDown size={16} color="var(--color-text-muted)"/></div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', minWidth: '150px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Group by</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', cursor: 'pointer', color: 'var(--color-text)', fontSize: '0.9rem' }}>Status <ChevronDown size={16} color="var(--color-text-muted)"/></div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', minWidth: '150px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Sort by</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600', cursor: 'pointer', color: 'var(--color-text)', fontSize: '0.9rem' }}>Latest <ChevronDown size={16} color="var(--color-text-muted)"/></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* ---------------- ONGOING TRIPS ---------------- */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }}></div> Ongoing Trips
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Your current adventures. Keep exploring!</p>
              </div>
              <button style={{ color: '#1d4ed8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                View all <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', padding: '1rem', gap: '2rem', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'relative', width: '320px', height: '180px', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80" alt="European Summer Escape" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#10b981', color: 'white', fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.75rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></div> Ongoing
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', color: 'white', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}>
                  <Heart size={16} />
                </div>
              </div>
              
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.5rem' }}>European Summer Escape</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <MapPin size={16} /> Paris <span style={{ fontSize: '0.5rem' }}>•</span> Rome <span style={{ fontSize: '0.5rem' }}>•</span> Barcelona
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text)', fontSize: '0.9rem', fontWeight: '500' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} color="var(--color-text-muted)"/> Jun 10 - Jun 24, 2026</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={18} color="var(--color-text-muted)"/> 3 Cities</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={18} color="var(--color-text-muted)"/> 12 Activities</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Wallet size={24} color="#0ea5e9" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Estimated Budget</span>
                      <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>$2,450</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                      View Itinerary <ArrowRight size={16} />
                    </button>
                    <button style={{ background: 'white', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <Edit2 size={16} /> Edit
                    </button>
                    <button style={{ background: 'white', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', cursor: 'pointer' }}>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- UPCOMING TRIPS ---------------- */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }}></div> Upcoming Trips
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Your upcoming adventures. Great things ahead!</p>
              </div>
              <button style={{ color: '#1d4ed8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                View all <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', padding: '1rem', gap: '2rem', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'relative', width: '320px', height: '180px', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" alt="Japan Discovery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#3b82f6', color: 'white', fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.75rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }}></div> Upcoming
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', color: 'white', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}>
                  <Heart size={16} />
                </div>
              </div>
              
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.5rem' }}>Japan Discovery</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <MapPin size={16} /> Tokyo <span style={{ fontSize: '0.5rem' }}>•</span> Kyoto <span style={{ fontSize: '0.5rem' }}>•</span> Osaka
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text)', fontSize: '0.9rem', fontWeight: '500' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} color="var(--color-text-muted)"/> Sep 03 - Sep 14, 2026</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={18} color="var(--color-text-muted)"/> 3 Cities</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={18} color="var(--color-text-muted)"/> 15 Activities</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Wallet size={24} color="#0ea5e9" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Estimated Budget</span>
                      <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>$3,100</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                      View Itinerary <ArrowRight size={16} />
                    </button>
                    <button style={{ background: 'white', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <Edit2 size={16} /> Edit
                    </button>
                    <button style={{ background: 'white', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', cursor: 'pointer' }}>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- COMPLETED TRIPS ---------------- */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#94a3b8' }}></div> Completed Trips
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Past adventures. Amazing memories!</p>
              </div>
              <button style={{ color: '#1d4ed8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                View all <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--color-border)', display: 'flex', padding: '1rem', gap: '2rem', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'relative', width: '320px', height: '180px', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0 }}>
                <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" alt="Bali Getaway" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', color: 'white', fontSize: '0.75rem', fontWeight: '600', padding: '0.25rem 0.75rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }}></div> Completed
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', color: 'white', padding: '0.4rem', borderRadius: '50%', cursor: 'pointer' }}>
                  <Heart size={16} />
                </div>
              </div>
              
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.5rem' }}>Bali Getaway</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <MapPin size={16} /> Bali, Indonesia
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text)', fontSize: '0.9rem', fontWeight: '500' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} color="var(--color-text-muted)"/> Jan 12 - Jan 19, 2026</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Building size={18} color="var(--color-text-muted)"/> 1 City</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={18} color="var(--color-text-muted)"/> 8 Activities</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Wallet size={24} color="#10b981" style={{ marginTop: '0.25rem' }} />
                    <div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Total Spent</span>
                      <span style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>$1,240</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={{ background: '#3b82f6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}>
                      View Trip <ArrowRight size={16} />
                    </button>
                    <button style={{ background: 'white', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <Copy size={16} /> Copy Trip
                    </button>
                    <button style={{ background: 'white', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', cursor: 'pointer' }}>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- EMPTY STATE ---------------- */}
          <div style={{ border: '2px dashed var(--color-border)', borderRadius: '1rem', padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ background: '#e0f2fe', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Map size={40} color="#0ea5e9" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>No more trips here!</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Start planning a new adventure and add it to your list.</p>
              </div>
            </div>
            <Link to="/create-trip" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}>
              <Plus size={18} /> Plan a Trip
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyTrips;
