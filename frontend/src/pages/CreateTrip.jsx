import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  Calendar,
  X,
  Plus,
  Heart,
  Plane,
  Wand2,
  Loader2
} from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:8000';

const CreateTrip = () => {
  const navigate = useNavigate();

  // =========================================================
  // TRIP DETAILS
  // =========================================================

  const [tripName, setTripName] = useState(
    'European Summer Adventure'
  );

  const [startDate, setStartDate] = useState(
    '2026-06-12'
  );

  const [endDate, setEndDate] = useState(
    '2026-06-23'
  );

  const [budget, setBudget] = useState('');

  const [description, setDescription] = useState('');

  // =========================================================
  // SELECTED DESTINATIONS
  // =========================================================

  const [selectedDestinations, setSelectedDestinations] =
    useState([]);

  // =========================================================
  // HARDCODED SUGGESTIONS
  // =========================================================

  const suggestions = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      flag: '🇫🇷',
      rating: 4.9,
      reviews: '2.4K',
      price: 820,
      img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Rome',
      country: 'Italy',
      flag: '🇮🇹',
      rating: 4.8,
      reviews: '1.9K',
      price: 760,
      img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Barcelona',
      country: 'Spain',
      flag: '🇪🇸',
      rating: 4.7,
      reviews: '1.6K',
      price: 690,
      img: 'https://images.unsplash.com/photo-1583422409516-2895a77ef244?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Santorini',
      country: 'Greece',
      flag: '🇬🇷',
      rating: 4.8,
      reviews: '1.2K',
      price: 910,
      img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Tokyo',
      country: 'Japan',
      flag: '🇯🇵',
      rating: 4.8,
      reviews: '3.1K',
      price: 1120,
      img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Bali',
      country: 'Indonesia',
      flag: '🇮🇩',
      rating: 4.6,
      reviews: '1.7K',
      price: 610,
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // =========================================================
  // UI STATE
  // =========================================================

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState(false);

  // =========================================================
  // CHECK IF DESTINATION IS SELECTED
  // =========================================================

  const isDestinationSelected = (destinationId) => {
    return selectedDestinations.some(
      destination => destination.id === destinationId
    );
  };

  // =========================================================
  // ADD DESTINATION
  // =========================================================

  const addDestination = (destination) => {
    if (isDestinationSelected(destination.id)) {
      return;
    }

    setSelectedDestinations(previous => [
      ...previous,
      destination
    ]);
  };

  // =========================================================
  // REMOVE DESTINATION
  // =========================================================

  const removeDestination = (destinationId) => {
    setSelectedDestinations(previous =>
      previous.filter(
        destination =>
          destination.id !== destinationId
      )
    );
  };

  // =========================================================
  // CREATE TRIP
  // =========================================================

  const handleCreateTrip = async () => {
    setError('');
    setSuccess(false);

    const token =
      localStorage.getItem('access_token');

    if (!token) {
      navigate('/login');
      return;
    }

    if (!tripName.trim()) {
      setError('Please enter a trip name.');
      return;
    }

    if (!startDate || !endDate) {
      setError(
        'Please select both start and end dates.'
      );
      return;
    }

    if (endDate < startDate) {
      setError(
        'End date cannot be before start date.'
      );
      return;
    }

    const numericBudget =
      budget === ''
        ? 0
        : Number(budget);

    if (
      Number.isNaN(numericBudget) ||
      numericBudget < 0
    ) {
      setError(
        'Please enter a valid budget.'
      );
      return;
    }

    setSaving(true);

    try {
      const requestBody = {
        name: tripName.trim(),
        description: description.trim(),
        start_date: startDate,
        end_date: endDate,
        budget: numericBudget,
        currency: 'USD',
        privacy: 'private'
      };

      const response = await fetch(
        `${API_BASE_URL}/api/trips/create/`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(requestBody)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage =
          'Failed to create trip.';

        if (
          data &&
          typeof data === 'object'
        ) {
          const messages =
            Object.values(data)
              .flat()
              .filter(
                message =>
                  typeof message === 'string'
              );

          if (messages.length > 0) {
            errorMessage =
              messages.join(' ');
          }
        }

        throw new Error(errorMessage);
      }

      console.log(
        'Trip created successfully:',
        data
      );

      console.log(
        'Selected destinations:',
        selectedDestinations
      );

      setSuccess(true);

      /*
       * The Trip itself is now saved.
       *
       * selectedDestinations currently remain
       * in React state.
       *
       * TripStop database integration will be
       * added separately.
       */

      setTimeout(() => {
        navigate('/my-trips');
      }, 800);

    } catch (err) {
      console.error(
        'Create trip error:',
        err
      );

      setError(
        err.message ||
        'Something went wrong while creating the trip.'
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        background: 'var(--color-bg)',
        minHeight: '100vh',
        paddingBottom: '4rem'
      }}
    >

      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        style={{
          position: 'relative',
          height: '340px',
          backgroundImage:
            'linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4)), url("https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=2800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem 4rem',
          color: 'white',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        {/* Breadcrumb */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            color: '#cbd5e1',
            marginBottom: '2rem'
          }}
        >
          <Link
            to="/"
            style={{
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            Home
          </Link>

          <ChevronRight size={14} />

          <Link
            to="/my-trips"
            style={{
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            My Trips
          </Link>

          <ChevronRight size={14} />

          <span
            style={{
              color: 'white',
              fontWeight: '500'
            }}
          >
            Create New Trip
          </span>
        </div>

        {/* Title */}

        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Plan a New Trip

          <Plane
            size={32}
            style={{
              transform: 'rotate(-45deg)'
            }}
          />
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: '#e2e8f0',
            marginBottom: '3rem'
          }}
        >
          Let's build your next unforgettable adventure.
        </p>

        {/* Stepper */}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '800px',
            width: '100%'
          }}
        >

          {/* Step 1 */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#1d4ed8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                1
              </div>

              <div
                style={{
                  height: '2px',
                  background: '#1d4ed8',
                  width: '150px'
                }}
              />
            </div>

            <span
              style={{
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
            >
              Trip Details
            </span>
          </div>

          {/* Step 2 */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  border:
                    '1px solid rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                2
              </div>

              <div
                style={{
                  height: '2px',
                  background:
                    'rgba(255,255,255,0.2)',
                  width: '150px'
                }}
              />
            </div>

            <span
              style={{
                fontWeight: '400',
                fontSize: '0.9rem',
                color: '#cbd5e1'
              }}
            >
              Destinations & Activities
            </span>
          </div>

          {/* Step 3 */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background:
                    'rgba(255,255,255,0.2)',
                  border:
                    '1px solid rgba(255,255,255,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
              >
                3
              </div>
            </div>

            <span
              style={{
                fontWeight: '400',
                fontSize: '0.9rem',
                color: '#cbd5e1'
              }}
            >
              Itinerary & Budget
            </span>
          </div>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div
        style={{
          padding: '0 4rem',
          marginTop: '-2rem',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >

        {/* ===================================================
            TRIP DETAILS CARD
            =================================================== */}

        <div
          style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow:
              '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)'
          }}
        >

          <h2
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-text)',
              marginBottom: '0.25rem'
            }}
          >
            Tell us about your trip
          </h2>

          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.9rem',
              marginBottom: '2rem'
            }}
          >
            Start with the basics. You can change these details later.
          </p>

          {/* Error */}

          {error && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.9rem'
              }}
            >
              {error}
            </div>
          )}

          {/* Success */}

          {success && (
            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#15803d',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                fontSize: '0.9rem'
              }}
            >
              Trip created successfully. Redirecting...
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxWidth: '800px'
            }}
          >

            {/* Trip Name */}

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}
              >
                Trip Name

                <span
                  style={{
                    color: '#ef4444'
                  }}
                >
                  *
                </span>
              </label>

              <div
                style={{
                  position: 'relative'
                }}
              >
                <input
                  type="text"
                  value={tripName}
                  onChange={e =>
                    setTripName(e.target.value)
                  }
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border:
                      '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                />

                <Wand2
                  size={18}
                  color="#3b82f6"
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform:
                      'translateY(-50%)'
                  }}
                />
              </div>
            </div>


            {/* Description */}

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}
              >
                Description
              </label>

              <textarea
                value={description}
                onChange={e =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Tell us about your trip..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border:
                    '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>


            {/* Dates */}

            <div
              style={{
                display: 'flex',
                gap: '1.5rem'
              }}
            >

              <div
                style={{
                  flex: 1
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}
                >
                  Start Date

                  <span
                    style={{
                      color: '#ef4444'
                    }}
                  >
                    *
                  </span>
                </label>

                <div
                  style={{
                    position: 'relative'
                  }}
                >
                  <Calendar
                    size={18}
                    color="var(--color-text-muted)"
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform:
                        'translateY(-50%)'
                    }}
                  />

                  <input
                    type="date"
                    value={startDate}
                    onChange={e =>
                      setStartDate(
                        e.target.value
                      )
                    }
                    style={{
                      width: '100%',
                      padding:
                        '0.75rem 1rem 0.75rem 2.5rem',
                      border:
                        '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      fontSize: '1rem',
                      color:
                        'var(--color-text)'
                    }}
                  />
                </div>
              </div>


              <div
                style={{
                  flex: 1
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}
                >
                  End Date

                  <span
                    style={{
                      color: '#ef4444'
                    }}
                  >
                    *
                  </span>
                </label>

                <div
                  style={{
                    position: 'relative'
                  }}
                >
                  <Calendar
                    size={18}
                    color="var(--color-text-muted)"
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform:
                        'translateY(-50%)'
                    }}
                  />

                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={e =>
                      setEndDate(
                        e.target.value
                      )
                    }
                    style={{
                      width: '100%',
                      padding:
                        '0.75rem 1rem 0.75rem 2.5rem',
                      border:
                        '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      fontSize: '1rem',
                      color:
                        'var(--color-text)'
                    }}
                  />
                </div>
              </div>

            </div>


            {/* Budget */}

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}
              >
                Budget (USD)
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={budget}
                onChange={e =>
                  setBudget(
                    e.target.value
                  )
                }
                placeholder="Enter your trip budget"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border:
                    '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  fontSize: '1rem'
                }}
              />
            </div>


            {/* Duration */}

            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '0.5rem',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#1e40af',
                fontSize: '0.95rem'
              }}
            >
              <Calendar
                size={20}
                color="#3b82f6"
              />

              <span>
                Your trip dates have been selected.
              </span>
            </div>


            {/* Destination Search */}

            <div
              style={{
                marginTop: '0.5rem'
              }}
            >

              <h3
                style={{
                  fontSize: '1.1rem',
                  marginBottom: '0.25rem'
                }}
              >
                Where do you want to go?
              </h3>

              <p
                style={{
                  color:
                    'var(--color-text-muted)',
                  fontSize: '0.85rem',
                  marginBottom: '1rem'
                }}
              >
                Search and add multiple cities or destinations.
              </p>


              <div
                style={{
                  position: 'relative',
                  marginBottom: '1rem'
                }}
              >
                <Search
                  size={20}
                  color="var(--color-text-muted)"
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform:
                      'translateY(-50%)'
                  }}
                />

                <input
                  type="text"
                  placeholder="Search cities or destinations..."
                  style={{
                    width: '100%',
                    padding:
                      '1rem 1rem 1rem 3rem',
                    border:
                      '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    outline: 'none',
                    fontSize: '1rem'
                  }}
                />
              </div>


              {/* Selected Destinations */}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >

                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color:
                      'var(--color-text-muted)',
                    textTransform:
                      'uppercase'
                  }}
                >
                  Your selected destinations
                </span>


                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >

                  {selectedDestinations.length === 0 ? (
                    <span
                      style={{
                        color:
                          'var(--color-text-muted)',
                        fontSize: '0.85rem'
                      }}
                    >
                      No destinations selected yet.
                    </span>
                  ) : (
                    selectedDestinations.map(
                      destination => (
                        <div
                          key={destination.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'white',
                            border:
                              '1px solid var(--color-border)',
                            padding:
                              '0.5rem 1rem',
                            borderRadius: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            boxShadow:
                              '0 1px 2px rgba(0,0,0,0.05)'
                          }}
                        >

                          <span>
                            {destination.flag}
                          </span>

                          <span>
                            {destination.name}
                          </span>

                          <X
                            size={14}
                            color="var(--color-text-muted)"
                            style={{
                              cursor: 'pointer',
                              marginLeft:
                                '0.25rem'
                            }}
                            onClick={() =>
                              removeDestination(
                                destination.id
                              )
                            }
                          />

                        </div>
                      )
                    )
                  )}


                  <button
                    type="button"
                    onClick={() =>
                      navigate('/destinations')
                    }
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: '#eff6ff',
                      color: '#1d4ed8',
                      border:
                        '1px dashed #93c5fd',
                      padding:
                        '0.5rem 1rem',
                      borderRadius: '2rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={16} />
                    Add more
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>


        {/* ===================================================
            SUGGESTIONS
            =================================================== */}

        <div
          style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow:
              '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.05)'
          }}
        >

          <h2
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-text)',
              marginBottom: '0.25rem'
            }}
          >
            Suggestion for places to visit / activities to perform
          </h2>

          <p
            style={{
              color:
                'var(--color-text-muted)',
              fontSize: '0.9rem',
              marginBottom: '2rem'
            }}
          >
            Popular destinations and activities recommended for you.
          </p>


          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >

            {suggestions.map(item => {

              const selected =
                isDestinationSelected(
                  item.id
                );

              return (
                <div
                  key={item.id}
                  style={{
                    border:
                      '1px solid var(--color-border)',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >

                  {/* Image */}

                  <div
                    style={{
                      position: 'relative',
                      height: '160px'
                    }}
                  >

                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />

                    <div
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background:
                          'rgba(255,255,255,0.2)',
                        backdropFilter:
                          'blur(5px)',
                        borderRadius: '50%',
                        padding: '0.4rem',
                        color: 'white'
                      }}
                    >
                      <Heart size={18} />
                    </div>

                  </div>


                  {/* Card Content */}

                  <div
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1
                    }}
                  >

                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color:
                          'var(--color-text)',
                        marginBottom:
                          '0.25rem'
                      }}
                    >
                      {item.name}
                    </h3>


                    <span
                      style={{
                        fontSize: '0.85rem',
                        color:
                          'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        marginBottom:
                          '1.25rem'
                      }}
                    >
                      {item.flag}
                      {item.country}
                    </span>


                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'flex-end',
                        marginBottom:
                          '1.25rem',
                        flex: 1
                      }}
                    >

                      <div>

                        <span
                          style={{
                            fontSize: '0.75rem',
                            color:
                              'var(--color-text-muted)',
                            display: 'block',
                            marginBottom:
                              '0.5rem'
                          }}
                        >
                          Top Attractions
                        </span>

                        <div
                          style={{
                            display: 'flex',
                            marginLeft: '0.5rem'
                          }}
                        >

                          {[1, 2, 3].map(i => (
                            <div
                              key={i}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius:
                                  '50%',
                                border:
                                  '2px solid white',
                                marginLeft:
                                  '-0.5rem',
                                background:
                                  '#e2e8f0'
                              }}
                            />
                          ))}

                        </div>

                      </div>


                      <div
                        style={{
                          textAlign: 'right'
                        }}
                      >

                        <span
                          style={{
                            fontSize: '0.75rem',
                            color:
                              'var(--color-text-muted)',
                            display: 'block'
                          }}
                        >
                          From
                        </span>

                        <span
                          style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#1d4ed8'
                          }}
                        >
                          ${item.price}
                        </span>

                        <div
                          style={{
                            fontSize: '0.75rem',
                            color: '#f59e0b',
                            display: 'flex',
                            alignItems:
                              'center',
                            gap: '0.25rem',
                            marginTop:
                              '0.25rem'
                          }}
                        >

                          {'★'.repeat(
                            Math.floor(
                              item.rating
                            )
                          )}

                          <span
                            style={{
                              color:
                                'var(--color-text-muted)'
                            }}
                          >
                            {item.rating}
                            {' '}
                            ({item.reviews})
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* ADD / REMOVE BUTTON */}

                    <button
                      type="button"
                      onClick={() => {

                        if (selected) {
                          removeDestination(
                            item.id
                          );
                        } else {
                          addDestination(item);
                        }

                      }}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: selected
                          ? '#eff6ff'
                          : 'transparent',
                        border: selected
                          ? '1px solid #2563eb'
                          : '1px solid #bfdbfe',
                        borderRadius: '0.5rem',
                        color: '#1d4ed8',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer'
                      }}
                    >

                      {selected ? (
                        <>
                          <X size={18} />
                          Remove from Trip
                        </>
                      ) : (
                        <>
                          <Plus size={18} />
                          Add to Trip
                        </>
                      )}

                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* ===================================================
            CREATE TRIP BUTTON
            =================================================== */}

        <div
          style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem 2.5rem',
            boxShadow:
              '0 10px 25px -5px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >

          <button
            type="button"
            onClick={handleCreateTrip}
            disabled={saving}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              background:
                saving
                  ? '#93c5fd'
                  : '#1d4ed8',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor:
                saving
                  ? 'not-allowed'
                  : 'pointer'
            }}
          >

            {saving ? (
              <>
                <Loader2 size={18} />
                Creating Trip...
              </>
            ) : (
              <>
                Create Trip
                <ChevronRight size={18} />
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  );
};

export default CreateTrip;