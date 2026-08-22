import { useState } from 'react';
import { Search, ChevronDown, RefreshCw, Briefcase, Calendar as CalendarIcon, MapPin, Wallet, ChevronLeft, ChevronRight, List, Plus, Plane, Bed, Map, ArrowRight } from 'lucide-react';

const Calendar = () => {
  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2.5rem 4rem', fontFamily: 'var(--font-body)' }}>
      
      {/* ---------------- HEADER ---------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>Calendar View</h1>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Visualize your trips, activities, and travel plans at a glance.</p>
        </div>
        <button style={{ background: '#1d4ed8', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(29, 78, 216, 0.2)' }}>
          <Plus size={18} /> Plan New Trip
        </button>
      </div>

      {/* ---------------- TOOLBAR ---------------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '350px' }}>
          <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search trips, destinations or activities..." style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', outline: 'none', fontSize: '0.95rem' }} />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'white', padding: '0.5rem 1rem', width: '160px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Group By</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><List size={14}/> Trip</span>
                <ChevronDown size={14} color="var(--color-text-muted)"/>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'white', padding: '0.5rem 1rem', width: '160px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Filter</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg> All Filters</span>
                <ChevronDown size={14} color="var(--color-text-muted)"/>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '0.5rem', background: 'white', padding: '0.5rem 1rem', width: '160px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Sort By</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>↑↓ Date</span>
                <ChevronDown size={14} color="var(--color-text-muted)"/>
              </div>
            </div>
          </div>
          
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--color-border)', borderRadius: '0.5rem', padding: '0 1.25rem', fontWeight: '600', color: 'var(--color-text)', cursor: 'pointer' }}>
            <RefreshCw size={16} /> Clear Filters
          </button>
        </div>
      </div>

      {/* ---------------- STAT CARDS ---------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Card 1 */}
        <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#eff6ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>January Overview</div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1d4ed8', marginBottom: '0.25rem' }}>3 Trips</div>
            <a href="#" style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>View details <ArrowRight size={12}/></a>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarIcon size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>15</div>
            <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '500' }}>Travel Days</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>This month</div>
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>7</div>
            <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '500' }}>Destinations</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Across 3 trips</div>
          </div>
        </div>

        {/* Card 4 */}
        <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Wallet size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>₹1,42,500</div>
            <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '500' }}>Planned Budget</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>This month</div>
          </div>
        </div>

      </div>


      {/* ---------------- MAIN LAYOUT ---------------- */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* ========================================================
            LEFT COLUMN (CALENDAR GRID)
            ======================================================== */}
        <div style={{ flex: 1, background: 'white', borderRadius: '1rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          
          {/* Calendar Header Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 1.25rem', borderRadius: '0.5rem', fontWeight: '600', color: 'var(--color-text)', cursor: 'pointer' }}>Today</button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={20} color="var(--color-text)"/></button>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', width: '150px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                January 2024 <ChevronDown size={16} color="var(--color-text-muted)"/>
              </h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronRight size={20} color="var(--color-text)"/></button>
            </div>

            <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', background: '#eff6ff', color: '#1d4ed8', border: 'none', borderRight: '1px solid var(--color-border)', fontWeight: '600', cursor: 'pointer' }}>
                <CalendarIcon size={16} /> Month
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', background: 'white', color: 'var(--color-text-muted)', border: 'none', fontWeight: '500', cursor: 'pointer' }}>
                <List size={16} /> List
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '0.5rem', overflow: 'hidden' }}>
            
            {/* Days Header */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
              <div style={{ padding: '1rem 0', textAlign: 'center', fontWeight: '700', fontSize: '0.75rem', color: '#ef4444' }}>SUN</div>
              <div style={{ padding: '1rem 0', textAlign: 'center', fontWeight: '700', fontSize: '0.75rem', color: '#64748b' }}>MON</div>
              <div style={{ padding: '1rem 0', textAlign: 'center', fontWeight: '700', fontSize: '0.75rem', color: '#64748b' }}>TUE</div>
              <div style={{ padding: '1rem 0', textAlign: 'center', fontWeight: '700', fontSize: '0.75rem', color: '#64748b' }}>WED</div>
              <div style={{ padding: '1rem 0', textAlign: 'center', fontWeight: '700', fontSize: '0.75rem', color: '#64748b' }}>THU</div>
              <div style={{ padding: '1rem 0', textAlign: 'center', fontWeight: '700', fontSize: '0.75rem', color: '#64748b' }}>FRI</div>
              <div style={{ padding: '1rem 0', textAlign: 'center', fontWeight: '700', fontSize: '0.75rem', color: '#3b82f6' }}>SAT</div>
            </div>

            {/* Days Body */}
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(5, 120px)' }}>
              
              {/* Grid Lines (Vertical) */}
              <div style={{ borderRight: '1px solid #e2e8f0', gridColumn: '1', gridRow: '1 / span 5' }}></div>
              <div style={{ borderRight: '1px solid #e2e8f0', gridColumn: '2', gridRow: '1 / span 5' }}></div>
              <div style={{ borderRight: '1px solid #e2e8f0', gridColumn: '3', gridRow: '1 / span 5' }}></div>
              <div style={{ borderRight: '1px solid #e2e8f0', gridColumn: '4', gridRow: '1 / span 5' }}></div>
              <div style={{ borderRight: '1px solid #e2e8f0', gridColumn: '5', gridRow: '1 / span 5' }}></div>
              <div style={{ borderRight: '1px solid #e2e8f0', gridColumn: '6', gridRow: '1 / span 5' }}></div>
              {/* Grid Lines (Horizontal) */}
              <div style={{ borderBottom: '1px solid #e2e8f0', gridRow: '1', gridColumn: '1 / span 7' }}></div>
              <div style={{ borderBottom: '1px solid #e2e8f0', gridRow: '2', gridColumn: '1 / span 7' }}></div>
              <div style={{ borderBottom: '1px solid #e2e8f0', gridRow: '3', gridColumn: '1 / span 7' }}></div>
              <div style={{ borderBottom: '1px solid #e2e8f0', gridRow: '4', gridColumn: '1 / span 7' }}></div>
              
              {/* Date Numbers */}
              {/* Row 1 */}
              <div style={{ gridColumn: 1, gridRow: 1, padding: '0.75rem', color: '#cbd5e1' }}>31</div>
              <div style={{ gridColumn: 2, gridRow: 1, padding: '0.75rem', color: '#0f172a' }}>1</div>
              <div style={{ gridColumn: 3, gridRow: 1, padding: '0.75rem', color: '#0f172a' }}>2</div>
              <div style={{ gridColumn: 4, gridRow: 1, padding: '0.75rem', color: '#0f172a' }}>3</div>
              <div style={{ gridColumn: 5, gridRow: 1, padding: '0.75rem', color: '#0f172a' }}>4</div>
              <div style={{ gridColumn: 6, gridRow: 1, padding: '0.75rem', color: '#0f172a' }}>5</div>
              <div style={{ gridColumn: 7, gridRow: 1, padding: '0.75rem', color: '#3b82f6' }}>6</div>
              
              {/* Row 2 */}
              <div style={{ gridColumn: 1, gridRow: 2, padding: '0.75rem', color: '#ef4444' }}>7</div>
              <div style={{ gridColumn: 2, gridRow: 2, padding: '0.75rem', color: '#0f172a' }}>8</div>
              <div style={{ gridColumn: 3, gridRow: 2, padding: '0.75rem', color: '#0f172a' }}>9</div>
              <div style={{ gridColumn: 4, gridRow: 2, padding: '0.75rem', color: '#0f172a' }}>10</div>
              <div style={{ gridColumn: 5, gridRow: 2, padding: '0.75rem', color: '#0f172a' }}>11</div>
              <div style={{ gridColumn: 6, gridRow: 2, padding: '0.75rem', color: '#0f172a' }}>12</div>
              <div style={{ gridColumn: 7, gridRow: 2, padding: '0.75rem', color: '#3b82f6' }}>13</div>

              {/* Row 3 */}
              <div style={{ gridColumn: 1, gridRow: 3, padding: '0.75rem', color: '#ef4444' }}>14</div>
              <div style={{ gridColumn: 2, gridRow: 3, padding: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: '#16a34a', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>15</div>
              </div>
              <div style={{ gridColumn: 3, gridRow: 3, padding: '0.75rem', color: '#0f172a' }}>16</div>
              <div style={{ gridColumn: 4, gridRow: 3, padding: '0.75rem', color: '#0f172a' }}>17</div>
              <div style={{ gridColumn: 5, gridRow: 3, padding: '0.75rem', color: '#0f172a' }}>18</div>
              <div style={{ gridColumn: 6, gridRow: 3, padding: '0.75rem', color: '#0f172a' }}>19</div>
              <div style={{ gridColumn: 7, gridRow: 3, padding: '0.75rem', color: '#3b82f6' }}>20</div>

              {/* Row 4 */}
              <div style={{ gridColumn: 1, gridRow: 4, padding: '0.75rem', color: '#ef4444' }}>21</div>
              <div style={{ gridColumn: 2, gridRow: 4, padding: '0.75rem', color: '#0f172a' }}>22</div>
              <div style={{ gridColumn: 3, gridRow: 4, padding: '0.75rem', color: '#0f172a' }}>23</div>
              <div style={{ gridColumn: 4, gridRow: 4, padding: '0.75rem', color: '#0f172a' }}>24</div>
              <div style={{ gridColumn: 5, gridRow: 4, padding: '0.75rem', color: '#0f172a' }}>25</div>
              <div style={{ gridColumn: 6, gridRow: 4, padding: '0.75rem', color: '#0f172a' }}>26</div>
              <div style={{ gridColumn: 7, gridRow: 4, padding: '0.75rem', color: '#3b82f6' }}>27</div>

              {/* Row 5 */}
              <div style={{ gridColumn: 1, gridRow: 5, padding: '0.75rem', color: '#ef4444' }}>28</div>
              <div style={{ gridColumn: 2, gridRow: 5, padding: '0.75rem', color: '#0f172a' }}>29</div>
              <div style={{ gridColumn: 3, gridRow: 5, padding: '0.75rem', color: '#0f172a' }}>30</div>
              <div style={{ gridColumn: 4, gridRow: 5, padding: '0.75rem', color: '#0f172a' }}>31</div>
              <div style={{ gridColumn: 5, gridRow: 5, padding: '0.75rem', color: '#cbd5e1' }}>1</div>
              <div style={{ gridColumn: 6, gridRow: 5, padding: '0.75rem', color: '#cbd5e1' }}>2</div>
              <div style={{ gridColumn: 7, gridRow: 5, padding: '0.75rem', color: '#cbd5e1' }}>3</div>

              {/* ---------------- EVENT PILLS ---------------- */}
              
              {/* Paris Trip (Row 1-2) */}
              <div style={{ gridColumn: '5 / span 3', gridRow: 1, background: '#dbeafe', margin: '2.5rem 0.5rem 0 0.5rem', height: '40px', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', borderTopRightRadius: '0', borderBottomRightRadius: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 1rem', zIndex: 10 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1e40af', lineHeight: 1 }}>PARIS TRIP</div>
                <div style={{ fontSize: '0.65rem', color: '#3b82f6', lineHeight: 1, marginTop: '2px' }}>Paris, France</div>
              </div>
              <div style={{ gridColumn: '7', gridRow: 1, zIndex: 11, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '1rem', marginTop: '2.5rem', height: '40px' }}>
                 <ChevronRight size={14} color="#1e40af" />
              </div>
              
              <div style={{ gridColumn: '1 / span 4', gridRow: 2, background: '#dbeafe', margin: '2.5rem 0.5rem 0 0.5rem', height: '40px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '1rem', zIndex: 10 }}>
                <ChevronRight size={14} color="#1e40af" />
              </div>

              {/* NYC Getaway (Row 3) */}
              <div style={{ gridColumn: '1 / span 3', gridRow: 3, background: '#dcfce7', margin: '2.5rem 0.5rem 0 0.5rem', height: '40px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', zIndex: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#166534', lineHeight: 1 }}>NYC GETAWAY</div>
                  <div style={{ fontSize: '0.65rem', color: '#16a34a', lineHeight: 1, marginTop: '2px' }}>New York, USA</div>
                </div>
                <ChevronRight size={14} color="#166534" />
              </div>
              {/* NYC Dots */}
              <div style={{ gridColumn: 1, gridRow: 3, display: 'flex', alignItems: 'flex-end', padding: '0.5rem', fontSize: '0.65rem', color: '#16a34a', gap: '0.25rem', paddingLeft: '1rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#16a34a' }}></div> 2 activities
              </div>
              <div style={{ gridColumn: 2, gridRow: 3, display: 'flex', alignItems: 'flex-end', padding: '0.5rem', fontSize: '0.65rem', color: '#16a34a', gap: '0.25rem', paddingLeft: '1rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#16a34a' }}></div> 1 activity
              </div>
              <div style={{ gridColumn: 3, gridRow: 3, display: 'flex', alignItems: 'flex-end', padding: '0.5rem', fontSize: '0.65rem', color: '#16a34a', gap: '0.25rem', paddingLeft: '1rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#16a34a' }}></div> 2 activities
              </div>

              {/* Japan Adventure (Row 3-4) */}
              <div style={{ gridColumn: '5 / span 3', gridRow: 3, background: '#4f46e5', margin: '2.5rem 0.5rem 0 0.5rem', height: '40px', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', borderTopRightRadius: '0', borderBottomRightRadius: '0', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 1rem', zIndex: 10 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'white', lineHeight: 1 }}>JAPAN ADVENTURE</div>
                <div style={{ fontSize: '0.65rem', color: '#c7d2fe', lineHeight: 1, marginTop: '2px' }}>Tokyo → Kyoto → Osaka</div>
              </div>
              {/* Japan Dots Row 3 */}
              <div style={{ gridColumn: 5, gridRow: 3, display: 'flex', alignItems: 'flex-end', padding: '0.5rem', fontSize: '0.65rem', color: '#4f46e5', gap: '0.25rem', paddingLeft: '1rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4f46e5' }}></div> 3 activities
              </div>
              <div style={{ gridColumn: 6, gridRow: 3, display: 'flex', alignItems: 'flex-end', padding: '0.5rem', fontSize: '0.65rem', color: '#4f46e5', gap: '0.25rem', paddingLeft: '1rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4f46e5' }}></div> 2 activities
              </div>
              <div style={{ gridColumn: 7, gridRow: 3, display: 'flex', alignItems: 'flex-end', padding: '0.5rem', fontSize: '0.65rem', color: '#4f46e5', gap: '0.25rem', paddingLeft: '1rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4f46e5' }}></div> 1 activity
              </div>

              <div style={{ gridColumn: '1 / span 5', gridRow: 4, background: '#4f46e5', margin: '2.5rem 0.5rem 0 0.5rem', height: '40px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '1rem', zIndex: 10 }}>
                <ArrowRight size={14} color="white" />
              </div>
              {/* Japan Dots Row 4 */}
              <div style={{ gridColumn: 5, gridRow: 4, display: 'flex', alignItems: 'flex-end', padding: '0.5rem', fontSize: '0.65rem', color: '#4f46e5', gap: '0.25rem', paddingLeft: '1rem' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4f46e5' }}></div> 2 activities
              </div>

            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1d4ed8' }}></div> Upcoming Trips</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#16a34a' }}></div> Ongoing Trips</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1' }}></div> Completed Trips</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1d4ed8' }}></div> Activities Planned</div>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN (SIDEBAR)
            ======================================================== */}
        <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Upcoming Trips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Upcoming Trips</h3>
              <a href="#" style={{ fontSize: '0.8rem', color: '#1d4ed8', textDecoration: 'none', fontWeight: '600' }}>View all</a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', borderLeft: '4px solid #4f46e5', padding: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=150&q=80" alt="Japan" style={{ width: '60px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>Japan Adventure</div>
                    <MoreVertical size={14} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.15rem' }}>18 Jan – 25 Jan, 2024</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>Tokyo → Kyoto → Osaka</div>
                  <span style={{ background: '#eff6ff', color: '#1d4ed8', fontSize: '0.65rem', fontWeight: '600', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>8 Days</span>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', borderLeft: '4px solid #16a34a', padding: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <img src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=150&q=80" alt="NYC" style={{ width: '60px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>NYC Getaway</div>
                    <MoreVertical size={14} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.15rem' }}>14 Jan – 16 Jan, 2024</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>New York, USA</div>
                  <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.65rem', fontWeight: '600', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>3 Days</span>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', borderLeft: '4px solid #3b82f6', padding: '0.75rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <img src="https://images.unsplash.com/photo-1502602881469-4478223656ce?auto=format&fit=crop&w=150&q=80" alt="Paris" style={{ width: '60px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>Paris Trip</div>
                    <MoreVertical size={14} color="var(--color-text-muted)" style={{ cursor: 'pointer' }} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.15rem' }}>5 Jan – 10 Jan, 2024</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>Paris, France</div>
                  <span style={{ background: '#eff6ff', color: '#3b82f6', fontSize: '0.65rem', fontWeight: '600', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>6 Days</span>
                </div>
              </div>
              
            </div>
          </div>

          {/* Next Activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Next Activity</h3>
              <a href="#" style={{ fontSize: '0.8rem', color: '#1d4ed8', textDecoration: 'none', fontWeight: '600' }}>View agenda</a>
            </div>
            
            <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80" alt="Senso-ji" style={{ width: '48px', height: '48px', borderRadius: '0.5rem', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Senso-ji Temple Visit</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.2rem' }}><CalendarIcon size={10}/> Tomorrow · 09:00 AM</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={10}/> Tokyo, Japan</div>
              </div>
              <ChevronRight size={16} color="var(--color-text-muted)" />
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Quick Actions</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.8rem', color: '#1e40af', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                <Plus size={16} /> Add Activity
              </button>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.8rem', color: '#1e40af', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                <Plane size={16} /> Add Transport
              </button>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.8rem', color: '#1e40af', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                <Bed size={16} /> Add<br/>Accommodation
              </button>
              <button style={{ background: 'white', border: '1px solid var(--color-border)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.8rem', color: '#1e40af', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                <Map size={16} /> Explore<br/>Destinations
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Calendar;
