import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Camera,
  Edit2,
  MapPin,
  Mail,
  Globe,
  Plane,
  Calendar,
  Briefcase,
  MoreVertical,
  Copy,
  ChevronRight,
  DollarSign,
  Loader2,
} from 'lucide-react';


const API_BASE_URL = 'http://127.0.0.1:8000';


const Profile = () => {

  const navigate = useNavigate();


  // =========================================================
  // STATE
  // =========================================================

  const [user, setUser] =
    useState(null);

  const [trips, setTrips] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');


  // =========================================================
  // LOAD PROFILE + TRIPS
  // =========================================================

  useEffect(() => {
    loadProfile();
  }, []);


  const loadProfile = async () => {

    try {

      setLoading(true);
      setError('');


      const token =
        localStorage.getItem('access_token') ||
        localStorage.getItem('access');


      // -----------------------------------------------------
      // USER PROFILE
      // -----------------------------------------------------

      let userData = null;


      try {

        const userResponse =
          await fetch(
            `${API_BASE_URL}/api/auth/profile/`,
            {
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


        if (userResponse.ok) {

          userData =
            await userResponse.json();

        }

      } catch (profileError) {

        console.log(
          'Profile endpoint unavailable:',
          profileError
        );

      }


      // -----------------------------------------------------
      // TRIPS
      // -----------------------------------------------------

      const tripResponse =
        await fetch(
          `${API_BASE_URL}/api/trips/`,
          {
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


      if (
        tripResponse.status ===
        401
      ) {

        setError(
          'Your session has expired. Please login again.'
        );

        return;
      }


      if (!tripResponse.ok) {

        throw new Error(
          'Failed to load trips.'
        );

      }


      const tripData =
        await tripResponse.json();


      // Django may return:
      //
      // [
      //   {...},
      //   {...}
      // ]
      //
      // OR
      //
      // {
      //   results: [...]
      // }

      const tripList =
        Array.isArray(tripData)
          ? tripData
          : tripData.results || [];


      setTrips(tripList);


      // -----------------------------------------------------
      // USER FALLBACK
      // -----------------------------------------------------

      if (userData) {

        setUser(userData);

      } else {

        setUser({
          first_name:
            localStorage.getItem(
              'first_name'
            ) || '',

          last_name:
            localStorage.getItem(
              'last_name'
            ) || '',

          username:
            localStorage.getItem(
              'username'
            ) || '',

          email:
            localStorage.getItem(
              'email'
            ) || '',

          location:
            '',
          
          bio:
            'Travel enthusiast • Exploring the world one city at a time',

          profile_picture:
            '',
        });

      }

    } catch (err) {

      console.error(
        'Profile loading error:',
        err
      );

      setError(
        'Unable to load your profile.'
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================================================
  // USER NAME
  // =========================================================

  const fullName =
    useMemo(() => {

      if (!user) {
        return 'Traveler';
      }


      const firstName =
        user.first_name ||
        user.firstName ||
        '';


      const lastName =
        user.last_name ||
        user.lastName ||
        '';


      const name =
        `${firstName} ${lastName}`.trim();


      if (name) {
        return name;
      }


      return (
        user.username ||
        user.name ||
        'Traveler'
      );

    }, [user]);


  // =========================================================
  // EMAIL
  // =========================================================

  const email =
    user?.email ||
    'No email available';


  // =========================================================
  // LOCATION
  // =========================================================

  const location =
    user?.location ||
    user?.city ||
    user?.address ||
    'Location not set';


  // =========================================================
  // BIO
  // =========================================================

  const bio =
    user?.bio ||
    'Travel enthusiast • Exploring the world one city at a time';


  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const profileImage =
    user?.profile_picture ||
    user?.profile_image ||
    user?.avatar ||
    user?.image ||
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80';


  // =========================================================
  // DATE HELPERS
  // =========================================================

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


  const formatTripDate = date => {

    const parsed =
      parseDate(date);

    if (!parsed) {
      return 'Date not set';
    }

    return parsed.toLocaleDateString(
      'en-US',
      {
        month:
          'short',
        day:
          '2-digit',
        year:
          'numeric',
      }
    );

  };


  // =========================================================
  // TRIP DURATION
  // =========================================================

  const getTripDuration =
    trip => {

      if (
        !trip?.start_date ||
        !trip?.end_date
      ) {

        return 'Duration not set';

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
        return 'Duration not set';
      }


      const days =
        Math.max(
          1,
          Math.round(
            (
              end.getTime() -
              start.getTime()
            ) /
              (
                1000 *
                60 *
                60 *
                24
              )
          ) + 1
        );


      return `${days} Days`;

    };


  // =========================================================
  // DESTINATION
  // =========================================================

  const getTripDestination =
    trip => {

      return (
        trip?.destination ||
        trip?.location ||
        'Destination not set'
      );

    };


  // =========================================================
  // TRIP IMAGE
  // =========================================================

  const getTripImage =
    trip => {

      if (
        trip?.cover_image
      ) {
        return trip.cover_image;
      }


      if (
        trip?.image
      ) {
        return trip.image;
      }


      if (
        trip?.cover_photo
      ) {
        return trip.cover_photo;
      }


      const destination =
        (
          getTripDestination(
            trip
          ) || ''
        ).toLowerCase();


      if (
        destination.includes(
          'japan'
        ) ||
        destination.includes(
          'tokyo'
        )
      ) {

        return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80';

      }


      if (
        destination.includes(
          'bali'
        ) ||
        destination.includes(
          'indonesia'
        )
      ) {

        return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80';

      }


      if (
        destination.includes(
          'paris'
        ) ||
        destination.includes(
          'france'
        )
      ) {

        return 'https://images.unsplash.com/photo-1502602881469-4478223656ce?auto=format&fit=crop&w=600&q=80';

      }


      if (
        destination.includes(
          'dubai'
        )
      ) {

        return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80';

      }


      if (
        destination.includes(
          'singapore'
        )
      ) {

        return 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80';

      }


      if (
        destination.includes(
          'kerala'
        )
      ) {

        return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80';

      }


      return 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80';

    };


  // =========================================================
  // UPCOMING / PREVIOUS TRIPS
  // =========================================================

  const {
    upcomingTrips,
    previousTrips,
  } = useMemo(() => {

    const today =
      new Date();


    const upcoming = [];
    const previous = [];


    trips.forEach(trip => {

      const endDate =
        parseDate(
          trip.end_date
        );


      if (
        endDate &&
        endDate < today
      ) {

        previous.push(
          trip
        );

      } else {

        upcoming.push(
          trip
        );

      }

    });


    return {
      upcomingTrips:
        upcoming,
      previousTrips:
        previous,
    };

  }, [trips]);


  // =========================================================
  // TOTAL CITIES
  // =========================================================

  const totalCities =
    useMemo(() => {

      const destinations =
        trips
          .map(
            trip =>
              getTripDestination(
                trip
              )
          )
          .filter(Boolean);


      return new Set(
        destinations.map(
          destination =>
            destination
              .toLowerCase()
        )
      ).size;

    }, [trips]);


  // =========================================================
  // COUNTRIES
  // =========================================================

  const totalCountries =
    useMemo(() => {

      const countries =
        trips
          .map(
            trip =>
              trip?.country ||
              trip?.country_name
          )
          .filter(Boolean);


      return new Set(
        countries
      ).size;

    }, [trips]);


  // =========================================================
  // EDIT PROFILE
  // =========================================================

  const handleEditProfile =
    () => {

      navigate(
        '/profile/edit'
      );

    };


  // =========================================================
  // COPY TRIP
  // =========================================================

  const handleCopyTrip =
    async trip => {

      try {

        const copiedTrip = {
          ...trip,
          id:
            undefined,
          title:
            `${trip.title || 'Trip'} Copy`,
        };


        await navigator.clipboard.writeText(
          JSON.stringify(
            copiedTrip,
            null,
            2
          )
        );


        alert(
          'Trip details copied!'
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          'Unable to copy trip.'
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
          minHeight:
            '100vh',
          background:
            'var(--color-bg)',
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
        />

        <p
          style={{
            color:
              'var(--color-text-muted)',
          }}
        >
          Loading profile...
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
          minHeight:
            '100vh',
          background:
            'var(--color-bg)',
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
          Unable to load profile
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
          onClick={
            loadProfile
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
            cursor:
              'pointer',
            fontWeight:
              '600',
          }}
        >
          Try Again
        </button>

      </div>

    );

  }


  // =========================================================
  // MAIN UI
  // =========================================================

  return (

    <div
      style={{
        background:
          'var(--color-bg)',
        minHeight:
          '100vh',
        padding:
          '3rem 4rem 4rem 4rem',
        display:
          'flex',
        flexDirection:
          'column',
        gap:
          '3rem',
      }}
    >


      {/* =====================================================
          HEADER
          ===================================================== */}

      <div>

        <h1
          style={{
            fontSize:
              '2.5rem',
            fontWeight:
              '800',
            color:
              '#1e293b',
            marginBottom:
              '0.25rem',
            letterSpacing:
              '-0.02em',
          }}
        >
          Profile
        </h1>


        <p
          style={{
            fontSize:
              '1rem',
            color:
              'var(--color-text-muted)',
          }}
        >
          Manage your account, travel preferences, and adventures.
        </p>

      </div>


      {/* =====================================================
          USER CARD
          ===================================================== */}

      <div
        style={{
          background:
            'white',
          borderRadius:
            '1rem',
          padding:
            '2rem 3rem',
          display:
            'flex',
          justifyContent:
            'space-between',
          alignItems:
            'center',
          boxShadow:
            '0 4px 6px -1px rgba(0,0,0,0.02), 0 10px 15px -3px rgba(0,0,0,0.05)',
        }}
      >


        <div
          style={{
            display:
              'flex',
            alignItems:
              'center',
            gap:
              '2.5rem',
          }}
        >


          {/* AVATAR */}

          <div
            style={{
              position:
                'relative',
            }}
          >

            <div
              style={{
                width:
                  '150px',
                height:
                  '150px',
                borderRadius:
                  '50%',
                padding:
                  '4px',
                background:
                  'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
              }}
            >

              <img
                src={
                  profileImage
                }
                alt={
                  fullName
                }
                style={{
                  width:
                    '100%',
                  height:
                    '100%',
                  borderRadius:
                    '50%',
                  objectFit:
                    'cover',
                  border:
                    '4px solid white',
                }}
              />

            </div>


            <button
              onClick={() =>
                alert(
                  'Profile photo upload will be connected next.'
                )
              }
              style={{
                position:
                  'absolute',
                bottom:
                  '5px',
                right:
                  '5px',
                width:
                  '36px',
                height:
                  '36px',
                background:
                  'white',
                borderRadius:
                  '50%',
                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                boxShadow:
                  '0 2px 4px rgba(0,0,0,0.1)',
                border:
                  '1px solid var(--color-border)',
                color:
                  '#1d4ed8',
                cursor:
                  'pointer',
              }}
            >

              <Camera
                size={18}
              />

            </button>

          </div>


          {/* USER INFO */}

          <div
            style={{
              display:
                'flex',
              flexDirection:
                'column',
              gap:
                '1.25rem',
            }}
          >

            <div>

              <h2
                style={{
                  fontSize:
                    '1.75rem',
                  fontWeight:
                    '700',
                  color:
                    'var(--color-text)',
                  marginBottom:
                    '0.25rem',
                }}
              >
                {fullName}
              </h2>


              <p
                style={{
                  fontSize:
                    '0.9rem',
                  color:
                    'var(--color-text-muted)',
                }}
              >
                {bio}
              </p>

            </div>


            <div
              style={{
                display:
                  'flex',
                flexDirection:
                  'column',
                gap:
                  '0.5rem',
                color:
                  '#475569',
                fontSize:
                  '0.9rem',
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
                }}
              >

                <Mail
                  size={16}
                  color="var(--color-text-muted)"
                />

                {email}

              </div>


              <div
                style={{
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '0.5rem',
                }}
              >

                <MapPin
                  size={16}
                  color="var(--color-text-muted)"
                />

                {location}

              </div>

            </div>


            {/* STATS */}

            <div
              style={{
                display:
                  'flex',
                gap:
                  '2rem',
                marginTop:
                  '0.5rem',
              }}
            >


              {/* TRIPS */}

              <div
                style={{
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '0.75rem',
                }}
              >

                <div
                  style={{
                    background:
                      '#eff6ff',
                    padding:
                      '0.5rem',
                    borderRadius:
                      '50%',
                    color:
                      '#3b82f6',
                  }}
                >

                  <Globe
                    size={24}
                  />

                </div>


                <div>

                  <span
                    style={{
                      display:
                        'block',
                      fontSize:
                        '1.25rem',
                      fontWeight:
                        '700',
                      color:
                        'var(--color-text)',
                      lineHeight:
                        1,
                    }}
                  >
                    {
                      trips.length
                    }
                  </span>


                  <span
                    style={{
                      fontSize:
                        '0.75rem',
                      color:
                        'var(--color-text-muted)',
                    }}
                  >
                    Trips
                  </span>

                </div>

              </div>


              <div
                style={{
                  width:
                    '1px',
                  background:
                    'var(--color-border)',
                }}
              />


              {/* CITIES */}

              <div
                style={{
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '0.75rem',
                }}
              >

                <div
                  style={{
                    background:
                      '#fef2f2',
                    padding:
                      '0.5rem',
                    borderRadius:
                      '50%',
                    color:
                      '#ef4444',
                  }}
                >

                  <MapPin
                    size={24}
                  />

                </div>


                <div>

                  <span
                    style={{
                      display:
                        'block',
                      fontSize:
                        '1.25rem',
                      fontWeight:
                        '700',
                      color:
                        'var(--color-text)',
                      lineHeight:
                        1,
                    }}
                  >
                    {
                      totalCities
                    }
                  </span>


                  <span
                    style={{
                      fontSize:
                        '0.75rem',
                      color:
                        'var(--color-text-muted)',
                    }}
                  >
                    Cities
                  </span>

                </div>

              </div>


              <div
                style={{
                  width:
                    '1px',
                  background:
                    'var(--color-border)',
                }}
              />


              {/* COUNTRIES */}

              <div
                style={{
                  display:
                    'flex',
                  alignItems:
                    'center',
                  gap:
                    '0.75rem',
                }}
              >

                <div
                  style={{
                    background:
                      '#f0fdf4',
                    padding:
                      '0.5rem',
                    borderRadius:
                      '50%',
                    color:
                      '#3b82f6',
                  }}
                >

                  <Plane
                    size={24}
                  />

                </div>


                <div>

                  <span
                    style={{
                      display:
                        'block',
                      fontSize:
                        '1.25rem',
                      fontWeight:
                        '700',
                      color:
                        'var(--color-text)',
                      lineHeight:
                        1,
                    }}
                  >

                    {
                      totalCountries ||
                      '—'
                    }

                  </span>


                  <span
                    style={{
                      fontSize:
                        '0.75rem',
                      color:
                        'var(--color-text-muted)',
                    }}
                  >
                    Countries
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* EDIT */}

        <div>

          <button
            onClick={
              handleEditProfile
            }
            style={{
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
              boxShadow:
                '0 4px 6px rgba(29, 78, 216, 0.2)',
            }}
          >

            <Edit2
              size={16}
            />

            Edit Profile

          </button>

        </div>

      </div>


      {/* =====================================================
          PREPLANNED TRIPS
          ===================================================== */}

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

              <Calendar
                size={20}
                color="#1d4ed8"
              />

              Preplanned Trips

            </h2>


            <p
              style={{
                color:
                  'var(--color-text-muted)',
                fontSize:
                  '0.9rem',
              }}
            >
              Trips you're planning or have saved for later.
            </p>

          </div>


          <Link
            to="/my-trips"
            style={{
              color:
                '#1d4ed8',
              fontWeight:
                '600',
              textDecoration:
                'none',
              display:
                'flex',
              alignItems:
                'center',
              gap:
                '0.25rem',
            }}
          >

            View all

            <ChevronRight
              size={16}
            />

          </Link>

        </div>


        <div
          style={{
            display:
              'grid',
            gridTemplateColumns:
              'repeat(3, 1fr)',
            gap:
              '1.5rem',
          }}
        >

          {upcomingTrips
            .slice(0, 3)
            .map(trip => (

              <TripCard
                key={
                  trip.id
                }
                trip={
                  trip
                }
                upcoming
                getTripImage={
                  getTripImage
                }
                getTripDestination={
                  getTripDestination
                }
                formatTripDate={
                  formatTripDate
                }
                getTripDuration={
                  getTripDuration
                }
                onView={() =>
                  navigate(
                    `/trips/${trip.id}`
                  )
                }
              />

            ))}


          {upcomingTrips.length ===
            0 && (

            <div
              style={{
                gridColumn:
                  '1 / -1',
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

              <Calendar
                size={40}
                color="#94a3b8"
              />

              <h3
                style={{
                  marginTop:
                    '1rem',
                }}
              >
                No upcoming trips
              </h3>


              <p
                style={{
                  color:
                    'var(--color-text-muted)',
                }}
              >
                Create a trip to see it here.
              </p>


              <button
                onClick={() =>
                  navigate(
                    '/create-trip'
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
                  fontWeight:
                    '600',
                  cursor:
                    'pointer',
                }}
              >
                Create Trip
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          PREVIOUS TRIPS
          ===================================================== */}

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

              <Briefcase
                size={20}
                color="#64748b"
              />

              Previous Trips

            </h2>


            <p
              style={{
                color:
                  'var(--color-text-muted)',
                fontSize:
                  '0.9rem',
              }}
            >
              Your completed travel experiences.
            </p>

          </div>


          <Link
            to="/my-trips"
            style={{
              color:
                '#1d4ed8',
              fontWeight:
                '600',
              textDecoration:
                'none',
              display:
                'flex',
              alignItems:
                'center',
              gap:
                '0.25rem',
            }}
          >

            View all

            <ChevronRight
              size={16}
            />

          </Link>

        </div>


        <div
          style={{
            display:
              'grid',
            gridTemplateColumns:
              'repeat(3, 1fr)',
            gap:
              '1.5rem',
          }}
        >

          {previousTrips
            .slice(0, 3)
            .map(trip => (

              <TripCard
                key={
                  trip.id
                }
                trip={
                  trip
                }
                previous
                getTripImage={
                  getTripImage
                }
                getTripDestination={
                  getTripDestination
                }
                formatTripDate={
                  formatTripDate
                }
                getTripDuration={
                  getTripDuration
                }
                onView={() =>
                  navigate(
                    `/trips/${trip.id}`
                  )
                }
                onCopy={() =>
                  handleCopyTrip(
                    trip
                  )
                }
              />

            ))}


          {previousTrips.length ===
            0 && (

            <div
              style={{
                gridColumn:
                  '1 / -1',
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

              <Briefcase
                size={40}
                color="#94a3b8"
              />

              <h3
                style={{
                  marginTop:
                    '1rem',
                }}
              >
                No previous trips
              </h3>


              <p
                style={{
                  color:
                    'var(--color-text-muted)',
                }}
              >
                Your completed trips will appear here.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>

  );

};


// =============================================================
// TRIP CARD
// =============================================================

const TripCard = ({
  trip,
  upcoming,
  previous,
  getTripImage,
  getTripDestination,
  formatTripDate,
  getTripDuration,
  onView,
  onCopy,
}) => {

  const budget =
    trip?.total_budget ??
    trip?.budget ??
    0;


  return (

    <div
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
          '0 4px 6px -1px rgba(0,0,0,0.02)',
        display:
          'flex',
        flexDirection:
          'column',
      }}
    >


      {/* IMAGE */}

      <div
        style={{
          position:
            'relative',
          height:
            '160px',
        }}
      >

        <img
          src={
            getTripImage(
              trip
            )
          }
          alt={
            trip?.title ||
            'Trip'
          }
          style={{
            width:
              '100%',
            height:
              '100%',
            objectFit:
              'cover',
          }}
        />


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
              upcoming
                ? '#3b82f6'
                : '#dcfce7',
            color:
              upcoming
                ? 'white'
                : '#166534',
            fontSize:
              '0.75rem',
            fontWeight:
              '600',
            padding:
              '0.25rem 0.75rem',
            borderRadius:
              '2rem',
          }}
        >

          {
            upcoming
              ? 'Upcoming'
              : 'Completed'
          }

        </div>


        {/* MENU */}

        <div
          style={{
            position:
              'absolute',
            top:
              '0.75rem',
            right:
              '0.75rem',
            background:
              'rgba(255,255,255,0.9)',
            color:
              'var(--color-text-muted)',
            padding:
              '0.4rem',
            borderRadius:
              '50%',
            cursor:
              'pointer',
          }}
          onClick={() =>
            alert(
              'Trip options will be connected next.'
            )
          }
        >

          <MoreVertical
            size={16}
          />

        </div>

      </div>


      {/* CONTENT */}

      <div
        style={{
          padding:
            '1.25rem',
          flex:
            1,
          display:
            'flex',
          flexDirection:
            'column',
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
              '0.75rem',
          }}
        >

          {
            trip?.title ||
            'Untitled Trip'
          }

        </h3>


        <div
          style={{
            display:
              'flex',
            flexDirection:
              'column',
            gap:
              '0.5rem',
            marginBottom:
              '1.25rem',
            fontSize:
              '0.85rem',
            color:
              'var(--color-text-muted)',
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

            <MapPin
              size={14}
            />

            {
              getTripDestination(
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

            <Calendar
              size={14}
            />

            {
              formatTripDate(
                trip?.start_date
              )
            }

            {' - '}

            {
              formatTripDate(
                trip?.end_date
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

            <Plane
              size={14}
            />

            {
              getTripDuration(
                trip
              )
            }

          </span>

        </div>


        {/* BUDGET */}

        <div
          style={{
            marginTop:
              'auto',
            marginBottom:
              '1.25rem',
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
            }}
          >

            <div
              style={{
                background:
                  '#f0fdf4',
                padding:
                  '0.2rem',
                borderRadius:
                  '50%',
                color:
                  '#10b981',
              }}
            >

              <DollarSign
                size={14}
              />

            </div>


            <span
              style={{
                fontWeight:
                  '700',
                fontSize:
                  '1.1rem',
                color:
                  'var(--color-text)',
              }}
            >

              ₹
              {Number(
                budget
              ).toLocaleString(
                'en-IN'
              )}

            </span>


            {previous && (

              <span
                style={{
                  fontSize:
                    '0.85rem',
                  color:
                    '#10b981',
                  fontWeight:
                    '600',
                }}
              >
                spent
              </span>

            )}

          </div>


          <span
            style={{
              fontSize:
                '0.75rem',
              color:
                'var(--color-text-muted)',
              marginLeft:
                '1.75rem',
            }}
          >
            {
              previous
                ? 'Total spent'
                : 'Estimated budget'
            }
          </span>

        </div>


        {/* BUTTONS */}

        {previous ? (

          <div
            style={{
              display:
                'flex',
              gap:
                '0.75rem',
            }}
          >

            <button
              onClick={
                onView
              }
              style={{
                flex:
                  1,
                background:
                  '#1d4ed8',
                color:
                  'white',
                padding:
                  '0.75rem',
                borderRadius:
                  '0.5rem',
                fontWeight:
                  '600',
                border:
                  'none',
                cursor:
                  'pointer',
              }}
            >
              View Trip
            </button>


            <button
              onClick={
                onCopy
              }
              style={{
                flex:
                  1,
                background:
                  'white',
                color:
                  'var(--color-text)',
                border:
                  '1px solid var(--color-border)',
                padding:
                  '0.75rem',
                borderRadius:
                  '0.5rem',
                fontWeight:
                  '600',
                display:
                  'flex',
                alignItems:
                  'center',
                justifyContent:
                  'center',
                gap:
                  '0.5rem',
                cursor:
                  'pointer',
              }}
            >

              <Copy
                size={16}
              />

              Copy Trip

            </button>

          </div>

        ) : (

          <button
            onClick={
              onView
            }
            style={{
              width:
                '100%',
              background:
                '#1d4ed8',
              color:
                'white',
              padding:
                '0.75rem',
              borderRadius:
                '0.5rem',
              fontWeight:
                '600',
              border:
                'none',
              cursor:
                'pointer',
            }}
          >
            View Trip
          </button>

        )}

      </div>

    </div>

  );

};


export default Profile;