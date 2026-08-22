import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import all pages from your pages directory
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import Explore from './pages/Explore';
import MyTrips from './pages/MyTrips';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import ItineraryView from './pages/ItineraryView';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Main Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/itinerary/:tripId" element={<ItineraryView />} />
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
