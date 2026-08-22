import { useState } from 'react';
import { Search, Globe, Home, Settings, BarChart2, Download, Calendar, HelpCircle, Bell, ChevronDown, Users, Map, Navigation, CheckCircle2, MoreHorizontal, User, PieChart, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'var(--font-body)', overflow: 'hidden' }}>
      
      {/* ==================== SIDEBAR ==================== */}
      <div style={{ width: '250px', background: '#1e1b4b', color: 'white', display: 'flex', flexDirection: 'column', padding: '1.5rem', flexShrink: 0 }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ background: '#3b82f6', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
            <Globe size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>GlobeTrotter</span>
        </div>

        {/* Nav Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', textDecoration: 'none', fontWeight: '500' }}>
            <Home size={18} /> Overview
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>
            <Settings size={18} /> Management
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>
            <BarChart2 size={18} /> Analytics
          </a>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', color: '#94a3b8', textDecoration: 'none', fontWeight: '500' }}>
            <Settings size={18} /> System
          </a>
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem 2.5rem', overflowY: 'auto', position: 'relative' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Admin Analytics Dashboard</h1>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Based on React and Tailwind CSS analytics dashboard</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>
              <Download size={14} /> Export Report
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid var(--color-border)', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}>
              <Calendar size={14} /> Last 30 Days <ChevronDown size={14} />
            </button>
          </div>

          <div style={{ position: 'absolute', top: '1.5rem', right: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <HelpCircle size={18} color="#64748b" style={{ cursor: 'pointer' }} />
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <Bell size={18} color="#64748b" />
              <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <ChevronDown size={14} color="#64748b" />
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search & Filter Toolbar" style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', outline: 'none', fontSize: '0.95rem', background: 'white' }} />
        </div>

        {/* ==================== MIDDLE ROW ==================== */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          
          {/* KPI Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', width: '350px', flexShrink: 0 }}>
            {/* KPI 1 */}
            <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: '#ede9fe', padding: '0.4rem', borderRadius: '0.5rem', color: '#8b5cf6' }}><Users size={18}/></div>
                <div style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>↑ Up</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>24,580 <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a' }}>+12.8%</span></div>
              </div>
            </div>
            {/* KPI 2 */}
            <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: '#fef3c7', padding: '0.4rem', borderRadius: '0.5rem', color: '#d97706' }}><Map size={18}/></div>
                <div style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>↑ Up</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>8,426 <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a' }}>+8.4%</span></div>
              </div>
            </div>
            {/* KPI 3 */}
            <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: '#ffe4e6', padding: '0.4rem', borderRadius: '0.5rem', color: '#e11d48' }}><Navigation size={18}/></div>
                <div style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>↑ Up</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>2,184 <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a' }}>+15.2%</span></div>
              </div>
            </div>
            {/* KPI 4 */}
            <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ background: '#dbeafe', padding: '0.4rem', borderRadius: '0.5rem', color: '#1d4ed8' }}><Globe size={18}/></div>
                <div style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>↑ Up</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Community Posts</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' }}>5,892 <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a' }}>+18.3%</span></div>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div style={{ flex: 1, background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>User Trajectory</h3>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#ede9fe', color: '#4f46e5', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: '600' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4f46e5' }}></div> Users</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0ea5e9' }}></div> Trips</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e2e8f0' }}></div> Community</span>
              </div>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              {/* Mock Area Chart SVG */}
              <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <path d="M0,30 L400,30" stroke="#f1f5f9" strokeWidth="1"/>
                <path d="M0,60 L400,60" stroke="#f1f5f9" strokeWidth="1"/>
                <path d="M0,90 L400,90" stroke="#f1f5f9" strokeWidth="1"/>
                <path d="M0,120 L400,120" stroke="#f1f5f9" strokeWidth="1"/>
                
                {/* Blue Area */}
                <path d="M0,140 Q50,70 120,70 T240,110 T400,20 L400,140 L0,140 Z" fill="url(#grad1)"/>
                <path d="M0,140 Q50,70 120,70 T240,110 T400,20" fill="none" stroke="#4f46e5" strokeWidth="2.5"/>
                
                {/* Light Blue Area */}
                <path d="M0,140 Q60,90 150,90 T280,120 T400,50 L400,140 L0,140 Z" fill="url(#grad2)"/>
                <path d="M0,140 Q60,90 150,90 T280,120 T400,50" fill="none" stroke="#0ea5e9" strokeWidth="2.5"/>
              </svg>
              {/* Axes labels */}
              <div style={{ position: 'absolute', bottom: '-5px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#94a3b8' }}>
                <span>Day 2</span><span>Day 5</span><span>Day 7</span><span>Jul 18</span><span>24 29</span><span>24 30</span><span>Days</span>
              </div>
              <div style={{ position: 'absolute', left: '-20px', top: 0, bottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.6rem', color: '#94a3b8' }}>
                <span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div style={{ width: '220px', background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}>User Distribution</h3>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 1.5rem 0' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'conic-gradient(#3b82f6 0% 62%, #10b981 62% 82%, #f59e0b 82% 92%, #ef4444 92% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'white' }}></div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.65rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '2px' }}></div> Active: 62%</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '2px' }}></div> New: 20%</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '2px' }}></div> Returning: 10%</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '2px' }}></div> Inactive: 8%</div>
            </div>
          </div>

          {/* Quick Guide */}
          <div style={{ width: '220px', background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', flexShrink: 0 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>Admin Quick Guide</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ background: '#ede9fe', padding: '0.4rem', borderRadius: '0.5rem', color: '#8b5cf6', height: 'fit-content' }}><Users size={16}/></div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>Manage Users</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Manage users commune statistics and details.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ background: '#ede9fe', padding: '0.4rem', borderRadius: '0.5rem', color: '#8b5cf6', height: 'fit-content' }}><Map size={16}/></div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>Popular Cities</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Popular cities and check the most popular cities.</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ background: '#ede9fe', padding: '0.4rem', borderRadius: '0.5rem', color: '#8b5cf6', height: 'fit-content' }}><TrendingUp size={16}/></div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>User Trends</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>Trends are making our user trends explanations.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== BOTTOM ROW ==================== */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          
          {/* User Management Table */}
          <div style={{ flex: 1.5, background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>User Management Directory</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', color: '#64748b' }}>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}><input type="checkbox" style={{ accentColor: '#1d4ed8' }} /></th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>User ↑</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Stat ↕</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Age ↕</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Statistics ↕</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}></th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.85rem', color: '#334155' }}>
                {[
                  { name: 'Aarav Patel', type: 'Sample', stat: '32.3%', age: 49, rev: '$410.2025' },
                  { name: 'Aarav Patel', type: 'Sample', stat: '48.3%', age: 64, rev: '$252.2025' },
                  { name: 'Aarav Patel', type: 'User', stat: '38.2%', age: 77, rev: '$212.2023' },
                  { name: 'Minh Part', type: 'Sample', stat: '33.5%', age: 78, rev: '$218.2023' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i !== 3 ? '1px solid var(--color-border)' : 'none' }}>
                    <td style={{ padding: '1rem 1.5rem' }}><input type="checkbox" style={{ accentColor: '#1d4ed8' }} /></td>
                    <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600', color: '#0f172a' }}>
                      <img src={`https://i.pravatar.cc/150?img=${i+12}`} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                      {row.name}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>{row.type}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{row.stat}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{row.age}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600', color: '#0f172a' }}>{row.rev}</td>
                    <td style={{ padding: '1rem 1.5rem' }}><MoreHorizontal size={16} color="#94a3b8" style={{ cursor: 'pointer' }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Destinations Table */}
          <div style={{ flex: 1, background: 'white', borderRadius: '0.75rem', border: '1px solid var(--color-border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a' }}>Trending Travel Destinations</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', color: '#64748b' }}>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Rank</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Country</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Trips ↕</th>
                  <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600' }}>Growth ↕</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.85rem', color: '#334155' }}>
                {[
                  { rank: 1, flag: '🇯🇵', name: 'Tokyo', trips: '4,820', growth: '+18.3%' },
                  { rank: 2, flag: '🇫🇷', name: 'Paris', trips: '2,870', growth: '+18.8%' },
                  { rank: 3, flag: '🇺🇸', name: 'New York', trips: '1,284', growth: '+15.2%' },
                  { rank: 4, flag: '🇮🇹', name: 'France', trips: '688', growth: '+18.3%' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i !== 3 ? '1px solid var(--color-border)' : 'none' }}>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>{row.rank}</td>
                    <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: '#0f172a' }}>
                      <span style={{ fontSize: '1.2rem' }}>{row.flag}</span> {row.name}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>{row.trips}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontWeight: '700', fontSize: '0.75rem' }}>↑ {row.growth}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ==================== TOAST ==================== */}
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'white', borderRadius: '0.5rem', border: '1px solid var(--color-border)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 100 }}>
          <div style={{ background: '#dcfce7', borderRadius: '50%', padding: '0.2rem', display: 'flex' }}>
             <CheckCircle2 size={16} color="#16a34a" />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#0f172a' }}>Report exported successfully.</span>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
