import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  MapPin,
  Calendar,
  Building,
  Star,
  Wallet,
  ArrowRight,
  MoreVertical,
  Plus,
  Edit2,
  Copy,
  Plane,
  Heart,
  Map,
  Trash2,
  Loader2,
} from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000';

const MyTrips = () => {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const [statusFilter, setStatusFilter] =
    useState('all');

  const [sortBy, setSortBy] =
    useState('latest');

  const [openMenu, setOpenMenu] =
    useState(null);

  const [error, setError] =
    useState('');

  // =========================================================
  // LOAD TRIPS
  // =========================================================

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError('');

      const token =
        localStorage.getItem('access_token') ||
        localStorage.getItem('access');

      const response = await fetch(
        `${API_BASE_URL}/api/trips/my-trips/`,
        {
          method: 'GET',
          headers: {
            'Content-Type':
              'application/json',

            ...(token
              ? {
                  Authorization:
                    `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      if (response.status === 401) {
        setError(
          'Your session has expired. Please login again.'
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          'Failed to load trips.'
        );
      }

      const data =
        await response.json();

      setTrips(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(
        'Error loading trips:',
        err
      );

      setError(
        'Failed to load your trips.'
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DELETE TRIP
  // =========================================================

  const deleteTrip = async tripId => {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this trip?'
      );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem('access_token') ||
        localStorage.getItem('access');

      const response = await fetch(
        `${API_BASE_URL}/api/trips/${tripId}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type':
              'application/json',

            ...(token
              ? {
                  Authorization:
                    `Bearer ${token}`,
                }
              : {}),
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          'Failed to delete trip.'
        );
      }

      setTrips(
        previous =>
          previous.filter(
            trip =>
              trip.id !== tripId
          )
      );

      setOpenMenu(null);
    } catch (err) {
      console.error(
        'Delete trip error:',
        err
      );

      alert(
        'Failed to delete the trip.'
      );
    }
  };

  // =========================================================
  // FILTER TRIPS
  // =========================================================

  const filteredTrips = trips
    .filter(trip => {

      const query =
        searchQuery
          .trim()
          .toLowerCase();

      if (!query) {
        return true;
      }

      return (
        (trip.title || '')
          .toLowerCase()
          .includes(query) ||
        (trip.destination || '')
          .toLowerCase()
          .includes(query)
      );
    })
    .filter(trip => {

      if (
        statusFilter === 'all'
      ) {
        return true;
      }

      return (
        (trip.status || '')
          .toLowerCase() ===
        statusFilter
      );
    })
    .sort((a, b) => {

      if (sortBy === 'latest') {
        return (
          new Date(
            b.created_at
          ) -
          new Date(
            a.created_at
          )
        );
      }

      if (sortBy === 'oldest') {
        return (
          new Date(
            a.created_at
          ) -
          new Date(
            b.created_at
          )
        );
      }

      if (sortBy === 'start-date') {
        return (
          new Date(
            a.start_date
          ) -
          new Date(
            b.start_date
          )
        );
      }

      if (sortBy === 'budget-high') {
        return (
          Number(
            b.total_budget || 0
          ) -
          Number(
            a.total_budget || 0
          )
        );
      }

      if (sortBy === 'budget-low') {
        return (
          Number(
            a.total_budget || 0
          ) -
          Number(
            b.total_budget || 0
          )
        );
      }

      return 0;
    });

  // =========================================================
  // STATUS HELPERS
  // =========================================================

  const getStatus = trip => {
    if (trip.status) {
      return trip.status.toLowerCase();
    }

    const today =
      new Date();

    const start =
      new Date(
        trip.start_date
      );

    const end =
      new Date(
        trip.end_date
      );

    if (today < start) {
      return 'upcoming';
    }

    if (
      today >= start &&
      today <= end
    ) {
      return 'ongoing';
    }

    return 'completed';
  };

  const getStatusLabel =
    status => {

      if (
        status === 'ongoing'
      ) {
        return 'Ongoing';
      }

      if (
        status === 'upcoming'
      ) {
        return 'Upcoming';
      }

      if (
        status === 'completed'
      ) {
        return 'Completed';
      }

      return (
        status || 'Upcoming'
      );
    };

  // =========================================================
  // STATUS COLOR
  // =========================================================

  const getStatusColor =
    status => {

      if (
        status === 'ongoing'
      ) {
        return '#10b981';
      }

      if (
        status === 'completed'
      ) {
        return '#94a3b8';
      }

      return '#3b82f6';
    };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate =
    dateString => {

      if (!dateString) {
        return 'Date not set';
      }

      const date =
        new Date(
          dateString
        );

      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return dateString;
      }

      return date.toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }
      );
    };

  // =========================================================
  // DATE RANGE
  // =========================================================

  const formatDateRange =
    trip => {

      if (
        !trip.start_date &&
        !trip.end_date
      ) {
        return 'Dates not set';
      }

      return `${formatDate(
        trip.start_date
      )} - ${formatDate(
        trip.end_date
      )}`;
    };

  // =========================================================
  // BUDGET
  // =========================================================

  const formatBudget =
    budget => {

      if (
        budget === null ||
        budget === undefined ||
        budget === ''
      ) {
        return '0';
      }

      return Number(
        budget
      ).toLocaleString(
        'en-US'
      );
    };

  // =========================================================
  // IMAGE
  // =========================================================

  const getTripImage =
    trip => {

      if (trip.cover_image) {
        return trip.cover_image;
      }

      const destination =
        (
          trip.destination ||
          ''
        ).toLowerCase();

      if (
        destination.includes(
          'japan'
        ) ||
        destination.includes(
          'tokyo'
        )
      ) {
        return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80';
      }

      if (
        destination.includes(
          'bali'
        ) ||
        destination.includes(
          'indonesia'
        )
      ) {
        return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80';
      }

      if (
        destination.includes(
          'paris'
        ) ||
        destination.includes(
          'france'
        )
      ) {
        return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80';
      }

      if (
        destination.includes(
          'rome'
        ) ||
        destination.includes(
          'italy'
        )
      ) {
        return 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80';
      }

      return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80';
    };

  // =========================================================
  // DESTINATION DISPLAY
  // =========================================================

  const getDestination =
    trip => {

      if (
        !trip.destination
      ) {
        return 'Destination not set';
      }

      return trip.destination;
    };

  // =========================================================
  // OPEN TRIP
  // =========================================================

  const openTrip =
    tripId => {
      navigate(
        `/trips/${tripId}`
      );
    };

  // =========================================================
  // EDIT TRIP
  // =========================================================

  const editTrip =
    tripId => {
      navigate(
        `/trips/${tripId}/edit`
      );
    };

  // =========================================================
  // COPY TRIP
  // =========================================================

  const copyTrip = async trip => {

    try {

      const token =
        localStorage.getItem(
          'access_token'
        ) ||
        localStorage.getItem(
          'access'
        );

      const response =
        await fetch(
          `${API_BASE_URL}/api/trips/create/`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',

              ...(token
                ? {
                    Authorization:
                      `Bearer ${token}`,
                  }
                : {}),
            },

            body: JSON.stringify({
              title:
                `${trip.title} Copy`,
              destination:
                trip.destination,
              start_date:
                trip.start_date,
              end_date:
                trip.end_date,
              status:
                'upcoming',
              total_budget:
                trip.total_budget,
              cover_image:
                trip.cover_image,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          'Failed to copy trip.'
        );
      }

      const newTrip =
        await response.json();

      setTrips(
        previous => [
          newTrip,
          ...previous,
        ]
      );

      setOpenMenu(null);

    } catch (err) {

      console.error(
        'Copy trip error:',
        err
      );

      alert(
        'Failed to copy the trip.'
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div
        style={{
          background:
            'var(--color-bg)',
          minHeight:
            '100vh',
          display: 'flex',
          alignItems:
            'center',
          justifyContent:
            'center',
          flexDirection:
            'column',
          gap: '1rem',
        }}
      >

        <Loader2
          size={36}
          style={{
            animation:
              'spin 1s linear infinite',
          }}
          color="#1d4ed8"
        />

        <p
          style={{
            color:
              'var(--color-text-muted)',
          }}
        >
          Loading your trips...
        </p>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {

    return (
      <div
        style={{
          background:
            'var(--color-bg)',
          minHeight:
            '100vh',
          display: 'flex',
          alignItems:
            'center',
          justifyContent:
            'center',
          flexDirection:
            'column',
          gap: '1rem',
          padding: '2rem',
        }}
      >

        <h2
          style={{
            color:
              'var(--color-text)',
          }}
        >
          Unable to load trips
        </h2>

        <p
          style={{
            color:
              'var(--color-text-muted)',
          }}
        >
          {error}
        </p>

        <button
          onClick={fetchTrips}
          style={{
            background:
              '#1d4ed8',
            color: 'white',
            border: 'none',
            padding:
              '0.75rem 1.5rem',
            borderRadius:
              '0.5rem',
            fontWeight:
              '600',
            cursor:
              'pointer',
          }}
        >
          Try Again
        </button>

      </div>
    );
  }

  // =========================================================
  // RENDER TRIP CARD
  // =========================================================

  const renderTripCard =
    trip => {

      const status =
        getStatus(trip);

      const statusColor =
        getStatusColor(
          status
        );

      return (
        <div
          key={trip.id}
          style={{
            background: 'white',
            borderRadius:
              '1rem',
            overflow: 'hidden',
            border:
              '1px solid var(--color-border)',
            display: 'flex',
            padding: '1rem',
            gap: '2rem',
            alignItems:
              'center',
            boxShadow:
              '0 4px 6px -1px rgba(0,0,0,0.02)',
          }}
        >

          {/* IMAGE */}

          <div
            style={{
              position:
                'relative',
              width: '320px',
              height: '180px',
              borderRadius:
                '0.75rem',
              overflow:
                'hidden',
              flexShrink: 0,
            }}
          >

            <img
              src={getTripImage(
                trip
              )}
              alt={
                trip.title
              }
              style={{
                width: '100%',
                height: '100%',
                objectFit:
                  'cover',
              }}
              onError={e => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80';
              }}
            />

            {/* STATUS */}

            <div
              style={{
                position:
                  'absolute',
                top: '0.75rem',
                left: '0.75rem',
                background:
                  statusColor,
                color: 'white',
                fontSize:
                  '0.75rem',
                fontWeight:
                  '600',
                padding:
                  '0.25rem 0.75rem',
                borderRadius:
                  '2rem',
                display:
                  'flex',
                alignItems:
                  'center',
                gap: '0.25rem',
              }}
            >

              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius:
                    '50%',
                  background:
                    'white',
                }}
              />

              {
                getStatusLabel(
                  status
                )
              }

            </div>


            {/* HEART */}

            <div
              style={{
                position:
                  'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background:
                  'rgba(0,0,0,0.3)',
                backdropFilter:
                  'blur(4px)',
                color:
                  'white',
                padding:
                  '0.4rem',
                borderRadius:
                  '50%',
                cursor:
                  'pointer',
              }}
            >
              <Heart size={16} />
            </div>

          </div>


          {/* CONTENT */}

          <div
            style={{
              flex: 1,
              display:
                'flex',
              justifyContent:
                'space-between',
              alignItems:
                'center',
            }}
          >

            <div>

              <h3
                style={{
                  fontSize:
                    '1.5rem',
                  fontWeight:
                    '700',
                  color:
                    'var(--color-text)',
                  marginBottom:
                    '0.5rem',
                }}
              >
                {
                  trip.title ||
                  'Untitled Trip'
                }
              </h3>


              <div
                style={{
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '0.5rem',
                  color:
                    'var(--color-text-muted)',
                  fontSize:
                    '0.9rem',
                  marginBottom:
                    '1.5rem',
                }}
              >

                <MapPin
                  size={16}
                />

                {
                  getDestination(
                    trip
                  )
                }

              </div>


              <div
                style={{
                  display:
                    'flex',
                  gap:
                    '1.5rem',
                  color:
                    'var(--color-text)',
                  fontSize:
                    '0.9rem',
                  fontWeight:
                    '500',
                  flexWrap:
                    'wrap',
                }}
              >

                <span
                  style={{
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap:
                      '0.5rem',
                  }}
                >
                  <Calendar
                    size={18}
                    color="var(--color-text-muted)"
                  />

                  {
                    formatDateRange(
                      trip
                    )
                  }
                </span>


                <span
                  style={{
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap:
                      '0.5rem',
                  }}
                >
                  <Building
                    size={18}
                    color="var(--color-text-muted)"
                  />

                  1 Destination
                </span>


                <span
                  style={{
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap:
                      '0.5rem',
                  }}
                >
                  <Star
                    size={18}
                    color="var(--color-text-muted)"
                  />

                  Activities
                </span>

              </div>

            </div>


            {/* RIGHT SIDE */}

            <div
              style={{
                display:
                  'flex',
                flexDirection:
                  'column',
                alignItems:
                  'flex-end',
                gap:
                  '1.5rem',
                position:
                  'relative',
              }}
            >

              <div
                style={{
                  display:
                    'flex',
                  alignItems:
                    'flex-start',
                  gap:
                    '0.75rem',
                }}
              >

                <Wallet
                  size={24}
                  color="#0ea5e9"
                  style={{
                    marginTop:
                      '0.25rem',
                  }}
                />

                <div>

                  <span
                    style={{
                      display:
                        'block',
                      fontSize:
                        '0.8rem',
                      color:
                        'var(--color-text-muted)',
                    }}
                  >
                    Estimated Budget
                  </span>

                  <span
                    style={{
                      fontSize:
                        '1.75rem',
                      fontWeight:
                        '800',
                      color:
                        '#0f172a',
                    }}
                  >
                    $
                    {
                      formatBudget(
                        trip.total_budget
                      )
                    }
                  </span>

                </div>

              </div>


              {/* BUTTONS */}

              <div
                style={{
                  display:
                    'flex',
                  gap:
                    '0.75rem',
                }}
              >

                <button
                  onClick={() =>
                    openTrip(
                      trip.id
                    )
                  }
                  style={{
                    background:
                      '#3b82f6',
                    color:
                      'white',
                    padding:
                      '0.75rem 1.5rem',
                    borderRadius:
                      '0.5rem',
                    fontWeight:
                      '600',
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap:
                      '0.5rem',
                    border:
                      'none',
                    cursor:
                      'pointer',
                  }}
                >
                  View Itinerary
                  <ArrowRight
                    size={16}
                  />
                </button>


                <button
                  onClick={() =>
                    editTrip(
                      trip.id
                    )
                  }
                  style={{
                    background:
                      'white',
                    color:
                      'var(--color-text)',
                    border:
                      '1px solid var(--color-border)',
                    padding:
                      '0.75rem 1.5rem',
                    borderRadius:
                      '0.5rem',
                    fontWeight:
                      '600',
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap:
                      '0.5rem',
                    cursor:
                      'pointer',
                  }}
                >
                  <Edit2
                    size={16}
                  />
                  Edit
                </button>


                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu ===
                        trip.id
                        ? null
                        : trip.id
                    )
                  }
                  style={{
                    background:
                      'white',
                    color:
                      'var(--color-text-muted)',
                    border:
                      '1px solid var(--color-border)',
                    padding:
                      '0.75rem',
                    borderRadius:
                      '0.5rem',
                    display:
                      'flex',
                    cursor:
                      'pointer',
                  }}
                >
                  <MoreVertical
                    size={20}
                  />
                </button>

              </div>


              {/* MENU */}

              {openMenu ===
                trip.id && (

                <div
                  style={{
                    position:
                      'absolute',
                    right: 0,
                    bottom:
                      '3.5rem',
                    width:
                      '180px',
                    background:
                      'white',
                    border:
                      '1px solid var(--color-border)',
                    borderRadius:
                      '0.75rem',
                    boxShadow:
                      '0 10px 25px rgba(0,0,0,0.12)',
                    overflow:
                      'hidden',
                    zIndex:
                      50,
                  }}
                >

                  <button
                    onClick={() =>
                      copyTrip(
                        trip
                      )
                    }
                    style={{
                      width:
                        '100%',
                      display:
                        'flex',
                      alignItems:
                        'center',
                      gap:
                        '0.75rem',
                      padding:
                        '0.75rem 1rem',
                      background:
                        'white',
                      border:
                        'none',
                      cursor:
                        'pointer',
                      textAlign:
                        'left',
                      color:
                        'var(--color-text)',
                    }}
                  >
                    <Copy
                      size={16}
                    />
                    Copy Trip
                  </button>


                  <button
                    onClick={() =>
                      editTrip(
                        trip.id
                      )
                    }
                    style={{
                      width:
                        '100%',
                      display:
                        'flex',
                      alignItems:
                        'center',
                      gap:
                        '0.75rem',
                      padding:
                        '0.75rem 1rem',
                      background:
                        'white',
                      border:
                        'none',
                      cursor:
                        'pointer',
                      textAlign:
                        'left',
                      color:
                        'var(--color-text)',
                    }}
                  >
                    <Edit2
                      size={16}
                    />
                    Edit Trip
                  </button>


                  <button
                    onClick={() =>
                      deleteTrip(
                        trip.id
                      )
                    }
                    style={{
                      width:
                        '100%',
                      display:
                        'flex',
                      alignItems:
                        'center',
                      gap:
                        '0.75rem',
                      padding:
                        '0.75rem 1rem',
                      background:
                        'white',
                      border:
                        'none',
                      cursor:
                        'pointer',
                      textAlign:
                        'left',
                      color:
                        '#dc2626',
                    }}
                  >
                    <Trash2
                      size={16}
                    />
                    Delete Trip
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>
      );
    };

  // =========================================================
  // GROUP TRIPS
  // =========================================================

  const ongoingTrips =
    filteredTrips.filter(
      trip =>
        getStatus(trip) ===
        'ongoing'
    );

  const upcomingTrips =
    filteredTrips.filter(
      trip =>
        getStatus(trip) ===
        'upcoming'
    );

  const completedTrips =
    filteredTrips.filter(
      trip =>
        getStatus(trip) ===
        'completed'
    );

  // =========================================================
  // SECTION
  // =========================================================

  const renderSection =
    (
      title,
      description,
      tripsToRender,
      color
    ) => {

      if (
        tripsToRender.length ===
        0
      ) {
        return null;
      }

      return (
        <section>

          <div
            style={{
              display:
                'flex',
              justifyContent:
                'space-between',
              alignItems:
                'flex-end',
              marginBottom:
                '1.5rem',
            }}
          >

            <div>

              <h2
                style={{
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '0.5rem',
                  fontSize:
                    '1.25rem',
                  color:
                    'var(--color-text)',
                  marginBottom:
                    '0.25rem',
                }}
              >

                <div
                  style={{
                    width:
                      '12px',
                    height:
                      '12px',
                    borderRadius:
                      '50%',
                    background:
                      color,
                  }}
                />

                {title}

              </h2>

              <p
                style={{
                  color:
                    'var(--color-text-muted)',
                  fontSize:
                    '0.9rem',
                }}
              >
                {description}
              </p>

            </div>

          </div>


          <div
            style={{
              display:
                'flex',
              flexDirection:
                'column',
              gap:
                '1.5rem',
            }}
          >

            {tripsToRender.map(
              renderTripCard
            )}

          </div>

        </section>
      );
    };

  // =========================================================
  // MAIN RETURN
  // =========================================================

  return (
    <div
      style={{
        background:
          'var(--color-bg)',
        minHeight:
          '100vh',
        paddingBottom:
          '4rem',
      }}
    >

      {/* =====================================================
          HEADER BANNER
          ===================================================== */}

      <section
        style={{
          position:
            'relative',
          height:
            '240px',
          backgroundImage:
            'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2800&q=80")',
          backgroundSize:
            'cover',
          backgroundPosition:
            'center 20%',
          padding:
            '3rem 4rem',
          display:
            'flex',
          flexDirection:
            'column',
          justifyContent:
            'center',
        }}
      >

        <div
          style={{
            position:
              'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'linear-gradient(to right, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.4) 100%)',
          }}
        />


        <div
          style={{
            position:
              'relative',
            zIndex: 10,
            display:
              'flex',
            justifyContent:
              'space-between',
            alignItems:
              'flex-start',
          }}
        >

          <div>

            <h1
              style={{
                fontSize:
                  '3rem',
                fontWeight:
                  '800',
                color:
                  '#1e293b',
                marginBottom:
                  '0.5rem',
                letterSpacing:
                  '-0.02em',
              }}
            >
              My Trips
            </h1>

            <p
              style={{
                fontSize:
                  '1.1rem',
                color:
                  'var(--color-text-muted)',
              }}
            >
              Manage, explore,
              and revisit your
              travel adventures.
            </p>

          </div>


          <div
            style={{
              display:
                'flex',
              alignItems:
                'center',
              gap:
                '2rem',
            }}
          >

            <div
              style={{
                transform:
                  'rotate(-5deg)',
                color:
                  '#94a3b8',
                fontFamily:
                  '"Comic Sans MS", cursive, sans-serif',
                fontSize:
                  '1.2rem',
                opacity:
                  0.8,
                display:
                  'flex',
                alignItems:
                  'center',
                gap:
                  '1rem',
              }}
            >

              <Plane
                size={24}
                style={{
                  transform:
                    'rotate(45deg)',
                }}
              />

              <div>
                Collect
                <br />
                Moments
                <br />
                Not Things
              </div>

            </div>


            <Link
              to="/create-trip"
              style={{
                display:
                  'flex',
                alignItems:
                  'center',
                gap:
                  '0.5rem',
                background:
                  '#1d4ed8',
                color:
                  'white',
                padding:
                  '0.75rem 1.5rem',
                borderRadius:
                  '0.5rem',
                fontWeight:
                  '600',
                textDecoration:
                  'none',
                boxShadow:
                  '0 4px 6px rgba(29, 78, 216, 0.2)',
              }}
            >
              <Plus
                size={18}
              />
              Plan New Trip
            </Link>

          </div>

        </div>

      </section>


      <div
        style={{
          padding:
            '0 4rem',
        }}
      >

        {/* ===================================================
            FILTER BAR
            =================================================== */}

        <div
          style={{
            background:
              'white',
            borderRadius:
              '1rem',
            padding:
              '1rem 1.5rem',
            display:
              'flex',
            alignItems:
              'center',
            gap:
              '1rem',
            boxShadow:
              '0 4px 6px -1px rgba(0,0,0,0.05)',
            marginTop:
              '-2rem',
            position:
              'relative',
            zIndex:
              20,
          }}
        >

          <div
            style={{
              display:
                'flex',
              alignItems:
                'center',
              gap:
                '0.75rem',
              flex: 1,
            }}
          >

            <Search
              size={20}
              color="var(--color-text-muted)"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={e =>
                setSearchQuery(
                  e.target.value
                )
              }
              placeholder="Search trips or destinations..."
              style={{
                border:
                  'none',
                outline:
                  'none',
                width:
                  '100%',
                fontSize:
                  '1rem',
                color:
                  'var(--color-text)',
              }}
            />

          </div>


          {/* STATUS */}

          <div
            style={{
              display:
                'flex',
              flexDirection:
                'column',
              padding:
                '0.5rem 1rem',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '0.5rem',
              minWidth:
                '150px',
            }}
          >

            <span
              style={{
                fontSize:
                  '0.7rem',
                color:
                  'var(--color-text-muted)',
                fontWeight:
                  '600',
              }}
            >
              Filter
            </span>

            <select
              value={
                statusFilter
              }
              onChange={e =>
                setStatusFilter(
                  e.target.value
                )
              }
              style={{
                border:
                  'none',
                outline:
                  'none',
                background:
                  'white',
                fontWeight:
                  '600',
                color:
                  'var(--color-text)',
                cursor:
                  'pointer',
              }}
            >
              <option value="all">
                All Trips
              </option>

              <option value="ongoing">
                Ongoing
              </option>

              <option value="upcoming">
                Upcoming
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

          </div>


          {/* GROUP */}

          <div
            style={{
              display:
                'flex',
              flexDirection:
                'column',
              padding:
                '0.5rem 1rem',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '0.5rem',
              minWidth:
                '150px',
            }}
          >

            <span
              style={{
                fontSize:
                  '0.7rem',
                color:
                  'var(--color-text-muted)',
                fontWeight:
                  '600',
              }}
            >
              Group by
            </span>

            <div
              style={{
                fontWeight:
                  '600',
                color:
                  'var(--color-text)',
                fontSize:
                  '0.9rem',
              }}
            >
              Status
            </div>

          </div>


          {/* SORT */}

          <div
            style={{
              display:
                'flex',
              flexDirection:
                'column',
              padding:
                '0.5rem 1rem',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '0.5rem',
              minWidth:
                '150px',
            }}
          >

            <span
              style={{
                fontSize:
                  '0.7rem',
                color:
                  'var(--color-text-muted)',
                fontWeight:
                  '600',
              }}
            >
              Sort by
            </span>

            <select
              value={sortBy}
              onChange={e =>
                setSortBy(
                  e.target.value
                )
              }
              style={{
                border:
                  'none',
                outline:
                  'none',
                background:
                  'white',
                fontWeight:
                  '600',
                color:
                  'var(--color-text)',
                cursor:
                  'pointer',
              }}
            >

              <option value="latest">
                Latest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="start-date">
                Start Date
              </option>

              <option value="budget-high">
                Budget: High
              </option>

              <option value="budget-low">
                Budget: Low
              </option>

            </select>

          </div>

        </div>


        {/* ===================================================
            TRIP SECTIONS
            =================================================== */}

        <div
          style={{
            marginTop:
              '3rem',
            display:
              'flex',
            flexDirection:
              'column',
            gap:
              '3rem',
          }}
        >

          {renderSection(
            'Ongoing Trips',
            'Your current adventures. Keep exploring!',
            ongoingTrips,
            '#10b981'
          )}

          {renderSection(
            'Upcoming Trips',
            'Your upcoming adventures. Great things ahead!',
            upcomingTrips,
            '#3b82f6'
          )}

          {renderSection(
            'Completed Trips',
            'Past adventures. Amazing memories!',
            completedTrips,
            '#94a3b8'
          )}


          {/* =================================================
              EMPTY SEARCH / FILTER STATE
              ================================================= */}

          {filteredTrips.length ===
            0 && (

            <div
              style={{
                border:
                  '2px dashed var(--color-border)',
                borderRadius:
                  '1rem',
                padding:
                  '3rem',
                display:
                  'flex',
                flexDirection:
                  'column',
                justifyContent:
                  'center',
                alignItems:
                  'center',
                background:
                  '#f8fafc',
                marginTop:
                  '1rem',
                textAlign:
                  'center',
              }}
            >

              <div
                style={{
                  background:
                    '#e0f2fe',
                  borderRadius:
                    '50%',
                  width:
                    '80px',
                  height:
                    '80px',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                  marginBottom:
                    '1rem',
                }}
              >
                <Map
                  size={40}
                  color="#0ea5e9"
                />
              </div>


              <h3
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '700',
                  color:
                    '#0f172a',
                  marginBottom:
                    '0.25rem',
                }}
              >
                {trips.length ===
                0
                  ? 'No trips yet!'
                  : 'No trips found'}
              </h3>


              <p
                style={{
                  color:
                    'var(--color-text-muted)',
                  fontSize:
                    '0.9rem',
                  marginBottom:
                    '1.25rem',
                }}
              >
                {trips.length ===
                0
                  ? 'Start planning a new adventure and add it to your list.'
                  : 'Try changing your search or filter.'}
              </p>


              {trips.length ===
                0 && (

                <Link
                  to="/create-trip"
                  style={{
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap:
                      '0.5rem',
                    background:
                      'white',
                    color:
                      '#1d4ed8',
                    border:
                      '1px solid #bfdbfe',
                    padding:
                      '0.75rem 1.5rem',
                    borderRadius:
                      '0.5rem',
                    fontWeight:
                      '600',
                    textDecoration:
                      'none',
                  }}
                >
                  <Plus
                    size={18}
                  />
                  Plan a Trip
                </Link>

              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default MyTrips;