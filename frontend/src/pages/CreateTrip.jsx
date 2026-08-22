import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Calendar, X, Plus, Heart, Plane, Wand2 } from 'lucide-react';

const CreateTrip = () => {
  const navigate = useNavigate();
  const [tripName, setTripName] = useState('European Summer Adventure');
  const [startDate, setStartDate] = useState('2026-06-12');
  const [endDate, setEndDate] = useState('2026-06-23');

  const selectedDestinations = [
    { id: 'paris', name: 'Paris', flag: '🇫🇷' },
    { id: 'rome', name: 'Rome', flag: '🇮🇹' },
    { id: 'barcelona', name: 'Barcelona', flag: '🇪🇸' },
  ];

  const suggestions = [
    { id: 1, name: 'Paris', country: 'France', flag: '🇫🇷', rating: 4.9, reviews: '2.4K', price: 820, img: 'https://images.unsplash.com/photo-1502602881469-4478223656ce?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Rome', country: 'Italy', flag: '🇮🇹', rating: 4.8, reviews: '1.9K', price: 760, img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Barcelona', country: 'Spain', flag: '🇪🇸', rating: 4.7, reviews: '1.6K', price: 690, img: 'https://images.unsplash.com/photo-1583422409516-2895a77ef244?auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Santorini', country: 'Greece', flag: '🇬🇷', rating: 4.8, reviews: '1.2K', price: 910, img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80' },
    { id: 5, name: 'Tokyo', country: 'Japan', flag: '🇯🇵', rating: 4.8, reviews: '3.1K', price: 1120, img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80' },
    { id: 6, name: 'Bali', country: 'Indonesia', flag: '🇮🇩', rating: 4.6, reviews: '1.7K', price: 610, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '4rem' }}>
      
      {/* Hero Header with Background */}
      <section style={{ 
        position: 'relative', 
        height: '340px', 
        backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4)), url("https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=2800&q=80")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        padding: '2rem 4rem',
        color: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/my-trips" style={{ color: 'inherit', textDecoration: 'none' }}>My Trips</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'white', fontWeight: '500' }}>Create New Trip</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Plan a New Trip <Plane size={32} style={{ transform: 'rotate(-45deg)' }} />
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#e2e8f0', marginBottom: '3rem' }}>Let's build your next unforgettable adventure.</p>

        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', maxWidth: '800px', width: '100%' }}>
          
          {/* Step 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
              <div style={{ height: '2px', background: '#1d4ed8', width: '150px' }}></div>
            </div>
            <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Trip Details</span>
          </div>

          {/* Step 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
              <div style={{ height: '2px', background: 'rgba(255,255,255,0.2)', width: '150px' }}></div>
            </div>
            <span style={{ fontWeight: '400', fontSize: '0.9rem', color: '#cbd5e1' }}>Destinations & Activities</span>
          </div>

          {/* Step 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
            </div>
            <span style={{ fontWeight: '400', fontSize: '0.9rem', color: '#cbd5e1' }}>Itinerary & Budget</span>
          </div>

        </div>
      </section>

      {/* Main Content Area - Shifted up to overlap header slightly */}
      <div style={{ padding: '0 4rem', marginTop: '-2rem', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Form Card 1: Trip Details */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>Tell us about your trip</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Start with the basics. You can change these details later.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
            
            {/* Trip Name Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Trip Name <span style={{ color: '#ef4444' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input type="text" value={tripName} onChange={(e) => setTripName(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem' }} />
                <Wand2 size={18} color="#3b82f6" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            {/* Dates Row */}
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>Start Date <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem', color: 'var(--color-text)' }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem' }}>End Date <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem', color: 'var(--color-text)' }} />
                </div>
              </div>
            </div>

            {/* Duration Info Box */}
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#1e40af', fontSize: '0.95rem' }}>
              <Calendar size={20} color="#3b82f6" />
              <span>Your trip will last <strong style={{ color: '#1d4ed8' }}>12 days</strong></span>
            </div>

            {/* Destination Search */}
            <div style={{ marginTop: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Where do you want to go?</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Search and add multiple cities or destinations.</p>
              
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input type="text" placeholder="Search cities or destinations..." style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', outline: 'none', fontSize: '1rem' }} />
              </div>

              {/* Selected Tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Your selected destinations</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {selectedDestinations.map(dest => (
                    <div key={dest.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: '500', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                      <span>{dest.flag}</span>
                      <span>{dest.name}</span>
                      <X size={14} color="var(--color-text-muted)" style={{ cursor: 'pointer', marginLeft: '0.25rem' }} />
                    </div>
                  ))}
                  <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#eff6ff', color: '#1d4ed8', border: '1px dashed #93c5fd', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}>
                    <Plus size={16} /> Add more
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Form Card 2: Suggestions Grid */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-text)', marginBottom: '0.25rem' }}>Suggestion for places to visit / activities to perform</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Popular destinations and activities recommended for you.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {suggestions.map(item => (
              <div key={item.id} style={{ border: '1px solid var(--color-border)', borderRadius: '1rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '160px' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', borderRadius: '50%', padding: '0.4rem', color: 'white', cursor: 'pointer' }}>
                    <Heart size={18} />
                  </div>
                </div>
                
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.25rem' }}>{item.name}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1.25rem' }}>
                    {item.flag} {item.country}
                  </span>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flex: 1 }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.5rem' }}>Top Attractions</span>
                      <div style={{ display: 'flex', marginLeft: '0.5rem' }}>
                        {[1, 2, 3].map(i => (
                          <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid white', marginLeft: '-0.5rem', background: '#e2e8f0', overflow: 'hidden' }}>
                            <img src={`https://images.unsplash.com/photo-1596395${i}116-e5c94c979d3?w=50&h=50&fit=crop`} alt="attraction" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>From</span>
                      <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1d4ed8' }}>${item.price}</span>
                      <div style={{ fontSize: '0.75rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        {'★'.repeat(Math.floor(item.rating))} <span style={{ color: 'var(--color-text-muted)' }}>{item.rating} ({item.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <button style={{ width: '100%', padding: '0.75rem', background: 'transparent', border: '1px solid #bfdbfe', borderRadius: '0.5rem', color: '#1d4ed8', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'background 0.2s' }} className="hover-bg">
                    <Plus size={18} /> Add to Trip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateTrip;
