import { useState } from 'react';
import { Search, ChevronDown, List, Calendar as CalendarIcon, MapPin, Edit2, Share2, Plus, Download, ChevronUp, MoreVertical, Train, Wallet, Map, Bus, Hotel } from 'lucide-react';

const ItineraryView = () => {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem 4rem 4rem 4rem', fontFamily: 'var(--font-body)' }}>
      
      {/* ---------------- HEADER CARD ---------------- */}
      <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', display: 'flex', padding: '1.5rem', gap: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
        
        {/* Left Side: Trip Info */}
        <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
          <div style={{ width: '220px', height: '140px', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0 }}>
            <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" alt="Japan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flex: 1 }}>
              <div>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  Japan Adventure <Edit2 size={18} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                </h1>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#334155', marginBottom: '1rem' }}>
                  Tokyo <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>→</span> Kyoto <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>→</span> Osaka
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <CalendarIcon size={16} /> 12 Aug 2026 – 20 Aug 2026
                  </div>
                  <div style={{ background: '#f1f5f9', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', fontWeight: '600', color: '#475569' }}>
                    9 Days / 8 Nights
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button style={{ background: 'white', border: '1px solid #cbd5e1', color: '#1d4ed8', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', justifyContent: 'center' }}>
                  <Edit2 size={16} /> Edit Trip
                </button>
                <button style={{ background: 'white', border: '1px solid #cbd5e1', color: '#1d4ed8', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', justifyContent: 'center' }}>
                  <Share2 size={16} /> Share Trip
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ width: '1px', background: 'var(--color-border)' }}></div>

        {/* Right Side: Budget Summary */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Estimated Budget</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-text)', marginBottom: '1rem' }}>₹1,25,000</div>
          
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '1rem', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: '#10b981', borderRadius: '4px' }}></div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Spent / Planned</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#3b82f6' }}>₹87,500</div>
            </div>
            <div style={{ color: 'var(--color-border)' }}>-</div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Remaining</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#10b981' }}>₹37,500</div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- TOOLBAR ---------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '350px' }}>
          <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search activities, cities or expenses..." style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid var(--color-border)', borderRadius: '2rem', outline: 'none', fontSize: '0.95rem' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'white' }}>
            <div style={{ padding: '0.25rem 0.75rem', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Group by</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Day <ChevronDown size={14}/></span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'white' }}>
            <div style={{ padding: '0.25rem 0.75rem', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Filter</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>All <ChevronDown size={14}/></span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'white' }}>
            <div style={{ padding: '0.25rem 0.75rem', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Sort by</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Time <ChevronDown size={14}/></span>
            </div>
          </div>
          
          <div style={{ display: 'flex', background: 'white', border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#eff6ff', color: '#1d4ed8', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
              <List size={16} /> List
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'white', color: 'var(--color-text-muted)', border: 'none', borderLeft: '1px solid var(--color-border)', fontWeight: '500', cursor: 'pointer' }}>
              <CalendarIcon size={16} /> Calendar
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>
        
        {/* ========================================================
            LEFT COLUMN (TIMELINE) 
            ======================================================== */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* DAY 1 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1d4ed8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: '700' }}>1</div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)' }}>Day 1 — Tokyo</h2>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>12 Aug 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Day Total</span>
                <span style={{ color: '#1d4ed8', fontWeight: '700', fontSize: '1.1rem' }}>₹3,000</span>
                <ChevronUp size={20} color="var(--color-text-muted)" />
              </div>
            </div>

            <div style={{ position: 'relative', paddingLeft: '60px' }}>
              {/* Vertical Timeline Line */}
              <div style={{ position: 'absolute', left: '20px', top: '-10px', bottom: '0', width: '2px', background: '#e2e8f0', zIndex: 0 }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                {/* Event 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-44px', width: '10px', height: '10px', borderRadius: '50%', background: 'white', border: '2px solid #1d4ed8', zIndex: 10 }}></div>
                  <div style={{ width: '60px', textAlign: 'right', fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }}>09:00<br/><span style={{ color: 'var(--color-text-muted)', fontWeight: '500', fontSize: '0.75rem' }}>AM</span></div>
                  
                  <div style={{ flex: 1, background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', display: 'flex', padding: '1rem', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80" alt="Senso-ji" style={{ width: '120px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>Visit Senso-ji Temple</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}><MapPin size={12}/> Tokyo, Japan</div>
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                        <span style={{ background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: '600' }}>Sightseeing</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> 2 hrs</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Wallet size={14}/> ₹0</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '80px' }}>
                      <MoreVertical size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                      <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ background: '#fef2f2', padding: '0.2rem', borderRadius: '0.25rem', color: '#ef4444' }}><MapPin size={14}/></div>
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#64748b' }}>Activity</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>Free</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-44px', width: '10px', height: '10px', borderRadius: '50%', background: 'white', border: '2px solid #1d4ed8', zIndex: 10 }}></div>
                  <div style={{ width: '60px', textAlign: 'right', fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }}>12:00<br/><span style={{ color: 'var(--color-text-muted)', fontWeight: '500', fontSize: '0.75rem' }}>PM</span></div>
                  
                  <div style={{ flex: 1, background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', display: 'flex', padding: '1rem', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <img src="https://images.unsplash.com/photo-1513407030348-c1f4e1780e1c?auto=format&fit=crop&w=150&q=80" alt="Skytree" style={{ width: '120px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>Tokyo Skytree</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}><MapPin size={12}/> Tokyo, Japan</div>
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                        <span style={{ background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: '600' }}>Sightseeing</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> 2 hrs</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '80px' }}>
                      <MoreVertical size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                      <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ background: '#fef2f2', padding: '0.2rem', borderRadius: '0.25rem', color: '#ef4444' }}><MapPin size={14}/></div>
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#64748b' }}>Activity</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>₹1,800</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event 3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-44px', width: '10px', height: '10px', borderRadius: '50%', background: 'white', border: '2px solid #1d4ed8', zIndex: 10 }}></div>
                  <div style={{ width: '60px', textAlign: 'right', fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }}>03:00<br/><span style={{ color: 'var(--color-text-muted)', fontWeight: '500', fontSize: '0.75rem' }}>PM</span></div>
                  
                  <div style={{ flex: 1, background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', display: 'flex', padding: '1rem', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <img src="https://images.unsplash.com/photo-1542051812-667104b281f6?auto=format&fit=crop&w=150&q=80" alt="Shibuya" style={{ width: '120px', height: '80px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>Lunch at Shibuya</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}><MapPin size={12}/> Tokyo, Japan</div>
                      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                        <span style={{ background: '#fef3c7', color: '#d97706', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: '600' }}>Food</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14}/> 1.5 hrs</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '80px' }}>
                      <MoreVertical size={20} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                      <div style={{ background: '#f8fafc', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ background: '#fef3c7', padding: '0.2rem', borderRadius: '0.25rem', color: '#d97706' }}><UtensilsIcon size={14}/></div>
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#64748b' }}>Food</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>₹1,800</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transport Block */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', marginTop: '1rem' }}>
                  <div style={{ width: '60px' }}></div>
                  <div style={{ flex: 1, background: '#eff6ff', borderRadius: '0.75rem', border: '1px solid #bfdbfe', display: 'flex', padding: '1.25rem 1.5rem', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ background: 'white', padding: '0.75rem', borderRadius: '0.5rem', color: '#1d4ed8', boxShadow: '0 2px 4px rgba(29, 78, 216, 0.1)' }}>
                        <Train size={24} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1e3a8a', fontSize: '1rem' }}>Travel to Kyoto</div>
                        <div style={{ fontSize: '0.85rem', color: '#3b82f6' }}>Train • Tokyo → Kyoto</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a', fontWeight: '600', fontSize: '0.9rem' }}>
                        <Clock size={16}/> 2h 15m
                      </div>
                      <div style={{ fontWeight: '800', color: '#1d4ed8', fontSize: '1.2rem' }}>₹4,500</div>
                      <ChevronDown size={20} color="#3b82f6" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* DAY 2 (Collapsed view logic mocked) */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: '700' }}>2</div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)' }}>Day 2 — Tokyo</h2>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>13 Aug 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Day Total</span>
                <span style={{ color: '#1d4ed8', fontWeight: '700', fontSize: '1.1rem' }}>₹4,200</span>
                <ChevronDown size={20} color="var(--color-text-muted)" />
              </div>
            </div>
          </div>

          {/* DAY 3 */}
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: '700' }}>3</div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text)' }}>Day 3 — Kyoto</h2>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>14 Aug 2026</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Day Total</span>
                <span style={{ color: '#1d4ed8', fontWeight: '700', fontSize: '1.1rem' }}>₹3,300</span>
                <ChevronDown size={20} color="var(--color-text-muted)" />
              </div>
            </div>
          </div>

          <button style={{ alignSelf: 'center', marginTop: '2rem', background: 'white', border: '1px solid #cbd5e1', color: '#1d4ed8', padding: '0.75rem 2rem', borderRadius: '2rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            Show remaining 5 days <ChevronDown size={16} />
          </button>
        </div>


        {/* ========================================================
            RIGHT COLUMN (SIDEBAR) 
            ======================================================== */}
        <div style={{ width: '340px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Budget Overview Card */}
          <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Budget Overview</h3>
            
            {/* Donut Chart Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'conic-gradient(#3b82f6 0% 25%, #10b981 25% 57%, #f59e0b 57% 77%, #ef4444 77% 93%, #94a3b8 93% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>₹87,500</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Spent / Planned</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: '500' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div> Transport
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontWeight: '600' }}>
                  <span>₹22,000</span> <span style={{ color: 'var(--color-text-muted)', width: '30px', textAlign: 'right' }}>25%</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: '500' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div> Accommodation
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontWeight: '600' }}>
                  <span>₹28,000</span> <span style={{ color: 'var(--color-text-muted)', width: '30px', textAlign: 'right' }}>32%</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: '500' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div> Food
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontWeight: '600' }}>
                  <span>₹17,500</span> <span style={{ color: 'var(--color-text-muted)', width: '30px', textAlign: 'right' }}>20%</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: '500' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div> Activities
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontWeight: '600' }}>
                  <span>₹14,500</span> <span style={{ color: 'var(--color-text-muted)', width: '30px', textAlign: 'right' }}>16%</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155', fontWeight: '500' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8' }}></div> Other
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontWeight: '600' }}>
                  <span>₹5,500</span> <span style={{ color: 'var(--color-text-muted)', width: '30px', textAlign: 'right' }}>7%</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '1.5rem', paddingTop: '1rem', textAlign: 'center' }}>
              <button style={{ color: '#1d4ed8', fontWeight: '600', border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', width: '100%', cursor: 'pointer' }}>
                View full budget <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }}/>
              </button>
            </div>
          </div>

          {/* Trip Route Card */}
          <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Trip Route</h3>
            <div style={{ background: '#f0fdf4', borderRadius: '0.5rem', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid #dcfce7', marginBottom: '1rem', position: 'relative' }}>
              {/* Mocking a map with CSS */}
              <div style={{ position: 'absolute', width: '150%', height: '150%', background: 'url("https://www.transparenttextures.com/patterns/cartographer.png")', opacity: 0.1 }}></div>
              <div style={{ position: 'relative', width: '80%', height: '80%' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <path d="M80 30 Q 60 50 40 60 T 20 80" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="80" cy="30" r="4" fill="white" stroke="#1d4ed8" strokeWidth="3" />
                  <circle cx="40" cy="60" r="4" fill="white" stroke="#1d4ed8" strokeWidth="3" />
                  <circle cx="20" cy="80" r="4" fill="white" stroke="#1d4ed8" strokeWidth="3" />
                  <text x="88" y="34" fontSize="6" fontWeight="bold">Tokyo</text>
                  <text x="32" y="55" fontSize="6" fontWeight="bold">Kyoto</text>
                  <text x="25" y="85" fontSize="6" fontWeight="bold">Osaka</text>
                </svg>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button style={{ color: '#1d4ed8', fontWeight: '600', border: 'none', background: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', width: '100%', cursor: 'pointer' }}>
                View on map <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }}/>
              </button>
            </div>
          </div>

          {/* Trip Summary Card */}
          <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem' }}>Trip Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}><CalendarIcon size={16}/> Total Duration</div>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>9 Days / 8 Nights</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}><MapPin size={16}/> Total Cities</div>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>3 Cities</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}><Map size={16}/> Total Activities</div>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>24 Activities</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}><Wallet size={16}/> Currency</div>
                <div style={{ fontWeight: '600', color: '#0f172a' }}>INR (₹)</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1e40af', cursor: 'pointer' }}>
                <Plus size={18} /> Add Activity
              </button>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1e40af', cursor: 'pointer' }}>
                <Wallet size={18} /> Add Expense
              </button>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1e40af', cursor: 'pointer' }}>
                <Train size={18} /> Add Transport
              </button>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#1e40af', cursor: 'pointer' }}>
                <Hotel size={18} /> Add Accommodation
              </button>
              
              <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.5rem 0' }}></div>
              
              <button style={{ background: 'white', border: '1px solid #bfdbfe', padding: '0.75rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', color: '#1d4ed8', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <Download size={18} /> Download Itinerary
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

// SVG icons for specific ones missing or to match exactly
const UtensilsIcon = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;

export default ItineraryView;
