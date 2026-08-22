import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  Map,
  MapPin,
  Heart,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Compass,
  LogOut,
  User
} from 'lucide-react';

import axiosInstance from '../api/axiosConfig';

const Dashboard = () => {
  const navigate = useNavigate();

  // =========================================================
  // DESTINATIONS
  // =========================================================

  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] =
    useState(true);
  const [destinationError, setDestinationError] =
    useState('');

  // =========================================================
  // PREVIOUS TRIPS
  // =========================================================

  const [previousTrips, setPreviousTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tripError, setTripError] = useState('');

  // =========================================================
  // SEARCH
  // =========================================================

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // =========================================================
  // AUTH
  // =========================================================

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  // =========================================================
  // USER
  // =========================================================

  const [user, setUser] = useState(null);

  // =========================================================
  // AUTH CHECK
  // =========================================================

  useEffect(() => {
    const token =
      localStorage.getItem('access_token');

    setIsAuthenticated(!!token);

    const storedUser =
      localStorage.getItem('user');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(
          'Failed to parse stored user:',
          error
        );
      }
    }

    if (!token) {
      setTripError(
        'Please log in to see your trips.'
      );

      setLoadingTrips(false);
    }
  }, []);

  // =========================================================
  // USER DISPLAY NAME
  // =========================================================

  const getUserName = () => {
    if (!user) {
      return 'Profile';
    }

    return (
      user.first_name ||
      user.firstName ||
      user.username ||
      user.name ||
      'Profile'
    );
  };

  // =========================================================
  // USER INITIAL
  // =========================================================

  const getUserInitial = () => {
    const name = getUserName();

    if (!name || name === 'Profile') {
      return 'U';
    }

    return name.charAt(0).toUpperCase();
  };

  // =========================================================
  // FETCH DESTINATIONS
  // =========================================================

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoadingDestinations(true);
        setDestinationError('');

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude =
              position.coords.latitude;

            const longitude =
              position.coords.longitude;

            try {
              const response =
                await axiosInstance.get(
                  `/destinations/popular/?latitude=${latitude}&longitude=${longitude}`
                );

              const data = response.data;

              if (
                data &&
                data.length > 0
              ) {
                setDestinations(data);
              } else {
                const globalResponse =
                  await axiosInstance.get(
                    '/destinations/popular/'
                  );

                setDestinations(
                  globalResponse.data || []
                );
              }
            } catch (error) {
              console.error(
                'Location-based fetch failed:',
                error
              );

              try {
                const globalResponse =
                  await axiosInstance.get(
                    '/destinations/popular/'
                  );

                setDestinations(
                  globalResponse.data || []
                );
              } catch (globalError) {
                console.error(
                  'Global destination fetch failed:',
                  globalError
                );

                setDestinationError(
                  'Unable to load destinations. Please try again.'
                );
              }
            }

            setLoadingDestinations(false);
          },

          async () => {
            try {
              const response =
                await axiosInstance.get(
                  '/destinations/popular/'
                );

              setDestinations(
                response.data || []
              );
            } catch (error) {
              console.error(
                'Failed to fetch popular destinations:',
                error
              );

              setDestinationError(
                'Unable to load destinations. Please try again.'
              );
            }

            setLoadingDestinations(false);
          }
        );
      } catch (error) {
        console.error(
          'Destination fetch error:',
          error
        );

        setDestinationError(
          'Failed to load destinations. Please refresh the page.'
        );

        setLoadingDestinations(false);
      }
    };

    fetchDestinations();
  }, []);

  // =========================================================
  // FETCH USER TRIPS
  // =========================================================

  useEffect(() => {
    const fetchTrips = async () => {
      const token =
        localStorage.getItem(
          'access_token'
        );

      if (!token) {
        setLoadingTrips(false);

        setTripError(
          'Please log in to see your trips.'
        );

        return;
      }

      try {
        setLoadingTrips(true);
        setTripError('');

        const response =
          await axiosInstance.get(
            '/trips/my-trips/'
          );

        setPreviousTrips(
          response.data || []
        );

        setTripError('');
      } catch (error) {
        console.error(
          'Trip fetch error:',
          error
        );

        if (
          error.response?.status ===
          401
        ) {
          localStorage.removeItem(
            'access_token'
          );

          localStorage.removeItem(
            'refresh_token'
          );

          setIsAuthenticated(false);

          setTripError(
            'Session expired. Please log in again.'
          );
        } else if (
          error.response?.status ===
          404
        ) {
          setTripError(
            'No trips found. Start planning your first adventure!'
          );
        } else {
          setTripError(
            error.response?.data?.detail ||
              'Failed to load your trips.'
          );
        }
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchTrips();
  }, []);

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setIsSearching(true);

    try {
      const response =
        await axiosInstance.get(
          `/destinations/search/?q=${encodeURIComponent(
            searchQuery.trim()
          )}`
        );

      setDestinations(
        response.data || []
      );

      setDestinationError('');
    } catch (error) {
      console.error(
        'Search error:',
        error
      );

      setDestinationError(
        'Search failed. Please try again.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const handleClearSearch = () => {
    setSearchQuery('');

    const fetchPopular = async () => {
      try {
        const response =
          await axiosInstance.get(
            '/destinations/popular/'
          );

        setDestinations(
          response.data || []
        );

        setDestinationError('');
      } catch (error) {
        console.error(
          'Failed to fetch popular:',
          error
        );
      }
    };

    fetchPopular();
  };

  // =========================================================
  // CALCULATE DAYS
  // =========================================================

  const calculateDays = (
    startDate,
    endDate
  ) => {
    if (
      !startDate ||
      !endDate
    ) {
      return null;
    }

    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    const difference =
      Math.ceil(
        (end - start) /
          (1000 * 60 * 60 * 24)
      );

    return difference > 0
      ? difference
      : 1;
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (
    dateString
  ) => {
    if (!dateString) {
      return '';
    }

    const date =
      new Date(dateString);

    return date.toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    );
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem(
      'access_token'
    );

    localStorage.removeItem(
      'refresh_token'
    );

    localStorage.removeItem(
      'user'
    );

    setIsAuthenticated(false);

    navigate('/login');
  };

  // =========================================================
  // GO TO PROFILE
  // =========================================================

  const handleProfile = () => {
    navigate('/profile');
  };

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div
      style={{
        background:
          'var(--color-bg)',
        position: 'relative',
        minHeight: '100vh'
      }}
    >

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        style={{
          position: 'relative',
          height: '450px',
          backgroundImage:
            'linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.2)), url("https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=2800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding:
            '4rem 4rem 0 4rem',
          color: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems:
              'flex-start'
          }}
        >

          {/* HERO CONTENT */}

          <div
            style={{
              maxWidth: '600px'
            }}
          >

            <p
              style={{
                fontSize: '1.1rem',
                fontWeight: '500',
                marginBottom:
                  '0.5rem',
                color: '#e2e8f0'
              }}
            >
              Good morning 👋
            </p>

            <h1
              style={{
                fontSize: '4rem',
                fontWeight: '700',
                lineHeight: 1.1,
                marginBottom:
                  '1.5rem',
                letterSpacing:
                  '-0.02em'
              }}
            >
              Where will you
              <br />
              go next?
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: '#cbd5e1',
                marginBottom:
                  '2rem',
                maxWidth: '400px',
                lineHeight: 1.5
              }}
            >
              Plan unforgettable journeys,
              discover amazing destinations,
              and keep every trip organized
              in one place.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem'
              }}
            >

              <Link
                to="/create-trip"
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.5rem',
                  background:
                    '#1d4ed8',
                  border: 'none',
                  padding:
                    '0.8rem 1.5rem',
                  borderRadius:
                    '0.5rem',
                  fontWeight: '600',
                  color: 'white',
                  textDecoration:
                    'none'
                }}
              >
                <Plus size={18} />
                Plan a New Trip
              </Link>

              <Link
                to="/explore"
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.5rem',
                  background:
                    'rgba(255,255,255,0.1)',
                  border:
                    '1px solid rgba(255,255,255,0.3)',
                  padding:
                    '0.8rem 1.5rem',
                  borderRadius:
                    '0.5rem',
                  fontWeight: '600',
                  color: 'white',
                  textDecoration:
                    'none',
                  backdropFilter:
                    'blur(10px)'
                }}
              >
                <Compass size={18} />
                Explore Destinations
              </Link>

            </div>
          </div>

          {/* =================================================
              PROFILE + LOGOUT
          ================================================= */}

          {isAuthenticated && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >

              {/* PROFILE BUTTON */}

              <button
                onClick={
                  handleProfile
                }
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.6rem',
                  background:
                    'rgba(255,255,255,0.12)',
                  border:
                    '1px solid rgba(255,255,255,0.3)',
                  padding:
                    '0.45rem 0.8rem 0.45rem 0.45rem',
                  borderRadius:
                    '0.6rem',
                  color: 'white',
                  cursor:
                    'pointer',
                  backdropFilter:
                    'blur(10px)'
                }}
              >

                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius:
                      '50%',
                    background:
                      '#1d4ed8',
                    display: 'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    fontWeight: '700',
                    fontSize:
                      '0.85rem'
                  }}
                >
                  {getUserInitial()}
                </div>

                <span
                  style={{
                    fontSize:
                      '0.85rem',
                    fontWeight:
                      '600'
                  }}
                >
                  {getUserName()}
                </span>

                <User size={16} />

              </button>


              {/* LOGOUT BUTTON */}

              <button
                onClick={
                  handleLogout
                }
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.5rem',
                  background:
                    'rgba(255,255,255,0.1)',
                  border:
                    '1px solid rgba(255,255,255,0.3)',
                  padding:
                    '0.6rem 1.2rem',
                  borderRadius:
                    '0.5rem',
                  color: 'white',
                  cursor:
                    'pointer',
                  backdropFilter:
                    'blur(10px)'
                }}
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          )}

        </div>


        {/* =====================================================
            SEARCH BAR
        ===================================================== */}

        <div
          style={{
            position: 'absolute',
            bottom: '-35px',
            left: '4rem',
            right: '4rem',
            background: 'white',
            borderRadius: '1rem',
            padding:
              '1rem 1.5rem',
            display: 'flex',
            alignItems:
              'center',
            gap: '1rem',
            boxShadow:
              '0 10px 25px -5px rgba(0,0,0,0.1)',
            zIndex: 10
          }}
        >

          <form
            onSubmit={handleSearch}
            style={{
              display: 'flex',
              alignItems:
                'center',
              gap: '0.75rem',
              flex: 1
            }}
          >

            <Search
              size={20}
              color="var(--color-text-muted)"
            />

            <input
              type="text"
              placeholder="Search destinations, cities or activities..."
              value={
                searchQuery
              }
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '1rem',
                color:
                  'var(--color-text)',
                background:
                  'transparent'
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={
                  handleClearSearch
                }
                style={{
                  background:
                    'none',
                  border: 'none',
                  color: '#999',
                  cursor:
                    'pointer',
                  fontSize:
                    '1.2rem'
                }}
              >
                ✕
              </button>
            )}

            <button
              type="submit"
              disabled={
                isSearching
              }
              style={{
                background:
                  '#1d4ed8',
                color: 'white',
                border: 'none',
                padding:
                  '0.5rem 1.5rem',
                borderRadius:
                  '0.5rem',
                fontWeight:
                  '600',
                cursor:
                  isSearching
                    ? 'not-allowed'
                    : 'pointer',
                opacity:
                  isSearching
                    ? 0.7
                    : 1
              }}
            >
              {isSearching
                ? 'Searching...'
                : 'Search'}
            </button>

          </form>


          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems:
                'center'
            }}
          >

            <div
              style={{
                display: 'flex',
                flexDirection:
                  'column'
              }}
            >
              <span
                style={{
                  fontSize:
                    '0.75rem',
                  color:
                    'var(--color-text-muted)',
                  fontWeight:
                    '600'
                }}
              >
                Group By
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.5rem',
                  fontWeight:
                    '600',
                  cursor:
                    'pointer',
                  color:
                    'var(--color-text)'
                }}
              >
                Destination
                <ChevronDown
                  size={16}
                />
              </div>
            </div>


            <div
              style={{
                width: '1px',
                height: '30px',
                background:
                  'var(--color-border)'
              }}
            />


            <div
              style={{
                display: 'flex',
                flexDirection:
                  'column'
              }}
            >
              <span
                style={{
                  fontSize:
                    '0.75rem',
                  color:
                    'var(--color-text-muted)',
                  fontWeight:
                    '600'
                }}
              >
                Filter
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.5rem',
                  fontWeight:
                    '600',
                  cursor:
                    'pointer',
                  color:
                    'var(--color-text)'
                }}
              >
                Budget
                <ChevronDown
                  size={16}
                />
              </div>
            </div>


            <div
              style={{
                width: '1px',
                height: '30px',
                background:
                  'var(--color-border)'
              }}
            />


            <div
              style={{
                display: 'flex',
                flexDirection:
                  'column'
              }}
            >
              <span
                style={{
                  fontSize:
                    '0.75rem',
                  color:
                    'var(--color-text-muted)',
                  fontWeight:
                    '600'
                }}
              >
                Sort By
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.5rem',
                  fontWeight:
                    '600',
                  cursor:
                    'pointer',
                  color:
                    'var(--color-text)'
                }}
              >
                Popular
                <ChevronDown
                  size={16}
                />
              </div>
            </div>


            <button
              style={{
                background:
                  'var(--color-surface)',
                border:
                  '1px solid var(--color-border)',
                padding:
                  '0.75rem',
                borderRadius:
                  '0.5rem',
                display: 'flex',
                cursor:
                  'pointer',
                marginLeft:
                  '0.5rem'
              }}
            >
              <SlidersHorizontal
                size={20}
                color="var(--color-text)"
              />
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        style={{
          padding:
            '6rem 4rem 4rem 4rem',
          display: 'flex',
          flexDirection:
            'column',
          gap: '3rem'
        }}
      >

        {/* ===================================================
            DESTINATIONS
        =================================================== */}

        <section>

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems:
                'flex-end',
              marginBottom:
                '1.5rem'
            }}
          >

            <h2
              style={{
                display: 'flex',
                alignItems:
                  'center',
                gap: '0.5rem',
                fontSize:
                  '1.5rem',
                color:
                  'var(--color-text)'
              }}
            >
              <Map
                size={24}
                color="var(--color-text-muted)"
              />

              {searchQuery
                ? `Results for "${searchQuery}"`
                : 'Top Regional Selections'}
            </h2>

            <Link
              to="/explore"
              style={{
                color: '#1d4ed8',
                fontWeight: '600',
                textDecoration:
                  'none',
                display: 'flex',
                alignItems:
                  'center',
                gap: '0.25rem'
              }}
            >
              View all
              <ArrowRight
                size={16}
              />
            </Link>

          </div>


          {loadingDestinations && (
            <div
              style={{
                textAlign:
                  'center',
                padding: '3rem',
                color:
                  'var(--color-text-muted)'
              }}
            >
              Loading destinations...
            </div>
          )}


          {destinationError && (
            <div
              style={{
                textAlign:
                  'center',
                padding: '2rem',
                color: '#dc2626',
                background:
                  '#fee2e2',
                borderRadius:
                  '0.75rem'
              }}
            >
              {destinationError}
            </div>
          )}


          {!loadingDestinations &&
            !destinationError &&
            destinations.length >
              0 && (

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(5, 1fr)',
                  gap: '1.5rem'
                }}
              >

                {destinations
                  .slice(0, 10)
                  .map(
                    (destination) => (

                      <div
                        key={
                          destination.id ||
                          destination.name
                        }
                        style={{
                          background:
                            'white',
                          borderRadius:
                            '1rem',
                          overflow:
                            'hidden',
                          border:
                            '1px solid var(--color-border)',
                          boxShadow:
                            '0 4px 6px -1px rgba(0,0,0,0.05)',
                          cursor:
                            'pointer',
                          transition:
                            'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(
                          e
                        ) => {
                          e.currentTarget.style.transform =
                            'translateY(-4px)';

                          e.currentTarget.style.boxShadow =
                            '0 12px 24px -8px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(
                          e
                        ) => {
                          e.currentTarget.style.transform =
                            'translateY(0)';

                          e.currentTarget.style.boxShadow =
                            '0 4px 6px -1px rgba(0,0,0,0.05)';
                        }}
                      >

                        <div
                          style={{
                            position:
                              'relative',
                            height:
                              '160px',
                            background:
                              'var(--color-surface)'
                          }}
                        >

                          {destination.image ? (
                            <img
                              src={
                                destination.image
                              }
                              alt={
                                destination.name ||
                                'Destination'
                              }
                              style={{
                                width:
                                  '100%',
                                height:
                                  '100%',
                                objectFit:
                                  'cover',
                                display:
                                  'block'
                              }}
                              onError={(
                                e
                              ) => {
                                e.target.onerror =
                                  null;

                                e.target.style.display =
                                  'none';
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width:
                                  '100%',
                                height:
                                  '100%',
                                display:
                                  'flex',
                                alignItems:
                                  'center',
                                justifyContent:
                                  'center',
                                color:
                                  'var(--color-text-muted)'
                              }}
                            >
                              <MapPin
                                size={32}
                              />
                            </div>
                          )}

                          <div
                            style={{
                              position:
                                'absolute',
                              top:
                                '0.75rem',
                              right:
                                '0.75rem',
                              background:
                                'rgba(255,255,255,0.2)',
                              backdropFilter:
                                'blur(5px)',
                              borderRadius:
                                '50%',
                              padding:
                                '0.4rem',
                              color:
                                'white'
                            }}
                          >
                            <Heart
                              size={18}
                            />
                          </div>

                        </div>


                        <div
                          style={{
                            padding:
                              '1rem'
                          }}
                        >

                          <h3
                            style={{
                              fontSize:
                                '1.1rem',
                              fontWeight:
                                '700',
                              marginBottom:
                                '0.25rem',
                              color:
                                'var(--color-text)'
                            }}
                          >
                            {destination.name ||
                              'Unknown destination'}
                          </h3>

                          <div
                            style={{
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap:
                                '0.25rem',
                              fontSize:
                                '0.85rem',
                              color:
                                'var(--color-text-muted)'
                            }}
                          >
                            <MapPin
                              size={14}
                            />

                            {destination.city &&
                              `${destination.city}, `}

                            {destination.country ||
                              'Unknown country'}
                          </div>

                        </div>

                      </div>

                    )
                  )}

              </div>
            )}


          {!loadingDestinations &&
            !destinationError &&
            destinations.length ===
              0 && (

              <div
                style={{
                  textAlign:
                    'center',
                  padding: '3rem',
                  color:
                    'var(--color-text-muted)'
                }}
              >
                No destinations found.
                Try a different search term.
              </div>

            )}

        </section>


        {/* ===================================================
            PREVIOUS TRIPS
        =================================================== */}

        <section>

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems:
                'flex-end',
              marginBottom:
                '1.5rem'
            }}
          >

            <h2
              style={{
                display: 'flex',
                alignItems:
                  'center',
                gap: '0.5rem',
                fontSize:
                  '1.5rem',
                color:
                  'var(--color-text)'
              }}
            >
              <Compass
                size={24}
                color="var(--color-text-muted)"
              />

              Previous Trips
            </h2>

            <Link
              to="/my-trips"
              style={{
                color: '#1d4ed8',
                fontWeight: '600',
                textDecoration:
                  'none',
                display: 'flex',
                alignItems:
                  'center',
                gap: '0.25rem'
              }}
            >
              View all trips
              <ArrowRight
                size={16}
              />
            </Link>

          </div>


          {loadingTrips && (
            <div
              style={{
                textAlign:
                  'center',
                padding: '3rem',
                color:
                  'var(--color-text-muted)'
              }}
            >
              Loading your trips...
            </div>
          )}


          {tripError && (
            <div
              style={{
                textAlign:
                  'center',
                padding: '2rem',
                color:
                  tripError.includes(
                    'Please log in'
                  )
                    ? '#1d4ed8'
                    : '#dc2626',
                background:
                  tripError.includes(
                    'Please log in'
                  )
                    ? '#dbeafe'
                    : '#fee2e2',
                borderRadius:
                  '0.75rem'
              }}
            >
              {tripError}

              {tripError.includes(
                'log in'
              ) && (
                <div
                  style={{
                    marginTop:
                      '1rem'
                  }}
                >
                  <Link
                    to="/login"
                    style={{
                      display:
                        'inline-flex',
                      alignItems:
                        'center',
                      gap:
                        '0.4rem',
                      color:
                        '#1d4ed8',
                      fontWeight:
                        '600',
                      textDecoration:
                        'none'
                    }}
                  >
                    Login here
                  </Link>
                </div>
              )}
            </div>
          )}


          {!loadingTrips &&
            !tripError &&
            previousTrips.length ===
              0 && (

              <div
                style={{
                  textAlign:
                    'center',
                  padding: '3rem',
                  background:
                    'white',
                  borderRadius:
                    '1rem',
                  border:
                    '1px solid var(--color-border)',
                  color:
                    'var(--color-text-muted)'
                }}
              >

                <Compass
                  size={40}
                  style={{
                    marginBottom:
                      '0.75rem'
                  }}
                />

                <p>
                  You haven't created
                  any trips yet.
                </p>

                <Link
                  to="/create-trip"
                  style={{
                    display:
                      'inline-flex',
                    alignItems:
                      'center',
                    gap:
                      '0.4rem',
                    marginTop:
                      '1rem',
                    color:
                      '#1d4ed8',
                    fontWeight:
                      '600',
                    textDecoration:
                      'none'
                  }}
                >
                  <Plus size={16} />
                  Plan your first trip
                </Link>

              </div>

            )}


          {!loadingTrips &&
            !tripError &&
            previousTrips.length >
              0 && (

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(3, 1fr)',
                  gap: '1.5rem'
                }}
              >

                {previousTrips
                  .slice(0, 3)
                  .map((trip) => {

                    const days =
                      calculateDays(
                        trip.start_date,
                        trip.end_date
                      );

                    return (
                      <div
                        key={trip.id}
                        style={{
                          background:
                            'white',
                          borderRadius:
                            '1rem',
                          overflow:
                            'hidden',
                          border:
                            '1px solid var(--color-border)',
                          boxShadow:
                            '0 4px 6px -1px rgba(0,0,0,0.05)',
                          display:
                            'flex',
                          flexDirection:
                            'column',
                          transition:
                            'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(
                          e
                        ) => {
                          e.currentTarget.style.transform =
                            'translateY(-4px)';

                          e.currentTarget.style.boxShadow =
                            '0 12px 24px -8px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(
                          e
                        ) => {
                          e.currentTarget.style.transform =
                            'translateY(0)';

                          e.currentTarget.style.boxShadow =
                            '0 4px 6px -1px rgba(0,0,0,0.05)';
                        }}
                      >

                        {/* TRIP IMAGE */}

                        <div
                          style={{
                            position:
                              'relative',
                            height:
                              '160px',
                            background:
                              'var(--color-surface)'
                          }}
                        >

                          {trip.cover_image ? (
                            <img
                              src={
                                trip.cover_image
                              }
                              alt={
                                trip.title
                              }
                              style={{
                                width:
                                  '100%',
                                height:
                                  '100%',
                                objectFit:
                                  'cover'
                              }}
                              onError={(
                                e
                              ) => {
                                e.target.style.display =
                                  'none';
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width:
                                  '100%',
                                height:
                                  '100%',
                                display:
                                  'flex',
                                alignItems:
                                  'center',
                                justifyContent:
                                  'center',
                                color:
                                  'var(--color-text-muted)'
                              }}
                            >
                              <Compass
                                size={40}
                              />
                            </div>
                          )}


                          {/* STATUS */}

                          <div
                            style={{
                              position:
                                'absolute',
                              top:
                                '0.75rem',
                              left:
                                '0.75rem',
                              background:
                                trip.status ===
                                'ongoing'
                                  ? '#059669'
                                  : trip.status ===
                                    'upcoming'
                                  ? '#1d4ed8'
                                  : '#6b7280',
                              color:
                                'white',
                              fontSize:
                                '0.7rem',
                              fontWeight:
                                '600',
                              padding:
                                '0.25rem 0.75rem',
                              borderRadius:
                                '0.25rem',
                              textTransform:
                                'capitalize'
                            }}
                          >
                            {trip.status ||
                              'Planning'}
                          </div>


                          <div
                            style={{
                              position:
                                'absolute',
                              top:
                                '0.75rem',
                              right:
                                '0.75rem',
                              color:
                                'white'
                            }}
                          >
                            <Heart
                              size={20}
                            />
                          </div>

                        </div>


                        {/* TRIP DETAILS */}

                        <div
                          style={{
                            padding:
                              '1.25rem'
                          }}
                        >

                          <h3
                            style={{
                              fontSize:
                                '1.25rem',
                              fontWeight:
                                '700',
                              color:
                                'var(--color-text)',
                              marginBottom:
                                '0.5rem'
                            }}
                          >
                            {trip.title ||
                              'Untitled Trip'}
                          </h3>


                          <div
                            style={{
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap:
                                '0.4rem',
                              color:
                                'var(--color-text-muted)',
                              fontSize:
                                '0.9rem',
                              marginBottom:
                                '0.75rem'
                            }}
                          >
                            <MapPin
                              size={15}
                            />

                            {trip.destination ||
                              'Destination not specified'}
                          </div>


                          {/* DATES */}

                          <div
                            style={{
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap:
                                '0.4rem',
                              color:
                                'var(--color-text-muted)',
                              fontSize:
                                '0.8rem',
                              marginBottom:
                                '0.5rem'
                            }}
                          >
                            <Calendar
                              size={14}
                            />

                            {formatDate(
                              trip.start_date
                            )}

                            {' → '}

                            {formatDate(
                              trip.end_date
                            )}
                          </div>


                          {/* DAYS */}

                          {days && (
                            <div
                              style={{
                                display:
                                  'flex',
                                alignItems:
                                  'center',
                                gap:
                                  '0.4rem',
                                color:
                                  'var(--color-text-muted)',
                                fontSize:
                                  '0.8rem',
                                marginBottom:
                                  '1rem'
                              }}
                            >
                              <Clock
                                size={14}
                              />

                              {days}{' '}
                              {days ===
                              1
                                ? 'Day'
                                : 'Days'}
                            </div>
                          )}


                          {/* BUDGET */}

                          <div
                            style={{
                              paddingTop:
                                '0.75rem',
                              borderTop:
                                '1px solid var(--color-border)',
                              fontSize:
                                '0.85rem'
                            }}
                          >
                            <span
                              style={{
                                color:
                                  'var(--color-text-muted)'
                              }}
                            >
                              Budget
                            </span>

                            <span
                              style={{
                                fontWeight:
                                  '600',
                                color:
                                  'var(--color-text)',
                                marginLeft:
                                  '0.5rem'
                              }}
                            >
                              ₹
                              {Number(
                                trip.total_budget ||
                                  0
                              ).toLocaleString(
                                'en-IN'
                              )}
                            </span>
                          </div>


                          {/* VIEW TRIP */}

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/itinerary/${trip.id}`
                              )
                            }
                            style={{
                              width:
                                '100%',
                              marginTop:
                                '1rem',
                              padding:
                                '0.7rem',
                              border:
                                'none',
                              borderRadius:
                                '0.5rem',
                              background:
                                '#1d4ed8',
                              color:
                                'white',
                              fontWeight:
                                '600',
                              cursor:
                                'pointer'
                            }}
                          >
                            View Trip
                          </button>

                        </div>

                      </div>
                    );
                  })}

              </div>
            )}

        </section>

      </div>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        style={{
          borderTop:
            '1px solid var(--color-border)',
          padding: '4rem',
          background:
            'white',
          display: 'flex',
          justifyContent:
            'space-between',
          color:
            'var(--color-text-muted)',
          fontSize:
            '0.85rem'
        }}
      >

        <div
          style={{
            maxWidth:
              '250px'
          }}
        >

          <div
            style={{
              display: 'flex',
              alignItems:
                'center',
              gap: '0.5rem',
              color: '#0f172a',
              marginBottom:
                '1rem'
            }}
          >

            <div
              style={{
                background:
                  'var(--color-primary)',
                borderRadius:
                  '50%',
                padding:
                  '0.25rem',
                display: 'flex'
              }}
            >
              <MapPin
                size={16}
                color="white"
              />
            </div>

            <span
              style={{
                fontSize:
                  '1.1rem',
                fontWeight:
                  '700'
              }}
            >
              GlobeTrotter
            </span>

          </div>

          <p
            style={{
              marginBottom:
                '1.5rem'
            }}
          >
            Plan your journey.
            Discover the world.
          </p>

          <p>
            © 2026 GlobeTrotter.
            All rights reserved.
          </p>

        </div>


        <div
          style={{
            display: 'flex',
            gap: '4rem'
          }}
        >

          {/* ABOUT */}

          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '0.75rem'
            }}
          >
            <strong
              style={{
                color:
                  'var(--color-text)'
              }}
            >
              About
            </strong>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              About Us
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              How it Works
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Careers
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Press
            </Link>
          </div>


          {/* EXPLORE */}

          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '0.75rem'
            }}
          >
            <strong
              style={{
                color:
                  'var(--color-text)'
              }}
            >
              Explore
            </strong>

            <Link
              to="/explore"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Destinations
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Activities
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Travel Guides
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Inspiration
            </Link>
          </div>


          {/* MY TRIPS */}

          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '0.75rem'
            }}
          >
            <strong
              style={{
                color:
                  'var(--color-text)'
              }}
            >
              My Trips
            </strong>

            <Link
              to="/my-trips"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Trips
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Itineraries
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Bookings
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Favorites
            </Link>
          </div>


          {/* PROFILE */}

          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '0.75rem'
            }}
          >

            <strong
              style={{
                color:
                  'var(--color-text)'
              }}
            >
              Account
            </strong>

            <Link
              to="/profile"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Profile
            </Link>

            <Link
              to="/my-trips"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              My Trips
            </Link>

            <Link
              to="/calendar"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Calendar
            </Link>

          </div>


          {/* SUPPORT */}

          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '0.75rem'
            }}
          >

            <strong
              style={{
                color:
                  'var(--color-text)'
              }}
            >
              Support
            </strong>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Help Center
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Contact Us
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              FAQs
            </Link>

          </div>


          {/* LEGAL */}

          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '0.75rem'
            }}
          >

            <strong
              style={{
                color:
                  'var(--color-text)'
              }}
            >
              Legal
            </strong>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Privacy Policy
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Terms of Service
            </Link>

            <Link
              to="#"
              style={{
                color:
                  'var(--color-text-muted)',
                textDecoration:
                  'none'
              }}
            >
              Cookie Policy
            </Link>

          </div>

        </div>


        {/* SOCIAL */}

        <div>

          <strong
            style={{
              color:
                'var(--color-text)',
              display: 'block',
              marginBottom:
                '1rem'
            }}
          >
            Follow us
          </strong>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              color: '#1d4ed8'
            }}
          >
            <span
              style={{
                cursor:
                  'pointer'
              }}
            >
              IG
            </span>

            <span
              style={{
                cursor:
                  'pointer'
              }}
            >
              TW
            </span>

            <span
              style={{
                cursor:
                  'pointer'
              }}
            >
              FB
            </span>

            <span
              style={{
                cursor:
                  'pointer'
              }}
            >
              IN
            </span>
          </div>

        </div>

      </footer>


      {/* =====================================================
          FLOATING PLAN TRIP BUTTON
      ===================================================== */}

      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100
        }}
      >

        <Link
          to="/create-trip"
          style={{
            textDecoration:
              'none',
            background:
              '#1d4ed8',
            color: 'white',
            width: '64px',
            height: '64px',
            borderRadius:
              '50%',
            display: 'flex',
            flexDirection:
              'column',
            alignItems:
              'center',
            justifyContent:
              'center',
            gap: '0.25rem',
            boxShadow:
              '0 10px 25px rgba(29, 78, 216, 0.4)',
            cursor:
              'pointer',
            border: 'none'
          }}
        >

          <Plus size={24} />

          <span
            style={{
              fontSize:
                '0.6rem',
              fontWeight:
                '600'
            }}
          >
            Plan a Trip
          </span>

        </Link>

      </div>

    </div>
  );
};

export default Dashboard;