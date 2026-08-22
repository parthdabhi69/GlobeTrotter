import { useState } from 'react';
import { Search, X, MapPin, Star, Filter, ChevronDown, List, Check, Heart, CheckCircle2, ChevronUp } from 'lucide-react';

const Explore = () => {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem', fontFamily: 'var(--font-body)' }}>
      
      {/* ---------------- HERO & SEARCH ---------------- */}
      <section style={{ 
        position: 'relative', 
        padding: '3rem 4rem',
        background: 'linear-gradient(to right, #f8fafc 40%, #e0f2fe 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible'
      }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)' }}>Explore</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Discover cities, activities, and experiences for your next adventure.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={20} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" value="Paragliding" readOnly style={{ width: '100%', padding: '1rem 3rem', border: '1px solid #cbd5e1', borderRadius: '2rem', outline: 'none', fontSize: '1rem', color: '#0f172a', fontWeight: '500', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
              <X size={18} color="var(--color-text-muted)" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />
            </div>
            
            <div style={{ display: 'flex', background: 'white', border: '1px solid #cbd5e1', borderRadius: '2rem', overflow: 'hidden', padding: '0.25rem' }}>
              <button style={{ padding: '0.5rem 1.5rem', borderRadius: '2rem', border: 'none', background: 'transparent', color: 'var(--color-text)', fontWeight: '600', cursor: 'pointer' }}>Cities</button>
              <button style={{ padding: '0.5rem 1.5rem', borderRadius: '2rem', border: 'none', background: '#1d4ed8', color: 'white', fontWeight: '600', cursor: 'pointer' }}>Activities</button>
            </div>

            {/* Mock Search Dropdown */}
            <div style={{ position: 'absolute', top: '120%', left: 0, width: '400px', background: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', border: '1px solid var(--color-border)', zIndex: 50, padding: '0.5rem 0' }}>
              {[
                { icon: <MapPin size={18}/>, title: 'Tokyo', sub: 'City in Japan' },
                { icon: <MapPin size={18}/>, title: 'Paris', sub: 'City in France' },
                { icon: <Search size={18}/>, title: 'Paragliding', sub: 'Adventure Activity', highlight: true },
                { icon: <Building size={18}/>, title: 'Museums', sub: 'Activity' },
                { icon: <Utensils size={18}/>, title: 'Food tours', sub: 'Activity' },
                { icon: <Umbrella size={18}/>, title: 'Beaches', sub: 'Activity' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.5rem', background: item.highlight ? '#f1f5f9' : 'transparent', cursor: 'pointer' }} className="hover-bg">
                  <div style={{ color: 'var(--color-text-muted)' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-text)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Vector Graphic (Simulated with an image) */}
        <div style={{ position: 'absolute', right: '0', top: '-20px', height: '110%', width: '45%', backgroundImage: 'url("https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)', opacity: 0.9, zIndex: 1, borderBottomLeftRadius: '40%' }}>
           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #e0f2fe, transparent)' }}></div>
        </div>
      </section>

      {/* ---------------- MAIN LAYOUT ---------------- */}
      <div style={{ display: 'flex', padding: '2rem 4rem', gap: '2rem', alignItems: 'flex-start', position: 'relative' }}>
        
        {/* ---------------- SIDEBAR FILTERS ---------------- */}
        <div style={{ width: '280px', flexShrink: 0, background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-text)' }}>Filters</h2>
            <button style={{ color: '#1d4ed8', fontWeight: '600', fontSize: '0.9rem', border: 'none', background: 'none', cursor: 'pointer' }}>Clear All</button>
          </div>

          {/* Category Filter */}
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: '600' }}>
              Category <ChevronUp size={16} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Adventure', 'Sightseeing', 'Food & Dining', 'Culture', 'Shopping', 'Nature'].map((cat, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                  <input type="checkbox" checked={i === 0} readOnly style={{ width: '16px', height: '16px', accentColor: '#1d4ed8' }} />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Cost Filter */}
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: '600' }}>
              Cost <ChevronUp size={16} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['$', '$$', '$$$', '$$$$'].map((cost, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                  <input type="checkbox" checked={i === 2} readOnly style={{ width: '16px', height: '16px', accentColor: '#1d4ed8' }} />
                  {cost}
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: '600' }}>
              Duration <ChevronUp size={16} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Under 2 hours', '2-4 hours', '4+ hours'].map((dur, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                  <input type="checkbox" checked={i === 1} readOnly style={{ width: '16px', height: '16px', accentColor: '#1d4ed8' }} />
                  {dur}
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontWeight: '600' }}>
              Rating <ChevronUp size={16} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['4.5+', '4.0+', '3.5+'].map((rate, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                  <input type="checkbox" checked={i === 0} readOnly style={{ width: '16px', height: '16px', accentColor: '#1d4ed8' }} />
                  {rate}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- MAIN RESULTS LIST ---------------- */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Top Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '500', cursor: 'pointer' }}>
                <Filter size={16} /> Filter <ChevronDown size={14} />
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '500', cursor: 'pointer' }}>
                <List size={16} /> Group By <ChevronDown size={14} />
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '500', cursor: 'pointer' }}>
                ↑↓ Sort By <ChevronDown size={14} />
              </button>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer' }}>
              <X size={16} /> Clear All
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text)' }}>Results for "Paragliding"</h2>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Results · 24</span>
          </div>

          {/* Result Cards */}
          {[
            {
              title: 'Paragliding in Interlaken', loc: 'Interlaken, Switzerland', rate: '4.8 (320)',
              tags: [{ t: 'Adventure', c: '#dbeafe', tc: '#1e40af' }, { t: '2-3 hours', c: '#f1f5f9', tc: '#475569' }, { t: '$$$', c: '#fef3c7', tc: '#b45309' }],
              desc: 'Experience breathtaking views of the Swiss Alps with an experienced instructor.',
              price: '$145', img: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80'
            },
            {
              title: 'Mountain Hiking Tour', loc: 'Interlaken, Switzerland', rate: '4.7 (210)',
              tags: [{ t: 'Adventure', c: '#dbeafe', tc: '#1e40af' }, { t: '4 hours', c: '#f1f5f9', tc: '#475569' }, { t: '$$', c: '#fef3c7', tc: '#b45309' }],
              desc: 'Guided hiking experience through scenic alpine trails and stunning viewpoints.',
              price: '$85', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80'
            },
            {
              title: 'Swiss Food & Culture Tour', loc: 'Interlaken, Switzerland', rate: '4.6 (185)',
              tags: [{ t: 'Food & Culture', c: '#f3e8ff', tc: '#6b21a8' }, { t: '3 hours', c: '#f1f5f9', tc: '#475569' }, { t: '$$', c: '#fef3c7', tc: '#b45309' }],
              desc: 'Taste authentic Swiss cuisine and discover local culture with a friendly guide.',
              price: '$70', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80'
            },
            {
              title: 'Lake Brienz Boat Cruise', loc: 'Interlaken, Switzerland', rate: '4.8 (260)',
              tags: [{ t: 'Sightseeing', c: '#dcfce7', tc: '#166534' }, { t: '2 hours', c: '#f1f5f9', tc: '#475569' }, { t: '$', c: '#fef3c7', tc: '#b45309' }],
              desc: 'Relaxing cruise on the turquoise waters of Lake Brienz with amazing views.',
              price: '$55', img: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80'
            }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', overflow: 'hidden', height: '180px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '280px', position: 'relative', flexShrink: 0 }}>
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', color: 'white', cursor: 'pointer' }}><Heart size={20} /></div>
              </div>
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.25rem' }}>{item.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14}/> {item.loc}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#d97706' }}><Star size={14} fill="currentColor"/> <span style={{ color: 'var(--color-text-muted)' }}>{item.rate}</span></span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                  {item.tags.map((tag, t) => (
                    <span key={t} style={{ background: tag.c, color: tag.tc, fontSize: '0.75rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '2rem' }}>{tag.t}</span>
                  ))}
                </div>
                
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', flex: 1 }}>{item.desc}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    From <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1.1rem' }}>{item.price}</span> / person
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={{ background: 'white', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>View Details</button>
                    <button style={{ background: '#1d4ed8', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>+ Add to Trip</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* =========================================================================
          MOCKED OVERLAYS (Positioned absolutely to match the screenshot state) 
          ========================================================================= */}

      {/* 1. Activity Detail Modal (Bottom Left) */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '4rem', width: '600px', background: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', border: '1px solid var(--color-border)', display: 'flex', overflow: 'hidden', zIndex: 100 }}>
        <div style={{ width: '250px', flexShrink: 0 }}>
          <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80" alt="Paragliding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.25rem' }}>Paragliding in Interlaken</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={12} fill="currentColor"/> 4.8 (320 reviews)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12}/> Interlaken, Switzerland</span>
              </div>
            </div>
            <X size={18} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', fontSize: '0.7rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '2rem' }}>Adventure</span>
            <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.7rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '2rem' }}>2-3 hours</span>
            <span style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.7rem', fontWeight: '600', padding: '0.2rem 0.6rem', borderRadius: '2rem' }}>$$$</span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            From <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1rem' }}>$145</span> / person
          </div>

          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.25rem' }}>About this activity</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Experience breathtaking aerial views of the Swiss Alps and crystal-clear lakes as you soar like a bird. Fly tandem with a professional pilot - no experience needed!
          </p>

          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.5rem' }}>What's included</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--color-text)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#10b981" /> Professional instructor</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#10b981" /> Safety equipment</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#10b981" /> Flight experience</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} color="#10b981" /> Insurance coverage</li>
          </ul>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button style={{ background: 'white', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>Close</button>
            <button style={{ background: '#1d4ed8', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Plus size={16}/> Add to Trip</button>
          </div>
        </div>
      </div>

      {/* 2. Add to Trip Popover (Bottom Right) */}
      <div style={{ position: 'absolute', bottom: '10rem', right: '4rem', width: '320px', background: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', border: '1px solid var(--color-border)', padding: '1.25rem', zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text)' }}>Add to Trip</h3>
          <X size={16} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <img src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=100&q=80" alt="Paragliding" style={{ width: '48px', height: '48px', borderRadius: '0.5rem', objectFit: 'cover' }} />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text)' }}>Paragliding in Interlaken</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={10}/> Interlaken, Switzerland</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>From <span style={{ color: '#10b981', fontWeight: '600' }}>$145</span> / person</div>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Select trip</label>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--color-border)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.85rem' }}>
            European Summer Escape <ChevronDown size={14} color="var(--color-text-muted)"/>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Select date</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--color-border)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.85rem' }}>
            <Calendar size={14} color="var(--color-text-muted)"/> Jun 15, 2026
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Estimated cost</span>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a' }}>$145</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{ flex: 1, background: 'white', color: 'var(--color-text)', border: '1px solid var(--color-border)', padding: '0.6rem', borderRadius: '0.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
          <button style={{ flex: 1, background: '#1d4ed8', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '0.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}><Plus size={14}/> Add Activity</button>
        </div>
      </div>

      {/* 3. Toast Notification (Bottom Right) */}
      <div style={{ position: 'absolute', bottom: '4rem', right: '4rem', background: '#0f172a', color: 'white', padding: '1rem 1.25rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 100 }}>
        <CheckCircle2 size={24} color="#10b981" />
        <div style={{ paddingRight: '2rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Added to European Summer Escape</div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>You can view it in your itinerary.</div>
        </div>
        <X size={16} color="#94a3b8" style={{ position: 'absolute', right: '1rem', top: '1.25rem', cursor: 'pointer' }} />
      </div>

    </div>
  );
};

// SVG components to avoid lucide-react import errors for specific obscure ones
const Building = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>;
const Utensils = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
const Umbrella = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12a10.06 10.06 0 0 0-20 0Z"/><path d="M12 12v8a2 2 0 0 0 4 0"/><path d="M12 2v1"/></svg>;

export default Explore;
