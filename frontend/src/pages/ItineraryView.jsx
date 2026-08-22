import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Search,
  ChevronDown,
  List,
  Calendar as CalendarIcon,
  MapPin,
  Edit2,
  Share2,
  Plus,
  Download,
  ChevronUp,
  MoreVertical,
  Train,
  Wallet,
  Map,
  Hotel,
  Clock,
  Utensils,
  Loader2,
} from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000';


// ============================================================
// ITINERARY VIEW
// ============================================================

const ItineraryView = () => {

  const { trip_id, id } = useParams();

  const navigate = useNavigate();

  const tripId = trip_id || id;


  // ==========================================================
  // STATE
  // ==========================================================

  const [trip, setTrip] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const [searchQuery, setSearchQuery] =
    useState('');

  const [filter, setFilter] =
    useState('all');

  const [sortBy, setSortBy] =
    useState('time');

  const [groupBy, setGroupBy] =
    useState('day');

  const [activeView, setActiveView] =
    useState('list');

  const [expandedDays, setExpandedDays] =
    useState({
      1: true,
      2: false,
      3: false,
    });

  const [openActivityMenu, setOpenActivityMenu] =
    useState(null);


  // ==========================================================
  // FETCH TRIP
  // ==========================================================

  useEffect(() => {

    if (!tripId) {
      setError('Trip ID is missing.');
      setLoading(false);
      return;
    }

    fetchTrip();

  }, [tripId]);


  const fetchTrip = async () => {

    try {

      setLoading(true);
      setError('');

      const token =
        localStorage.getItem('access_token') ||
        localStorage.getItem('access');

      const response = await fetch(
        `${API_BASE_URL}/api/trips/${tripId}/`,
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


      if (response.status === 404) {

        setError(
          'Trip not found.'
        );

        return;
      }


      if (!response.ok) {

        throw new Error(
          'Failed to load trip.'
        );
      }


      const data =
        await response.json();

      setTrip(data);

    } catch (err) {

      console.error(
        'Failed to load trip:',
        err
      );

      setError(
        'Unable to load this trip.'
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // DATE HELPERS
  // ==========================================================

  const parseDate = date => {

    if (!date) {
      return null;
    }

    const parsed =
      new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return null;
    }

    return parsed;
  };


  const formatDate = date => {

    const parsed =
      parseDate(date);

    if (!parsed) {
      return 'Date not set';
    }

    return parsed.toLocaleDateString(
      'en-US',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    );
  };


  const getDuration = () => {

    if (
      !trip?.start_date ||
      !trip?.end_date
    ) {
      return {
        days: 0,
        nights: 0,
      };
    }

    const start =
      parseDate(
        trip.start_date
      );

    const end =
      parseDate(
        trip.end_date
      );

    if (!start || !end) {
      return {
        days: 0,
        nights: 0,
      };
    }

    const difference =
      end.getTime() -
      start.getTime();

    const nights =
      Math.max(
        0,
        Math.round(
          difference /
            (1000 *
              60 *
              60 *
              24)
        )
      );

    return {
      days:
        nights + 1,
      nights,
    };

  };


  const duration =
    getDuration();


  // ==========================================================
  // IMAGE
  // ==========================================================

  const getTripImage = () => {

    if (trip?.cover_image) {
      return trip.cover_image;
    }

    const destination =
      (
        trip?.destination ||
        ''
      ).toLowerCase();


    if (
      destination.includes('japan') ||
      destination.includes('tokyo')
    ) {

      return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80';

    }


    if (
      destination.includes('bali') ||
      destination.includes('indonesia')
    ) {

      return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80';

    }


    if (
      destination.includes('paris') ||
      destination.includes('france')
    ) {

      return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80';

    }


    if (
      destination.includes('rome') ||
      destination.includes('italy')
    ) {

      return 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80';

    }


    return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80';

  };


  // ==========================================================
  // DESTINATION
  // ==========================================================

  const destination =
    trip?.destination ||
    'Destination not set';


  // ==========================================================
  // SAMPLE ITINERARY
  //
  // This remains hardcoded for now.
  // Later this can be connected to an Activity model/API.
  // ==========================================================

  const [activities, setActivities] =
    useState([
      {
        id: 1,
        day: 1,
        time: '09:00',
        period: 'AM',
        title: 'Visit Senso-ji Temple',
        location: 'Tokyo, Japan',
        category: 'Sightseeing',
        duration: '2 hrs',
        cost: 0,
        image:
          'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80',
      },

      {
        id: 2,
        day: 1,
        time: '12:00',
        period: 'PM',
        title: 'Tokyo Skytree',
        location: 'Tokyo, Japan',
        category: 'Sightseeing',
        duration: '2 hrs',
        cost: 1800,
        image:
          'https://images.unsplash.com/photo-1513407030348-c1f4e1780e1c?auto=format&fit=crop&w=300&q=80',
      },

      {
        id: 3,
        day: 1,
        time: '03:00',
        period: 'PM',
        title: 'Lunch at Shibuya',
        location: 'Tokyo, Japan',
        category: 'Food',
        duration: '1.5 hrs',
        cost: 1800,
        image:
          'https://images.unsplash.com/photo-1542051812-667104b281f6?auto=format&fit=crop&w=300&q=80',
      },
    ]);


  // ==========================================================
  // FILTER ACTIVITIES
  // ==========================================================

  const filteredActivities =
    useMemo(() => {

      let result =
        [...activities];


      // SEARCH

      const query =
        searchQuery
          .trim()
          .toLowerCase();


      if (query) {

        result =
          result.filter(
            activity =>
              activity.title
                .toLowerCase()
                .includes(query) ||

              activity.location
                .toLowerCase()
                .includes(query) ||

              activity.category
                .toLowerCase()
                .includes(query)
          );

      }


      // FILTER

      if (
        filter !== 'all'
      ) {

        result =
          result.filter(
            activity =>
              activity.category
                .toLowerCase() ===
              filter
                .toLowerCase()
          );

      }


      // SORT

      if (
        sortBy === 'time'
      ) {

        result.sort(
          (a, b) => {

            const aTime =
              convertTimeToMinutes(
                a.time,
                a.period
              );

            const bTime =
              convertTimeToMinutes(
                b.time,
                b.period
              );

            return (
              aTime - bTime
            );

          }
        );

      }


      if (
        sortBy === 'cost-high'
      ) {

        result.sort(
          (a, b) =>
            b.cost - a.cost
        );

      }


      if (
        sortBy === 'cost-low'
      ) {

        result.sort(
          (a, b) =>
            a.cost - b.cost
        );

      }


      return result;

    }, [
      activities,
      searchQuery,
      filter,
      sortBy,
    ]);


  // ==========================================================
  // TIME CONVERTER
  // ==========================================================

  function convertTimeToMinutes(
    time,
    period
  ) {

    if (!time) {
      return 0;
    }

    const parts =
      time.split(':');

    let hour =
      Number(parts[0]);

    const minute =
      Number(parts[1] || 0);


    if (
      period === 'PM' &&
      hour !== 12
    ) {
      hour += 12;
    }


    if (
      period === 'AM' &&
      hour === 12
    ) {
      hour = 0;
    }


    return (
      hour * 60 +
      minute
    );

  }


  // ==========================================================
  // DAYS
  // ==========================================================

  const itineraryDays =
    useMemo(() => {

      const days = {};


      activities.forEach(
        activity => {

          if (!days[activity.day]) {

            days[activity.day] =
              [];

          }

          days[
            activity.day
          ].push(activity);

        }
      );


      return days;

    }, [activities]);


  // ==========================================================
  // DAY DATE
  // ==========================================================

  const getDayDate =
    dayNumber => {

      if (!trip?.start_date) {
        return '';
      }

      const date =
        parseDate(
          trip.start_date
        );

      if (!date) {
        return '';
      }

      date.setDate(
        date.getDate() +
          dayNumber -
          1
      );

      return formatDate(
        date
      );

    };


  // ==========================================================
  // DAY TOTAL
  // ==========================================================

  const getDayTotal =
    dayNumber => {

      return activities
        .filter(
          activity =>
            activity.day ===
            dayNumber
        )
        .reduce(
          (total, activity) =>
            total +
            Number(
              activity.cost ||
                0
            ),
          0
        );

    };


  // ==========================================================
  // TOTAL ACTIVITY COST
  // ==========================================================

  const totalActivityCost =
    activities.reduce(
      (total, activity) =>
        total +
        Number(
          activity.cost || 0
        ),
      0
    );


  // ==========================================================
  // DELETE ACTIVITY
  // ==========================================================

  const deleteActivity =
    activityId => {

      setActivities(
        previous =>
          previous.filter(
            activity =>
              activity.id !==
              activityId
          )
      );

      setOpenActivityMenu(
        null
      );

    };


  // ==========================================================
  // ADD ACTIVITY
  // ==========================================================

  const addActivity = () => {

    const newActivity = {

      id:
        Date.now(),

      day: 1,

      time: '05:00',

      period: 'PM',

      title:
        'New Activity',

      location:
        destination,

      category:
        'Sightseeing',

      duration:
        '1 hr',

      cost:
        0,

      image:
        getTripImage(),

    };


    setActivities(
      previous => [
        ...previous,
        newActivity,
      ]
    );

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <div
        style={{
          minHeight:
            '100vh',
          background:
            '#f8fafc',
          display:
            'flex',
          flexDirection:
            'column',
          alignItems:
            'center',
          justifyContent:
            'center',
          gap:
            '1rem',
        }}
      >

        <Loader2
          size={36}
          color="#1d4ed8"
          style={{
            animation:
              'spin 1s linear infinite',
          }}
        />

        <p
          style={{
            color:
              'var(--color-text-muted)',
          }}
        >
          Loading itinerary...
        </p>

      </div>
    );

  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {

    return (
      <div
        style={{
          minHeight:
            '100vh',
          background:
            '#f8fafc',
          display:
            'flex',
          flexDirection:
            'column',
          alignItems:
            'center',
          justifyContent:
            'center',
          gap:
            '1rem',
        }}
      >

        <h2>
          Unable to load itinerary
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
          onClick={() =>
            navigate(
              '/my-trips'
            )
          }
          style={{
            background:
              '#1d4ed8',
            color:
              'white',
            border:
              'none',
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
          Back to My Trips
        </button>

      </div>
    );

  }


  // ==========================================================
  // MAIN
  // ==========================================================

  return (

    <div
      style={{
        background:
          '#f8fafc',
        minHeight:
          '100vh',
        padding:
          '2rem 4rem 4rem 4rem',
        fontFamily:
          'var(--font-body)',
      }}
    >


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div
        style={{
          background:
            'white',
          borderRadius:
            '1rem',
          border:
            '1px solid var(--color-border)',
          display:
            'flex',
          padding:
            '1.5rem',
          gap:
            '2rem',
          marginBottom:
            '1.5rem',
          boxShadow:
            '0 4px 6px -1px rgba(0,0,0,0.02)',
        }}
      >

        {/* IMAGE */}

        <div
          style={{
            width:
              '220px',
            height:
              '140px',
            borderRadius:
              '0.75rem',
            overflow:
              'hidden',
            flexShrink:
              0,
          }}
        >

          <img
            src={getTripImage()}
            alt={
              destination
            }
            style={{
              width:
                '100%',
              height:
                '100%',
              objectFit:
                'cover',
            }}
            onError={e => {

              e.currentTarget.src =
                'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80';

            }}
          />

        </div>


        {/* TRIP INFO */}

        <div
          style={{
            display:
              'flex',
            flexDirection:
              'column',
            flex: 1,
          }}
        >

          <div
            style={{
              display:
                'flex',
              justifyContent:
                'space-between',
              alignItems:
                'flex-start',
              flex: 1,
            }}
          >

            <div>

              <h1
                style={{
                  fontSize:
                    '2rem',
                  fontWeight:
                    '800',
                  color:
                    'var(--color-text)',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '0.5rem',
                  marginBottom:
                    '0.5rem',
                }}
              >

                {
                  trip?.title ||
                  'My Trip'
                }

                <Edit2
                  size={18}
                  color="var(--color-text-muted)"
                  style={{
                    cursor:
                      'pointer',
                  }}
                  onClick={() =>
                    navigate(
                      `/trips/${tripId}/edit`
                    )
                  }
                />

              </h1>


              <div
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '600',
                  color:
                    '#334155',
                  marginBottom:
                    '1rem',
                }}
              >

                {destination}

              </div>


              <div
                style={{
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '1rem',
                }}
              >

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
                  }}
                >

                  <CalendarIcon
                    size={16}
                  />

                  {formatDate(
                    trip?.start_date
                  )}

                  <span>
                    –
                  </span>

                  {formatDate(
                    trip?.end_date
                  )}

                </div>


                <div
                  style={{
                    background:
                      '#f1f5f9',
                    padding:
                      '0.25rem 0.75rem',
                    borderRadius:
                      '0.5rem',
                    fontSize:
                      '0.8rem',
                    fontWeight:
                      '600',
                    color:
                      '#475569',
                  }}
                >

                  {
                    duration.days
                  }

                  {' Days / '}

                  {
                    duration.nights
                  }

                  {' Nights'}

                </div>

              </div>

            </div>


            {/* HEADER BUTTONS */}

            <div
              style={{
                display:
                  'flex',
                flexDirection:
                  'column',
                gap:
                  '0.75rem',
              }}
            >

              <button
                onClick={() =>
                  navigate(
                    `/trips/${tripId}/edit`
                  )
                }
                style={{
                  background:
                    'white',
                  border:
                    '1px solid #cbd5e1',
                  color:
                    '#1d4ed8',
                  padding:
                    '0.5rem 1.25rem',
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
                  justifyContent:
                    'center',
                }}
              >

                <Edit2
                  size={16}
                />

                Edit Trip

              </button>


              <button
                onClick={() => {

                  if (
                    navigator.share
                  ) {

                    navigator.share({
                      title:
                        trip?.title ||
                        'My Trip',
                      text:
                        `Check out my trip to ${destination}`,
                    });

                  } else {

                    navigator.clipboard.writeText(
                      window.location.href
                    );

                    alert(
                      'Trip link copied!'
                    );

                  }

                }}
                style={{
                  background:
                    'white',
                  border:
                    '1px solid #cbd5e1',
                  color:
                    '#1d4ed8',
                  padding:
                    '0.5rem 1.25rem',
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
                  justifyContent:
                    'center',
                }}
              >

                <Share2
                  size={16}
                />

                Share Trip

              </button>

            </div>

          </div>

        </div>


        {/* BUDGET */}

        <div
          style={{
            width:
              '300px',
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
              fontSize:
                '0.85rem',
              fontWeight:
                '600',
              color:
                'var(--color-text-muted)',
              marginBottom:
                '0.25rem',
            }}
          >
            Estimated Budget
          </div>


          <div
            style={{
              fontSize:
                '2rem',
              fontWeight:
                '800',
              color:
                'var(--color-text)',
              marginBottom:
                '1rem',
            }}
          >

            ₹
            {Number(
              trip?.total_budget ||
                0
            ).toLocaleString(
              'en-IN'
            )}

          </div>


          <div
            style={{
              width:
                '100%',
              height:
                '8px',
              background:
                '#e2e8f0',
              borderRadius:
                '4px',
              marginBottom:
                '1rem',
              overflow:
                'hidden',
            }}
          >

            <div
              style={{
                width:
                  '70%',
                height:
                  '100%',
                background:
                  '#10b981',
                borderRadius:
                  '4px',
              }}
            />

          </div>


          <div
            style={{
              display:
                'flex',
              justifyContent:
                'space-between',
            }}
          >

            <div>

              <div
                style={{
                  fontSize:
                    '0.75rem',
                  color:
                    'var(--color-text-muted)',
                }}
              >
                Activities
              </div>

              <div
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '700',
                  color:
                    '#3b82f6',
                }}
              >

                ₹
                {totalActivityCost.toLocaleString(
                  'en-IN'
                )}

              </div>

            </div>


            <div
              style={{
                color:
                  'var(--color-border)',
              }}
            >
              -
            </div>


            <div
              style={{
                textAlign:
                  'right',
              }}
            >

              <div
                style={{
                  fontSize:
                    '0.75rem',
                  color:
                    'var(--color-text-muted)',
                }}
              >
                Remaining
              </div>

              <div
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '700',
                  color:
                    '#10b981',
                }}
              >

                ₹
                {Math.max(
                  0,
                  Number(
                    trip?.total_budget ||
                      0
                  ) -
                    totalActivityCost
                ).toLocaleString(
                  'en-IN'
                )}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          TOOLBAR
          ===================================================== */}

      <div
        style={{
          display:
            'flex',
          justifyContent:
            'space-between',
          alignItems:
            'center',
          marginBottom:
            '2rem',
        }}
      >

        {/* SEARCH */}

        <div
          style={{
            position:
              'relative',
            width:
              '350px',
          }}
        >

          <Search
            size={18}
            color="var(--color-text-muted)"
            style={{
              position:
                'absolute',
              left:
                '1rem',
              top:
                '50%',
              transform:
                'translateY(-50%)',
            }}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={e =>
              setSearchQuery(
                e.target.value
              )
            }
            placeholder="Search activities, cities or expenses..."
            style={{
              width:
                '100%',
              padding:
                '0.75rem 1rem 0.75rem 2.5rem',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '2rem',
              outline:
                'none',
              fontSize:
                '0.95rem',
            }}
          />

        </div>


        <div
          style={{
            display:
              'flex',
            gap:
              '1rem',
          }}
        >

          {/* GROUP */}

          <div
            style={{
              display:
                'flex',
              alignItems:
                'center',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '0.5rem',
              background:
                'white',
            }}
          >

            <div
              style={{
                padding:
                  '0.25rem 0.75rem',
                display:
                  'flex',
                flexDirection:
                  'column',
              }}
            >

              <span
                style={{
                  fontSize:
                    '0.65rem',
                  color:
                    'var(--color-text-muted)',
                  fontWeight:
                    '600',
                }}
              >
                Group by
              </span>

              <select
                value={
                  groupBy
                }
                onChange={e =>
                  setGroupBy(
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
                  fontSize:
                    '0.9rem',
                  fontWeight:
                    '600',
                  color:
                    'var(--color-text)',
                }}
              >

                <option value="day">
                  Day
                </option>

                <option value="category">
                  Category
                </option>

              </select>

            </div>

          </div>


          {/* FILTER */}

          <div
            style={{
              display:
                'flex',
              alignItems:
                'center',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '0.5rem',
              background:
                'white',
            }}
          >

            <div
              style={{
                padding:
                  '0.25rem 0.75rem',
                display:
                  'flex',
                flexDirection:
                  'column',
              }}
            >

              <span
                style={{
                  fontSize:
                    '0.65rem',
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
                  filter
                }
                onChange={e =>
                  setFilter(
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
                  fontSize:
                    '0.9rem',
                  fontWeight:
                    '600',
                  color:
                    'var(--color-text)',
                }}
              >

                <option value="all">
                  All
                </option>

                <option value="sightseeing">
                  Sightseeing
                </option>

                <option value="food">
                  Food
                </option>

              </select>

            </div>

          </div>


          {/* SORT */}

          <div
            style={{
              display:
                'flex',
              alignItems:
                'center',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '0.5rem',
              background:
                'white',
            }}
          >

            <div
              style={{
                padding:
                  '0.25rem 0.75rem',
                display:
                  'flex',
                flexDirection:
                  'column',
              }}
            >

              <span
                style={{
                  fontSize:
                    '0.65rem',
                  color:
                    'var(--color-text-muted)',
                  fontWeight:
                    '600',
                }}
              >
                Sort by
              </span>

              <select
                value={
                  sortBy
                }
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
                  fontSize:
                    '0.9rem',
                  fontWeight:
                    '600',
                  color:
                    'var(--color-text)',
                }}
              >

                <option value="time">
                  Time
                </option>

                <option value="cost-high">
                  Cost: High
                </option>

                <option value="cost-low">
                  Cost: Low
                </option>

              </select>

            </div>

          </div>


          {/* VIEW */}

          <div
            style={{
              display:
                'flex',
              background:
                'white',
              border:
                '1px solid var(--color-border)',
              borderRadius:
                '0.5rem',
              overflow:
                'hidden',
            }}
          >

            <button
              onClick={() =>
                setActiveView(
                  'list'
                )
              }
              style={{
                display:
                  'flex',
                alignItems:
                  'center',
                gap:
                  '0.5rem',
                padding:
                  '0.5rem 1rem',
                background:
                  activeView ===
                  'list'
                    ? '#eff6ff'
                    : 'white',
                color:
                  activeView ===
                  'list'
                    ? '#1d4ed8'
                    : 'var(--color-text-muted)',
                border:
                  'none',
                fontWeight:
                  '600',
                cursor:
                  'pointer',
              }}
            >

              <List
                size={16}
              />

              List

            </button>


            <button
              onClick={() =>
                setActiveView(
                  'calendar'
                )
              }
              style={{
                display:
                  'flex',
                alignItems:
                  'center',
                gap:
                  '0.5rem',
                padding:
                  '0.5rem 1rem',
                background:
                  activeView ===
                  'calendar'
                    ? '#eff6ff'
                    : 'white',
                color:
                  activeView ===
                  'calendar'
                    ? '#1d4ed8'
                    : 'var(--color-text-muted)',
                border:
                  'none',
                borderLeft:
                  '1px solid var(--color-border)',
                fontWeight:
                  '500',
                cursor:
                  'pointer',
              }}
            >

              <CalendarIcon
                size={16}
              />

              Calendar

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          CALENDAR PLACEHOLDER
          ===================================================== */}

      {activeView ===
        'calendar' && (

        <div
          style={{
            background:
              'white',
            border:
              '1px solid var(--color-border)',
            borderRadius:
              '1rem',
            padding:
              '3rem',
            marginBottom:
              '2rem',
            textAlign:
              'center',
          }}
        >

          <CalendarIcon
            size={48}
            color="#1d4ed8"
            style={{
              marginBottom:
                '1rem',
            }}
          />

          <h2>
            Calendar View
          </h2>

          <p
            style={{
              color:
                'var(--color-text-muted)',
            }}
          >
            Your itinerary calendar
            will appear here.
          </p>

          <button
            onClick={() =>
              setActiveView(
                'list'
              )
            }
            style={{
              marginTop:
                '1rem',
              background:
                '#1d4ed8',
              color:
                'white',
              border:
                'none',
              padding:
                '0.75rem 1.5rem',
              borderRadius:
                '0.5rem',
              cursor:
                'pointer',
              fontWeight:
                '600',
            }}
          >
            Back to List
          </button>

        </div>

      )}


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      {activeView ===
        'list' && (

        <div
          style={{
            display:
              'flex',
            gap:
              '2.5rem',
            alignItems:
              'flex-start',
          }}
        >


          {/* =================================================
              LEFT COLUMN
              ================================================= */}

          <div
            style={{
              flex: 1,
              display:
                'flex',
              flexDirection:
                'column',
              gap:
                '2rem',
            }}
          >

            {Object.keys(
              itineraryDays
            )
              .map(Number)
              .sort(
                (a, b) =>
                  a - b
              )
              .map(dayNumber => {

                const dayActivities =
                  filteredActivities.filter(
                    activity =>
                      activity.day ===
                      dayNumber
                  );


                if (
                  dayActivities.length ===
                  0
                ) {
                  return null;
                }


                const expanded =
                  expandedDays[
                    dayNumber
                  ];


                return (

                  <div
                    key={
                      dayNumber
                    }
                  >

                    {/* DAY HEADER */}

                    <div
                      style={{
                        display:
                          'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'center',
                        marginBottom:
                          expanded
                            ? '1.5rem'
                            : '0',
                        position:
                          'relative',
                        zIndex:
                          10,
                      }}
                    >

                      <div
                        style={{
                          display:
                            'flex',
                          alignItems:
                            'center',
                          gap:
                            '1rem',
                        }}
                      >

                        <div
                          style={{
                            width:
                              '40px',
                            height:
                              '40px',
                            borderRadius:
                              '50%',
                            background:
                              dayNumber ===
                              1
                                ? '#1d4ed8'
                                : dayNumber ===
                                  2
                                ? '#ef4444'
                                : '#10b981',
                            color:
                              'white',
                            display:
                              'flex',
                            alignItems:
                              'center',
                            justifyContent:
                              'center',
                            fontSize:
                              '1.2rem',
                            fontWeight:
                              '700',
                          }}
                        >
                          {
                            dayNumber
                          }
                        </div>


                        <div>

                          <h2
                            style={{
                              fontSize:
                                '1.25rem',
                              fontWeight:
                                '700',
                              color:
                                'var(--color-text)',
                            }}
                          >

                            Day{' '}
                            {
                              dayNumber
                            }

                            {' — '}

                            {
                              destination
                            }

                          </h2>


                          <div
                            style={{
                              fontSize:
                                '0.9rem',
                              color:
                                'var(--color-text-muted)',
                            }}
                          >
                            {
                              getDayDate(
                                dayNumber
                              )
                            }
                          </div>

                        </div>

                      </div>


                      <div
                        style={{
                          display:
                            'flex',
                          alignItems:
                            'center',
                          gap:
                            '1rem',
                        }}
                      >

                        <span
                          style={{
                            color:
                              'var(--color-text-muted)',
                            fontSize:
                              '0.9rem',
                          }}
                        >
                          Day Total
                        </span>

                        <span
                          style={{
                            color:
                              '#1d4ed8',
                            fontWeight:
                              '700',
                            fontSize:
                              '1.1rem',
                          }}
                        >

                          ₹
                          {getDayTotal(
                            dayNumber
                          ).toLocaleString(
                            'en-IN'
                          )}

                        </span>


                        <button
                          onClick={() =>
                            setExpandedDays(
                              previous => ({
                                ...previous,
                                [dayNumber]:
                                  !previous[
                                    dayNumber
                                  ],
                              })
                            )
                          }
                          style={{
                            border:
                              'none',
                            background:
                              'none',
                            cursor:
                              'pointer',
                            display:
                              'flex',
                          }}
                        >

                          {expanded ? (
                            <ChevronUp
                              size={20}
                              color="var(--color-text-muted)"
                            />
                          ) : (
                            <ChevronDown
                              size={20}
                              color="var(--color-text-muted)"
                            />
                          )}

                        </button>

                      </div>

                    </div>


                    {/* EVENTS */}

                    {expanded && (

                      <div
                        style={{
                          position:
                            'relative',
                          paddingLeft:
                            '60px',
                        }}
                      >

                        {/* TIMELINE */}

                        <div
                          style={{
                            position:
                              'absolute',
                            left:
                              '20px',
                            top:
                              '-10px',
                            bottom:
                              '0',
                            width:
                              '2px',
                            background:
                              '#e2e8f0',
                            zIndex:
                              0,
                          }}
                        />


                        <div
                          style={{
                            display:
                              'flex',
                            flexDirection:
                              'column',
                            gap:
                              '1rem',
                          }}
                        >

                          {dayActivities.map(
                            activity => (

                              <div
                                key={
                                  activity.id
                                }
                                style={{
                                  display:
                                    'flex',
                                  alignItems:
                                    'center',
                                  gap:
                                    '1.5rem',
                                  position:
                                    'relative',
                                }}
                              >

                                {/* DOT */}

                                <div
                                  style={{
                                    position:
                                      'absolute',
                                    left:
                                      '-44px',
                                    width:
                                      '10px',
                                    height:
                                      '10px',
                                    borderRadius:
                                      '50%',
                                    background:
                                      'white',
                                    border:
                                      '2px solid #1d4ed8',
                                    zIndex:
                                      10,
                                  }}
                                />


                                {/* TIME */}

                                <div
                                  style={{
                                    width:
                                      '60px',
                                    textAlign:
                                      'right',
                                    fontWeight:
                                      '700',
                                    fontSize:
                                      '0.9rem',
                                    color:
                                      '#1e293b',
                                  }}
                                >

                                  {
                                    activity.time
                                  }

                                  <br />

                                  <span
                                    style={{
                                      color:
                                        'var(--color-text-muted)',
                                      fontWeight:
                                        '500',
                                      fontSize:
                                        '0.75rem',
                                    }}
                                  >
                                    {
                                      activity.period
                                    }
                                  </span>

                                </div>


                                {/* CARD */}

                                <div
                                  style={{
                                    flex:
                                      1,
                                    background:
                                      'white',
                                    borderRadius:
                                      '1rem',
                                    border:
                                      '1px solid var(--color-border)',
                                    display:
                                      'flex',
                                    padding:
                                      '1rem',
                                    gap:
                                      '1rem',
                                    alignItems:
                                      'center',
                                    boxShadow:
                                      '0 2px 4px rgba(0,0,0,0.02)',
                                  }}
                                >

                                  <img
                                    src={
                                      activity.image
                                    }
                                    alt={
                                      activity.title
                                    }
                                    style={{
                                      width:
                                        '120px',
                                      height:
                                        '80px',
                                      borderRadius:
                                        '0.5rem',
                                      objectFit:
                                        'cover',
                                    }}
                                  />


                                  <div
                                    style={{
                                      flex:
                                        1,
                                    }}
                                  >

                                    <h4
                                      style={{
                                        fontSize:
                                          '1.1rem',
                                        fontWeight:
                                          '700',
                                        marginBottom:
                                          '0.25rem',
                                      }}
                                    >
                                      {
                                        activity.title
                                      }
                                    </h4>


                                    <div
                                      style={{
                                        fontSize:
                                          '0.8rem',
                                        color:
                                          'var(--color-text-muted)',
                                        display:
                                          'flex',
                                        alignItems:
                                          'center',
                                        gap:
                                          '0.25rem',
                                        marginBottom:
                                          '0.75rem',
                                      }}
                                    >

                                      <MapPin
                                        size={
                                          12
                                        }
                                      />

                                      {
                                        activity.location
                                      }

                                    </div>


                                    <div
                                      style={{
                                        display:
                                          'flex',
                                        gap:
                                          '1.5rem',
                                        fontSize:
                                          '0.8rem',
                                        color:
                                          '#64748b',
                                      }}
                                    >

                                      <span
                                        style={{
                                          background:
                                            activity.category ===
                                            'Food'
                                              ? '#fef3c7'
                                              : '#eff6ff',
                                          color:
                                            activity.category ===
                                            'Food'
                                              ? '#d97706'
                                              : '#2563eb',
                                          padding:
                                            '0.2rem 0.5rem',
                                          borderRadius:
                                            '1rem',
                                          fontWeight:
                                            '600',
                                        }}
                                      >
                                        {
                                          activity.category
                                        }
                                      </span>


                                      <span
                                        style={{
                                          display:
                                            'flex',
                                          alignItems:
                                            'center',
                                          gap:
                                            '0.25rem',
                                        }}
                                      >

                                        <Clock
                                          size={
                                            14
                                          }
                                        />

                                        {
                                          activity.duration
                                        }

                                      </span>


                                      <span
                                        style={{
                                          display:
                                            'flex',
                                          alignItems:
                                            'center',
                                          gap:
                                            '0.25rem',
                                        }}
                                      >

                                        <Wallet
                                          size={
                                            14
                                          }
                                        />

                                        ₹
                                        {
                                          Number(
                                            activity.cost ||
                                              0
                                          ).toLocaleString(
                                            'en-IN'
                                          )
                                        }

                                      </span>

                                    </div>

                                  </div>


                                  {/* RIGHT */}

                                  <div
                                    style={{
                                      display:
                                        'flex',
                                      flexDirection:
                                        'column',
                                      alignItems:
                                        'flex-end',
                                      justifyContent:
                                        'space-between',
                                      height:
                                        '80px',
                                      position:
                                        'relative',
                                    }}
                                  >

                                    <button
                                      onClick={() =>
                                        setOpenActivityMenu(
                                          openActivityMenu ===
                                            activity.id
                                            ? null
                                            : activity.id
                                        )
                                      }
                                      style={{
                                        border:
                                          'none',
                                        background:
                                          'none',
                                        padding:
                                          0,
                                        cursor:
                                          'pointer',
                                      }}
                                    >

                                      <MoreVertical
                                        size={
                                          20
                                        }
                                        color="var(--color-text-muted)"
                                      />

                                    </button>


                                    {openActivityMenu ===
                                      activity.id && (

                                      <div
                                        style={{
                                          position:
                                            'absolute',
                                          right:
                                            0,
                                          top:
                                            '25px',
                                          width:
                                            '130px',
                                          background:
                                            'white',
                                          border:
                                            '1px solid var(--color-border)',
                                          borderRadius:
                                            '0.5rem',
                                          boxShadow:
                                            '0 8px 20px rgba(0,0,0,0.12)',
                                          zIndex:
                                            50,
                                        }}
                                      >

                                        <button
                                          onClick={() =>
                                            deleteActivity(
                                              activity.id
                                            )
                                          }
                                          style={{
                                            width:
                                              '100%',
                                            border:
                                              'none',
                                            background:
                                              'white',
                                            color:
                                              '#dc2626',
                                            padding:
                                              '0.7rem',
                                            cursor:
                                              'pointer',
                                            textAlign:
                                              'left',
                                            fontWeight:
                                              '600',
                                          }}
                                        >
                                          Remove
                                        </button>

                                      </div>

                                    )}


                                    <div
                                      style={{
                                        background:
                                          '#f8fafc',
                                        padding:
                                          '0.5rem',
                                        borderRadius:
                                          '0.5rem',
                                        display:
                                          'flex',
                                        alignItems:
                                          'center',
                                        gap:
                                          '0.5rem',
                                      }}
                                    >

                                      <div
                                        style={{
                                          background:
                                            '#fef2f2',
                                          padding:
                                            '0.2rem',
                                          borderRadius:
                                            '0.25rem',
                                          color:
                                            '#ef4444',
                                        }}
                                      >

                                        {activity.category ===
                                        'Food' ? (
                                          <Utensils
                                            size={
                                              14
                                            }
                                          />
                                        ) : (
                                          <MapPin
                                            size={
                                              14
                                            }
                                          />
                                        )}

                                      </div>


                                      <div>

                                        <div
                                          style={{
                                            fontSize:
                                              '0.7rem',
                                            fontWeight:
                                              '600',
                                            color:
                                              '#64748b',
                                          }}
                                        >
                                          {
                                            activity.category
                                          }
                                        </div>

                                        <div
                                          style={{
                                            fontSize:
                                              '0.9rem',
                                            fontWeight:
                                              '700',
                                            color:
                                              '#0f172a',
                                          }}
                                        >

                                          ₹
                                          {
                                            Number(
                                              activity.cost ||
                                                0
                                            ).toLocaleString(
                                              'en-IN'
                                            )
                                          }

                                        </div>

                                      </div>

                                    </div>

                                  </div>

                                </div>

                              </div>

                            )
                          )}


                          {/* TRANSPORT */}

                          {dayNumber ===
                            1 && (

                            <div
                              style={{
                                display:
                                  'flex',
                                alignItems:
                                  'center',
                                gap:
                                  '1.5rem',
                                position:
                                  'relative',
                                marginTop:
                                  '1rem',
                              }}
                            >

                              <div
                                style={{
                                  width:
                                    '60px',
                                }}
                              />


                              <div
                                style={{
                                  flex:
                                    1,
                                  background:
                                    '#eff6ff',
                                  borderRadius:
                                    '0.75rem',
                                  border:
                                    '1px solid #bfdbfe',
                                  display:
                                    'flex',
                                  padding:
                                    '1.25rem 1.5rem',
                                  gap:
                                    '1rem',
                                  alignItems:
                                    'center',
                                  justifyContent:
                                    'space-between',
                                }}
                              >

                                <div
                                  style={{
                                    display:
                                      'flex',
                                    alignItems:
                                      'center',
                                    gap:
                                      '1rem',
                                  }}
                                >

                                  <div
                                    style={{
                                      background:
                                        'white',
                                      padding:
                                        '0.75rem',
                                      borderRadius:
                                        '0.5rem',
                                      color:
                                        '#1d4ed8',
                                      boxShadow:
                                        '0 2px 4px rgba(29, 78, 216, 0.1)',
                                    }}
                                  >

                                    <Train
                                      size={
                                        24
                                      }
                                    />

                                  </div>


                                  <div>

                                    <div
                                      style={{
                                        fontWeight:
                                          '700',
                                        color:
                                          '#1e3a8a',
                                        fontSize:
                                          '1rem',
                                      }}
                                    >
                                      Travel to next destination
                                    </div>

                                    <div
                                      style={{
                                        fontSize:
                                          '0.85rem',
                                        color:
                                          '#3b82f6',
                                      }}
                                    >
                                      Transport
                                    </div>

                                  </div>

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
                                      display:
                                        'flex',
                                      alignItems:
                                        'center',
                                      gap:
                                        '0.5rem',
                                      color:
                                        '#1e3a8a',
                                      fontWeight:
                                        '600',
                                      fontSize:
                                        '0.9rem',
                                    }}
                                  >

                                    <Clock
                                      size={
                                        16
                                      }
                                    />

                                    2h 15m

                                  </div>


                                  <div
                                    style={{
                                      fontWeight:
                                        '800',
                                      color:
                                        '#1d4ed8',
                                      fontSize:
                                        '1.2rem',
                                    }}
                                  >
                                    ₹4,500
                                  </div>

                                </div>

                              </div>

                            </div>

                          )}

                        </div>

                      </div>

                    )}

                  </div>

                );

              })}


            {/* NO RESULTS */}

            {filteredActivities.length ===
              0 && (

              <div
                style={{
                  background:
                    'white',
                  border:
                    '1px solid var(--color-border)',
                  borderRadius:
                    '1rem',
                  padding:
                    '3rem',
                  textAlign:
                    'center',
                }}
              >

                <Search
                  size={40}
                  color="#94a3b8"
                />

                <h3
                  style={{
                    marginTop:
                      '1rem',
                  }}
                >
                  No activities found
                </h3>

                <p
                  style={{
                    color:
                      'var(--color-text-muted)',
                  }}
                >
                  Try another search or filter.
                </p>

              </div>

            )}


            {/* ADD ACTIVITY */}

            <button
              onClick={
                addActivity
              }
              style={{
                alignSelf:
                  'center',
                marginTop:
                  '1rem',
                background:
                  'white',
                border:
                  '1px solid #cbd5e1',
                color:
                  '#1d4ed8',
                padding:
                  '0.75rem 2rem',
                borderRadius:
                  '2rem',
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
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.05)',
              }}
            >

              <Plus
                size={16}
              />

              Add Activity

            </button>

          </div>


          {/* =================================================
              RIGHT SIDEBAR
              ================================================= */}

          <div
            style={{
              width:
                '340px',
              flexShrink:
                0,
              display:
                'flex',
              flexDirection:
                'column',
              gap:
                '1.5rem',
            }}
          >

            {/* BUDGET */}

            <div
              style={{
                background:
                  'white',
                borderRadius:
                  '1rem',
                border:
                  '1px solid var(--color-border)',
                padding:
                  '1.5rem',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.02)',
              }}
            >

              <h3
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '700',
                  marginBottom:
                    '1.5rem',
                }}
              >
                Budget Overview
              </h3>


              <div
                style={{
                  display:
                    'flex',
                  justifyContent:
                    'center',
                  marginBottom:
                    '2rem',
                }}
              >

                <div
                  style={{
                    width:
                      '180px',
                    height:
                      '180px',
                    borderRadius:
                      '50%',
                    background:
                      'conic-gradient(#3b82f6 0% 25%, #10b981 25% 57%, #f59e0b 57% 77%, #ef4444 77% 93%, #94a3b8 93% 100%)',
                    display:
                      'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    position:
                      'relative',
                  }}
                >

                  <div
                    style={{
                      width:
                        '140px',
                      height:
                        '140px',
                      borderRadius:
                        '50%',
                      background:
                        'white',
                      display:
                        'flex',
                      flexDirection:
                        'column',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                    }}
                  >

                    <div
                      style={{
                        fontSize:
                          '1.5rem',
                        fontWeight:
                          '800',
                        color:
                          '#0f172a',
                      }}
                    >
                      ₹
                      {totalActivityCost.toLocaleString(
                        'en-IN'
                      )}
                    </div>

                    <div
                      style={{
                        fontSize:
                          '0.75rem',
                        color:
                          'var(--color-text-muted)',
                      }}
                    >
                      Activity Cost
                    </div>

                  </div>

                </div>

              </div>


              <div
                style={{
                  display:
                    'flex',
                  flexDirection:
                    'column',
                  gap:
                    '0.75rem',
                  fontSize:
                    '0.85rem',
                }}
              >

                <BudgetRow
                  label="Transport"
                  amount="₹22,000"
                  percent="25%"
                  color="#3b82f6"
                />

                <BudgetRow
                  label="Accommodation"
                  amount="₹28,000"
                  percent="32%"
                  color="#10b981"
                />

                <BudgetRow
                  label="Food"
                  amount="₹17,500"
                  percent="20%"
                  color="#f59e0b"
                />

                <BudgetRow
                  label="Activities"
                  amount={`₹${totalActivityCost.toLocaleString(
                    'en-IN'
                  )}`}
                  percent="16%"
                  color="#ef4444"
                />

                <BudgetRow
                  label="Other"
                  amount="₹5,500"
                  percent="7%"
                  color="#94a3b8"
                />

              </div>

            </div>


            {/* ROUTE */}

            <div
              style={{
                background:
                  'white',
                borderRadius:
                  '1rem',
                border:
                  '1px solid var(--color-border)',
                padding:
                  '1.5rem',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.02)',
              }}
            >

              <h3
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '700',
                  marginBottom:
                    '1rem',
                }}
              >
                Trip Route
              </h3>


              <div
                style={{
                  background:
                    '#f0fdf4',
                  borderRadius:
                    '0.5rem',
                  height:
                    '200px',
                  display:
                    'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                  overflow:
                    'hidden',
                  border:
                    '1px solid #dcfce7',
                  marginBottom:
                    '1rem',
                  position:
                    'relative',
                }}
              >

                <Map
                  size={70}
                  color="#1d4ed8"
                />

                <div
                  style={{
                    position:
                      'absolute',
                    bottom:
                      '1rem',
                    left:
                      '1rem',
                    background:
                      'white',
                    padding:
                      '0.5rem 0.75rem',
                    borderRadius:
                      '0.5rem',
                    fontSize:
                      '0.8rem',
                    fontWeight:
                      '600',
                  }}
                >
                  {destination}
                </div>

              </div>

            </div>


            {/* SUMMARY */}

            <div
              style={{
                background:
                  'white',
                borderRadius:
                  '1rem',
                border:
                  '1px solid var(--color-border)',
                padding:
                  '1.5rem',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.02)',
              }}
            >

              <h3
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '700',
                  marginBottom:
                    '1.25rem',
                }}
              >
                Trip Summary
              </h3>


              <div
                style={{
                  display:
                    'flex',
                  flexDirection:
                    'column',
                  gap:
                    '1rem',
                  fontSize:
                    '0.85rem',
                }}
              >

                <SummaryRow
                  icon={
                    <CalendarIcon
                      size={16}
                    />
                  }
                  label="Total Duration"
                  value={`${duration.days} Days / ${duration.nights} Nights`}
                />

                <SummaryRow
                  icon={
                    <MapPin
                      size={16}
                    />
                  }
                  label="Destination"
                  value={destination}
                />

                <SummaryRow
                  icon={
                    <Map
                      size={16}
                    />
                  }
                  label="Total Activities"
                  value={`${activities.length} Activities`}
                />

                <SummaryRow
                  icon={
                    <Wallet
                      size={16}
                    />
                  }
                  label="Currency"
                  value="INR (₹)"
                />

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div
              style={{
                background:
                  'white',
                borderRadius:
                  '1rem',
                border:
                  '1px solid var(--color-border)',
                padding:
                  '1.5rem',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.02)',
              }}
            >

              <h3
                style={{
                  fontSize:
                    '1.1rem',
                  fontWeight:
                    '700',
                  marginBottom:
                    '1.25rem',
                }}
              >
                Quick Actions
              </h3>


              <div
                style={{
                  display:
                    'flex',
                  flexDirection:
                    'column',
                  gap:
                    '0.75rem',
                }}
              >

                <QuickAction
                  icon={
                    <Plus
                      size={18}
                    />
                  }
                  text="Add Activity"
                  onClick={
                    addActivity
                  }
                />


                <QuickAction
                  icon={
                    <Wallet
                      size={18}
                    />
                  }
                  text="Add Expense"
                  onClick={() =>
                    alert(
                      'Expense feature will be connected next.'
                    )
                  }
                />


                <QuickAction
                  icon={
                    <Train
                      size={18}
                    />
                  }
                  text="Add Transport"
                  onClick={() =>
                    alert(
                      'Transport feature will be connected next.'
                    )
                  }
                />


                <QuickAction
                  icon={
                    <Hotel
                      size={18}
                    />
                  }
                  text="Add Accommodation"
                  onClick={() =>
                    alert(
                      'Accommodation feature will be connected next.'
                    )
                  }
                />


                <div
                  style={{
                    height:
                      '1px',
                    background:
                      'var(--color-border)',
                    margin:
                      '0.5rem 0',
                  }}
                />


                <button
                  onClick={() =>
                    window.print()
                  }
                  style={{
                    background:
                      'white',
                    border:
                      '1px solid #bfdbfe',
                    padding:
                      '0.75rem',
                    borderRadius:
                      '0.5rem',
                    display:
                      'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    gap:
                      '0.5rem',
                    fontWeight:
                      '600',
                    color:
                      '#1d4ed8',
                    cursor:
                      'pointer',
                    boxShadow:
                      '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >

                  <Download
                    size={18}
                  />

                  Download Itinerary

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};


// ============================================================
// BUDGET ROW
// ============================================================

const BudgetRow = ({
  label,
  amount,
  percent,
  color,
}) => {

  return (

    <div
      style={{
        display:
          'flex',
        justifyContent:
          'space-between',
        alignItems:
          'center',
      }}
    >

      <div
        style={{
          display:
            'flex',
          alignItems:
            'center',
          gap:
            '0.5rem',
          color:
            '#334155',
          fontWeight:
            '500',
        }}
      >

        <div
          style={{
            width:
              '10px',
            height:
              '10px',
            borderRadius:
              '50%',
            background:
              color,
          }}
        />

        {label}

      </div>


      <div
        style={{
          display:
            'flex',
          gap:
            '1rem',
          fontWeight:
            '600',
        }}
      >

        <span>
          {amount}
        </span>

        <span
          style={{
            color:
              'var(--color-text-muted)',
            width:
              '30px',
            textAlign:
              'right',
          }}
        >
          {percent}
        </span>

      </div>

    </div>

  );

};


// ============================================================
// SUMMARY ROW
// ============================================================

const SummaryRow = ({
  icon,
  label,
  value,
}) => {

  return (

    <div
      style={{
        display:
          'flex',
        justifyContent:
          'space-between',
        alignItems:
          'center',
      }}
    >

      <div
        style={{
          display:
            'flex',
          alignItems:
            'center',
          gap:
            '0.5rem',
          color:
            '#64748b',
        }}
      >

        {icon}

        {label}

      </div>


      <div
        style={{
          fontWeight:
            '600',
          color:
            '#0f172a',
          textAlign:
            'right',
        }}
      >

        {value}

      </div>

    </div>

  );

};


// ============================================================
// QUICK ACTION
// ============================================================

const QuickAction = ({
  icon,
  text,
  onClick,
}) => {

  return (

    <button
      onClick={onClick}
      style={{
        background:
          'white',
        border:
          '1px solid var(--color-border)',
        padding:
          '0.75rem',
        borderRadius:
          '0.5rem',
        display:
          'flex',
        alignItems:
          'center',
        gap:
          '0.75rem',
        fontWeight:
          '600',
        color:
          '#1e40af',
        cursor:
          'pointer',
      }}
    >

      {icon}

      {text}

    </button>

  );

};


export default ItineraryView;