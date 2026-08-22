import { useState } from 'react';
import {
  Search,
  X,
  MapPin,
  Star,
  Filter,
  ChevronDown,
  List,
  Check,
  Heart,
  CheckCircle2,
  ChevronUp,
  Calendar,
  Plus,
} from 'lucide-react';

const Explore = () => {
  // =========================================================
  // SEARCH / TYPE
  // =========================================================

  const [searchQuery, setSearchQuery] = useState('Paragliding');

  const [searchType, setSearchType] =
    useState('activities');

  // =========================================================
  // FILTERS
  // =========================================================

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [selectedCosts, setSelectedCosts] =
    useState([]);

  const [selectedDurations, setSelectedDurations] =
    useState([]);

  const [selectedRatings, setSelectedRatings] =
    useState([]);

  // =========================================================
  // SORT / GROUP
  // =========================================================

  const [sortBy, setSortBy] =
    useState('rating');

  const [groupBy, setGroupBy] =
    useState('none');

  // =========================================================
  // MODALS / PANELS
  // =========================================================

  const [selectedActivity, setSelectedActivity] =
    useState(null);

  const [showAddPanel, setShowAddPanel] =
    useState(false);

  const [activityToAdd, setActivityToAdd] =
    useState(null);

  const [showToast, setShowToast] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState('');

  // =========================================================
  // ADDED ACTIVITIES
  // =========================================================

  const [addedActivities, setAddedActivities] =
    useState([]);

  // =========================================================
  // DATA
  // =========================================================

  const activities = [
    {
      id: 1,
      title: 'Paragliding in Interlaken',
      loc: 'Interlaken, Switzerland',
      country: 'Switzerland',
      rate: '4.8 (320)',
      rating: 4.8,
      tags: [
        {
          t: 'Adventure',
          c: '#dbeafe',
          tc: '#1e40af',
        },
        {
          t: '2-3 hours',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Adventure',
      duration: '2-3 hours',
      cost: '$$$',
      desc:
        'Experience breathtaking views of the Swiss Alps with an experienced instructor.',
      price: 145,
      img:
        'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 2,
      title: 'Mountain Hiking Tour',
      loc: 'Interlaken, Switzerland',
      country: 'Switzerland',
      rate: '4.7 (210)',
      rating: 4.7,
      tags: [
        {
          t: 'Adventure',
          c: '#dbeafe',
          tc: '#1e40af',
        },
        {
          t: '4 hours',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Adventure',
      duration: '4+ hours',
      cost: '$$',
      desc:
        'Guided hiking experience through scenic alpine trails and stunning viewpoints.',
      price: 85,
      img:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 3,
      title: 'Swiss Food & Culture Tour',
      loc: 'Interlaken, Switzerland',
      country: 'Switzerland',
      rate: '4.6 (185)',
      rating: 4.6,
      tags: [
        {
          t: 'Food & Culture',
          c: '#f3e8ff',
          tc: '#6b21a8',
        },
        {
          t: '3 hours',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Food & Dining',
      duration: '2-4 hours',
      cost: '$$',
      desc:
        'Taste authentic Swiss cuisine and discover local culture with a friendly guide.',
      price: 70,
      img:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 4,
      title: 'Lake Brienz Boat Cruise',
      loc: 'Interlaken, Switzerland',
      country: 'Switzerland',
      rate: '4.8 (260)',
      rating: 4.8,
      tags: [
        {
          t: 'Sightseeing',
          c: '#dcfce7',
          tc: '#166534',
        },
        {
          t: '2 hours',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Sightseeing',
      duration: 'Under 2 hours',
      cost: '$',
      desc:
        'Relaxing cruise on the turquoise waters of Lake Brienz with amazing views.',
      price: 55,
      img:
        'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 5,
      title: 'Alpine Photography Experience',
      loc: 'Interlaken, Switzerland',
      country: 'Switzerland',
      rate: '4.9 (142)',
      rating: 4.9,
      tags: [
        {
          t: 'Nature',
          c: '#dcfce7',
          tc: '#166534',
        },
        {
          t: '2 hours',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Nature',
      duration: 'Under 2 hours',
      cost: '$$$',
      desc:
        'Capture the beauty of the Swiss Alps with a professional local photographer.',
      price: 120,
      img:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 6,
      title: 'Interlaken Old Town Walk',
      loc: 'Interlaken, Switzerland',
      country: 'Switzerland',
      rate: '4.5 (98)',
      rating: 4.5,
      tags: [
        {
          t: 'Culture',
          c: '#f3e8ff',
          tc: '#6b21a8',
        },
        {
          t: '2 hours',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Culture',
      duration: 'Under 2 hours',
      cost: '$',
      desc:
        'Explore historic streets, local architecture and hidden gems in Interlaken.',
      price: 40,
      img:
        'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const cities = [
    {
      id: 101,
      title: 'Tokyo',
      loc: 'Tokyo, Japan',
      country: 'Japan',
      rate: '4.9 (4.2K)',
      rating: 4.9,
      tags: [
        {
          t: 'Culture',
          c: '#f3e8ff',
          tc: '#6b21a8',
        },
        {
          t: 'City',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Culture',
      duration: '4+ hours',
      cost: '$$$',
      desc:
        'Discover Tokyo, one of the world’s most vibrant cities, combining tradition and modern life.',
      price: 1120,
      img:
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 102,
      title: 'Paris',
      loc: 'Paris, France',
      country: 'France',
      rate: '4.9 (5.1K)',
      rating: 4.9,
      tags: [
        {
          t: 'Sightseeing',
          c: '#dcfce7',
          tc: '#166534',
        },
        {
          t: 'City',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Sightseeing',
      duration: '4+ hours',
      cost: '$$$',
      desc:
        'Explore Paris, the city of lights, famous for its landmarks, food, art and culture.',
      price: 820,
      img:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 103,
      title: 'Rome',
      loc: 'Rome, Italy',
      country: 'Italy',
      rate: '4.8 (4.7K)',
      rating: 4.8,
      tags: [
        {
          t: 'History',
          c: '#f3e8ff',
          tc: '#6b21a8',
        },
        {
          t: 'City',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Culture',
      duration: '4+ hours',
      cost: '$$',
      desc:
        'Experience ancient history, incredible architecture and authentic Italian cuisine.',
      price: 760,
      img:
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    },

    {
      id: 104,
      title: 'Barcelona',
      loc: 'Barcelona, Spain',
      country: 'Spain',
      rate: '4.8 (3.9K)',
      rating: 4.8,
      tags: [
        {
          t: 'Culture',
          c: '#f3e8ff',
          tc: '#6b21a8',
        },
        {
          t: 'City',
          c: '#f1f5f9',
          tc: '#475569',
        },
        {
          t: '$$',
          c: '#fef3c7',
          tc: '#b45309',
        },
      ],
      category: 'Culture',
      duration: '4+ hours',
      cost: '$$',
      desc:
        'Explore Barcelona’s architecture, beaches, food and vibrant city life.',
      price: 690,
      img:
        'https://images.unsplash.com/photo-1583422409516-2895a77ef244?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // =========================================================
  // CURRENT DATASET
  // =========================================================

  const currentData =
    searchType === 'activities'
      ? activities
      : cities;

  // =========================================================
  // FILTER HELPERS
  // =========================================================

  const toggleFilter = (
    value,
    setter,
    currentValues
  ) => {
    if (currentValues.includes(value)) {
      setter(
        currentValues.filter(
          item => item !== value
        )
      );
    } else {
      setter([
        ...currentValues,
        value,
      ]);
    }
  };

  // =========================================================
  // FILTER RESULTS
  // =========================================================

  let filteredResults = currentData.filter(item => {

    const query =
      searchQuery.trim().toLowerCase();

    const matchesSearch =
      query === '' ||
      item.title
        .toLowerCase()
        .includes(query) ||
      item.loc
        .toLowerCase()
        .includes(query) ||
      item.country
        .toLowerCase()
        .includes(query) ||
      item.category
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(
        item.category
      );

    const matchesCost =
      selectedCosts.length === 0 ||
      selectedCosts.includes(
        item.cost
      );

    const matchesDuration =
      selectedDurations.length === 0 ||
      selectedDurations.some(
        duration => {

          if (
            duration === 'Under 2 hours'
          ) {
            return item.duration ===
              'Under 2 hours';
          }

          if (
            duration === '2-4 hours'
          ) {
            return (
              item.duration ===
                '2-3 hours' ||
              item.duration ===
                '2 hours' ||
              item.duration ===
                '3 hours' ||
              item.duration ===
                '2-4 hours'
            );
          }

          if (
            duration === '4+ hours'
          ) {
            return item.duration ===
              '4+ hours';
          }

          return false;
        }
      );

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some(
        rating => {

          if (rating === '4.5+') {
            return item.rating >= 4.5;
          }

          if (rating === '4.0+') {
            return item.rating >= 4.0;
          }

          if (rating === '3.5+') {
            return item.rating >= 3.5;
          }

          return false;
        }
      );

    return (
      matchesSearch &&
      matchesCategory &&
      matchesCost &&
      matchesDuration &&
      matchesRating
    );
  });

  // =========================================================
  // SORT
  // =========================================================

  filteredResults = [...filteredResults].sort(
    (a, b) => {

      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }

      if (sortBy === 'price-low') {
        return a.price - b.price;
      }

      if (sortBy === 'price-high') {
        return b.price - a.price;
      }

      if (sortBy === 'name') {
        return a.title.localeCompare(
          b.title
        );
      }

      return 0;
    }
  );

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedCosts([]);
    setSelectedDurations([]);
    setSelectedRatings([]);
    setSearchQuery('');
  };

  // =========================================================
  // ADD ACTIVITY
  // =========================================================

  const addActivity = item => {

    const alreadyAdded =
      addedActivities.some(
        activity =>
          activity.id === item.id
      );

    if (alreadyAdded) {
      return;
    }

    setAddedActivities(
      previous => [
        ...previous,
        item,
      ]
    );

    setToastMessage(
      `Added ${item.title} to your trip.`
    );

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // =========================================================
  // REMOVE ACTIVITY
  // =========================================================

  const removeActivity = id => {
    setAddedActivities(
      previous =>
        previous.filter(
          activity =>
            activity.id !== id
        )
    );
  };

  // =========================================================
  // OPEN ADD PANEL
  // =========================================================

  const openAddPanel = item => {
    setActivityToAdd(item);
    setShowAddPanel(true);
  };

  // =========================================================
  // CONFIRM ADD
  // =========================================================

  const confirmAddActivity = () => {

    if (!activityToAdd) {
      return;
    }

    addActivity(activityToAdd);

    setShowAddPanel(false);
    setActivityToAdd(null);
  };

  // =========================================================
  // CHECK IF ADDED
  // =========================================================

  const isAdded = id => {
    return addedActivities.some(
      activity =>
        activity.id === id
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      style={{
        background: '#f8fafc',
        minHeight: '100vh',
        paddingBottom: '4rem',
        fontFamily: 'var(--font-body)',
      }}
    >

      {/* =====================================================
          HERO & SEARCH
          ===================================================== */}

      <section
        style={{
          position: 'relative',
          padding: '3rem 4rem',
          background:
            'linear-gradient(to right, #f8fafc 40%, #e0f2fe 100%)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'visible',
        }}
      >

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '800px',
          }}
        >

          <h1
            style={{
              fontSize: '3rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
              fontFamily:
                'var(--font-heading)',
            }}
          >
            Explore
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color:
                'var(--color-text-muted)',
              marginBottom: '2rem',
            }}
          >
            Discover cities, activities,
            and experiences for your next
            adventure.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              position: 'relative',
            }}
          >

            <div
              style={{
                flex: 1,
                position: 'relative',
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
                placeholder={
                  searchType ===
                  'activities'
                    ? 'Search activities...'
                    : 'Search cities...'
                }
                style={{
                  width: '100%',
                  padding:
                    '1rem 3rem',
                  border:
                    '1px solid #cbd5e1',
                  borderRadius: '2rem',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#0f172a',
                  fontWeight: '500',
                  boxShadow:
                    '0 4px 6px -1px rgba(0,0,0,0.05)',
                }}
              />

              {searchQuery && (
                <X
                  size={18}
                  color="var(--color-text-muted)"
                  onClick={() =>
                    setSearchQuery('')
                  }
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform:
                      'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                />
              )}

            </div>


            {/* Search Type */}

            <div
              style={{
                display: 'flex',
                background: 'white',
                border:
                  '1px solid #cbd5e1',
                borderRadius: '2rem',
                overflow: 'hidden',
                padding: '0.25rem',
              }}
            >

              <button
                type="button"
                onClick={() =>
                  setSearchType('cities')
                }
                style={{
                  padding:
                    '0.5rem 1.5rem',
                  border: 'none',
                  borderRadius:
                    '2rem',
                  background:
                    searchType ===
                    'cities'
                      ? '#1d4ed8'
                      : 'transparent',
                  color:
                    searchType ===
                    'cities'
                      ? 'white'
                      : 'var(--color-text)',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Cities
              </button>

              <button
                type="button"
                onClick={() =>
                  setSearchType(
                    'activities'
                  )
                }
                style={{
                  padding:
                    '0.5rem 1.5rem',
                  border: 'none',
                  borderRadius:
                    '2rem',
                  background:
                    searchType ===
                    'activities'
                      ? '#1d4ed8'
                      : 'transparent',
                  color:
                    searchType ===
                    'activities'
                      ? 'white'
                      : 'var(--color-text)',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Activities
              </button>

            </div>

          </div>

        </div>


        {/* Decorative Image */}

        <div
          style={{
            position: 'absolute',
            right: '0',
            top: '-20px',
            height: '110%',
            width: '45%',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=800&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath:
              'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)',
            opacity: 0.9,
            zIndex: 1,
            borderBottomLeftRadius:
              '40%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, #e0f2fe, transparent)',
            }}
          />
        </div>

      </section>


      {/* =====================================================
          MAIN LAYOUT
          ===================================================== */}

      <div
        style={{
          display: 'flex',
          padding: '2rem 4rem',
          gap: '2rem',
          alignItems: 'flex-start',
          position: 'relative',
        }}
      >

        {/* ===================================================
            SIDEBAR
            =================================================== */}

        <div
          style={{
            width: '280px',
            flexShrink: 0,
            background: 'white',
            borderRadius: '1rem',
            border:
              '1px solid var(--color-border)',
            padding: '1.5rem',
            boxShadow:
              '0 4px 6px -1px rgba(0,0,0,0.02)',
          }}
        >

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}
          >

            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color:
                  'var(--color-text)',
              }}
            >
              Filters
            </h2>

            <button
              type="button"
              onClick={clearAll}
              style={{
                color: '#1d4ed8',
                fontWeight: '600',
                fontSize: '0.9rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            >
              Clear All
            </button>

          </div>


          {/* Category */}

          <div
            style={{
              marginBottom: '1.5rem',
              borderBottom:
                '1px solid var(--color-border)',
              paddingBottom: '1.5rem',
            }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                fontWeight: '600',
              }}
            >
              Category
              <ChevronUp size={16} />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >

              {[
                'Adventure',
                'Sightseeing',
                'Food & Dining',
                'Culture',
                'Shopping',
                'Nature',
              ].map(cat => (

                <label
                  key={cat}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.9rem',
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >

                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(
                      cat
                    )}
                    onChange={() =>
                      toggleFilter(
                        cat,
                        setSelectedCategories,
                        selectedCategories
                      )
                    }
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor:
                        '#1d4ed8',
                    }}
                  />

                  {cat}

                </label>

              ))}

            </div>

          </div>


          {/* Cost */}

          <div
            style={{
              marginBottom: '1.5rem',
              borderBottom:
                '1px solid var(--color-border)',
              paddingBottom: '1.5rem',
            }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                fontWeight: '600',
              }}
            >
              Cost
              <ChevronUp size={16} />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >

              {['$', '$$', '$$$', '$$$$'].map(
                cost => (

                  <label
                    key={cost}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.9rem',
                      color: '#334155',
                      cursor: 'pointer',
                    }}
                  >

                    <input
                      type="checkbox"
                      checked={selectedCosts.includes(
                        cost
                      )}
                      onChange={() =>
                        toggleFilter(
                          cost,
                          setSelectedCosts,
                          selectedCosts
                        )
                      }
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor:
                          '#1d4ed8',
                      }}
                    />

                    {cost}

                  </label>

                )
              )}

            </div>

          </div>


          {/* Duration */}

          <div
            style={{
              marginBottom: '1.5rem',
              borderBottom:
                '1px solid var(--color-border)',
              paddingBottom: '1.5rem',
            }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                fontWeight: '600',
              }}
            >
              Duration
              <ChevronUp size={16} />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >

              {[
                'Under 2 hours',
                '2-4 hours',
                '4+ hours',
              ].map(duration => (

                <label
                  key={duration}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.9rem',
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >

                  <input
                    type="checkbox"
                    checked={selectedDurations.includes(
                      duration
                    )}
                    onChange={() =>
                      toggleFilter(
                        duration,
                        setSelectedDurations,
                        selectedDurations
                      )
                    }
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor:
                        '#1d4ed8',
                    }}
                  />

                  {duration}

                </label>

              ))}

            </div>

          </div>


          {/* Rating */}

          <div>

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                fontWeight: '600',
              }}
            >
              Rating
              <ChevronUp size={16} />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >

              {[
                '4.5+',
                '4.0+',
                '3.5+',
              ].map(rate => (

                <label
                  key={rate}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.9rem',
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >

                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(
                      rate
                    )}
                    onChange={() =>
                      toggleFilter(
                        rate,
                        setSelectedRatings,
                        selectedRatings
                      )
                    }
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor:
                        '#1d4ed8',
                    }}
                  />

                  {rate}

                </label>

              ))}

            </div>

          </div>

        </div>


        {/* ===================================================
            RESULTS
            =================================================== */}

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >

          {/* Toolbar */}

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >

            <div
              style={{
                display: 'flex',
                gap: '1rem',
              }}
            >

              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'white',
                  border:
                    '1px solid var(--color-border)',
                  padding:
                    '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <Filter size={16} />
                Filter
                <ChevronDown size={14} />
              </button>


              <select
                value={groupBy}
                onChange={e =>
                  setGroupBy(
                    e.target.value
                  )
                }
                style={{
                  background: 'white',
                  border:
                    '1px solid var(--color-border)',
                  padding:
                    '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                }}
              >
                <option value="none">
                  Group By
                </option>
                <option value="country">
                  Country
                </option>
                <option value="category">
                  Category
                </option>
              </select>


              <select
                value={sortBy}
                onChange={e =>
                  setSortBy(
                    e.target.value
                  )
                }
                style={{
                  background: 'white',
                  border:
                    '1px solid var(--color-border)',
                  padding:
                    '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                }}
              >
                <option value="rating">
                  Sort: Popular
                </option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="name">
                  Name
                </option>
              </select>

            </div>


            <button
              type="button"
              onClick={clearAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color:
                  'var(--color-text-muted)',
                background: 'none',
                border: 'none',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
              Clear All
            </button>

          </div>


          {/* Result Heading */}

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
            }}
          >

            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color:
                  'var(--color-text)',
              }}
            >
              {searchQuery
                ? `Results for "${searchQuery}"`
                : searchType ===
                  'activities'
                  ? 'Popular Activities'
                  : 'Popular Cities'}
            </h2>

            <span
              style={{
                color:
                  'var(--color-text-muted)',
                fontSize: '0.9rem',
              }}
            >
              Results · {filteredResults.length}
            </span>

          </div>


          {/* Added Activities */}

          {addedActivities.length > 0 && (
            <div
              style={{
                background: '#eff6ff',
                border:
                  '1px solid #bfdbfe',
                borderRadius: '0.75rem',
                padding: '1rem',
              }}
            >

              <div
                style={{
                  fontWeight: '700',
                  color: '#1e3a8a',
                  marginBottom:
                    '0.75rem',
                }}
              >
                Added to your trip
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >

                {addedActivities.map(
                  activity => (

                    <div
                      key={activity.id}
                      style={{
                        display: 'flex',
                        alignItems:
                          'center',
                        gap: '0.5rem',
                        background:
                          'white',
                        border:
                          '1px solid #bfdbfe',
                        borderRadius:
                          '2rem',
                        padding:
                          '0.4rem 0.75rem',
                        fontSize:
                          '0.85rem',
                      }}
                    >

                      <Check
                        size={14}
                        color="#16a34a"
                      />

                      {activity.title}

                      <X
                        size={14}
                        color="#64748b"
                        onClick={() =>
                          removeActivity(
                            activity.id
                          )
                        }
                        style={{
                          cursor:
                            'pointer',
                        }}
                      />

                    </div>

                  )
                )}

              </div>

            </div>
          )}


          {/* Empty State */}

          {filteredResults.length === 0 && (
            <div
              style={{
                background: 'white',
                borderRadius: '1rem',
                border:
                  '1px solid var(--color-border)',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >

              <Search
                size={40}
                color="#94a3b8"
                style={{
                  marginBottom:
                    '1rem',
                }}
              />

              <h3
                style={{
                  fontSize: '1.2rem',
                  marginBottom:
                    '0.5rem',
                }}
              >
                No results found
              </h3>

              <p
                style={{
                  color:
                    'var(--color-text-muted)',
                }}
              >
                Try another search or
                clear some filters.
              </p>

            </div>
          )}


          {/* Result Cards */}

          {filteredResults.map(item => (

            <div
              key={item.id}
              style={{
                display: 'flex',
                background: 'white',
                borderRadius: '1rem',
                border:
                  '1px solid var(--color-border)',
                overflow: 'hidden',
                height: '180px',
                boxShadow:
                  '0 4px 6px -1px rgba(0,0,0,0.02)',
              }}
            >

              <div
                style={{
                  width: '280px',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >

                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <Heart size={20} />
                </div>

              </div>


              <div
                style={{
                  padding: '1.25rem',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems:
                      'flex-start',
                  }}
                >

                  <div>

                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color:
                          'var(--color-text)',
                        marginBottom:
                          '0.25rem',
                      }}
                    >
                      {item.title}
                    </h3>

                    <div
                      style={{
                        display: 'flex',
                        alignItems:
                          'center',
                        gap: '1rem',
                        fontSize:
                          '0.85rem',
                        color:
                          'var(--color-text-muted)',
                      }}
                    >

                      <span
                        style={{
                          display: 'flex',
                          alignItems:
                            'center',
                          gap: '0.25rem',
                        }}
                      >
                        <MapPin size={14} />
                        {item.loc}
                      </span>

                      <span
                        style={{
                          display: 'flex',
                          alignItems:
                            'center',
                          gap: '0.25rem',
                          color: '#d97706',
                        }}
                      >
                        <Star
                          size={14}
                          fill="currentColor"
                        />

                        <span
                          style={{
                            color:
                              'var(--color-text-muted)',
                          }}
                        >
                          {item.rate}
                        </span>
                      </span>

                    </div>

                  </div>

                </div>


                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.75rem',
                    marginBottom:
                      '0.75rem',
                  }}
                >

                  {item.tags.map(
                    (tag, index) => (

                      <span
                        key={index}
                        style={{
                          background:
                            tag.c,
                          color:
                            tag.tc,
                          fontSize:
                            '0.75rem',
                          fontWeight:
                            '600',
                          padding:
                            '0.2rem 0.6rem',
                          borderRadius:
                            '2rem',
                        }}
                      >
                        {tag.t}
                      </span>

                    )
                  )}

                </div>


                <p
                  style={{
                    fontSize: '0.9rem',
                    color:
                      'var(--color-text-muted)',
                    flex: 1,
                  }}
                >
                  {item.desc}
                </p>


                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems:
                      'flex-end',
                    marginTop: 'auto',
                  }}
                >

                  <div
                    style={{
                      fontSize: '0.9rem',
                      color:
                        'var(--color-text-muted)',
                    }}
                  >
                    From

                    <span
                      style={{
                        color: '#10b981',
                        fontWeight: '700',
                        fontSize:
                          '1.1rem',
                        marginLeft:
                          '0.25rem',
                      }}
                    >
                      ${item.price}
                    </span>

                    {' '} / person
                  </div>


                  <div
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                    }}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedActivity(
                          item
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
                          '0.5rem 1.25rem',
                        borderRadius:
                          '0.5rem',
                        fontWeight:
                          '600',
                        cursor:
                          'pointer',
                      }}
                    >
                      View Details
                    </button>


                    <button
                      type="button"
                      onClick={() => {

                        if (
                          isAdded(
                            item.id
                          )
                        ) {
                          removeActivity(
                            item.id
                          );
                        } else {
                          openAddPanel(
                            item
                          );
                        }

                      }}
                      style={{
                        background:
                          isAdded(
                            item.id
                          )
                            ? '#16a34a'
                            : '#1d4ed8',
                        color: 'white',
                        border: 'none',
                        padding:
                          '0.5rem 1.25rem',
                        borderRadius:
                          '0.5rem',
                        fontWeight:
                          '600',
                        cursor:
                          'pointer',
                        display: 'flex',
                        alignItems:
                          'center',
                        gap: '0.25rem',
                      }}
                    >

                      {isAdded(item.id) ? (
                        <>
                          <Check size={16} />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Add to Trip
                        </>
                      )}

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          ACTIVITY DETAILS MODAL
          ===================================================== */}

      {selectedActivity && (

        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'rgba(15,23,42,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '2rem',
          }}
          onClick={() =>
            setSelectedActivity(null)
          }
        >

          <div
            style={{
              width: 'min(800px, 100%)',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'white',
              borderRadius: '1rem',
              boxShadow:
                '0 20px 40px rgba(0,0,0,0.2)',
            }}
            onClick={e =>
              e.stopPropagation()
            }
          >

            <div
              style={{
                display: 'flex',
                height: '280px',
              }}
            >

              <img
                src={selectedActivity.img}
                alt={
                  selectedActivity.title
                }
                style={{
                  width: '40%',
                  objectFit: 'cover',
                }}
              />

              <div
                style={{
                  padding: '1.5rem',
                  flex: 1,
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                  }}
                >

                  <h3
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color:
                        'var(--color-text)',
                    }}
                  >
                    {
                      selectedActivity.title
                    }
                  </h3>

                  <X
                    size={20}
                    onClick={() =>
                      setSelectedActivity(
                        null
                      )
                    }
                    style={{
                      cursor:
                        'pointer',
                    }}
                  />

                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '1rem',
                    marginTop:
                      '0.75rem',
                    color:
                      'var(--color-text-muted)',
                  }}
                >

                  <span
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',
                      gap: '0.25rem',
                    }}
                  >
                    <MapPin size={14} />
                    {
                      selectedActivity.loc
                    }
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',
                      gap: '0.25rem',
                      color: '#d97706',
                    }}
                  >
                    <Star
                      size={14}
                      fill="currentColor"
                    />
                    {
                      selectedActivity.rate
                    }
                  </span>

                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop:
                      '1rem',
                  }}
                >

                  {selectedActivity.tags.map(
                    (tag, index) => (

                      <span
                        key={index}
                        style={{
                          background:
                            tag.c,
                          color:
                            tag.tc,
                          fontSize:
                            '0.75rem',
                          fontWeight:
                            '600',
                          padding:
                            '0.2rem 0.6rem',
                          borderRadius:
                            '2rem',
                        }}
                      >
                        {tag.t}
                      </span>

                    )
                  )}

                </div>

                <p
                  style={{
                    marginTop:
                      '1.25rem',
                    color:
                      'var(--color-text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {
                    selectedActivity.desc
                  }
                </p>

                <div
                  style={{
                    marginTop:
                      '1rem',
                    fontSize:
                      '0.9rem',
                    color:
                      'var(--color-text-muted)',
                  }}
                >
                  From

                  <strong
                    style={{
                      color: '#10b981',
                      fontSize:
                        '1.2rem',
                      marginLeft:
                        '0.25rem',
                    }}
                  >
                    $
                    {
                      selectedActivity.price
                    }
                  </strong>

                  {' '} / person
                </div>

              </div>

            </div>


            <div
              style={{
                padding:
                  '1.25rem 1.5rem',
                display: 'flex',
                justifyContent:
                  'flex-end',
                gap: '0.75rem',
                borderTop:
                  '1px solid #e2e8f0',
              }}
            >

              <button
                type="button"
                onClick={() =>
                  setSelectedActivity(
                    null
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
                    '0.6rem 1.25rem',
                  borderRadius:
                    '0.5rem',
                  fontWeight:
                    '600',
                  cursor:
                    'pointer',
                }}
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {

                  if (
                    isAdded(
                      selectedActivity.id
                    )
                  ) {
                    removeActivity(
                      selectedActivity.id
                    );
                  } else {
                    openAddPanel(
                      selectedActivity
                    );
                  }

                  setSelectedActivity(
                    null
                  );

                }}
                style={{
                  background:
                    isAdded(
                      selectedActivity.id
                    )
                      ? '#16a34a'
                      : '#1d4ed8',
                  color: 'white',
                  border: 'none',
                  padding:
                    '0.6rem 1.25rem',
                  borderRadius:
                    '0.5rem',
                  fontWeight:
                    '600',
                  cursor:
                    'pointer',
                  display: 'flex',
                  alignItems:
                    'center',
                  gap: '0.25rem',
                }}
              >

                {isAdded(
                  selectedActivity.id
                ) ? (
                  <>
                    <Check size={16} />
                    Added
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Add to Trip
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          ADD TO TRIP PANEL
          ===================================================== */}

      {showAddPanel &&
        activityToAdd && (

          <div
            style={{
              position: 'fixed',
              inset: 0,
              background:
                'rgba(15,23,42,0.25)',
              zIndex: 300,
            }}
            onClick={() => {
              setShowAddPanel(false);
              setActivityToAdd(null);
            }}
          >

            <div
              style={{
                position: 'absolute',
                right: '2rem',
                bottom: '2rem',
                width: '360px',
                background: 'white',
                borderRadius: '1rem',
                boxShadow:
                  '0 20px 40px rgba(0,0,0,0.2)',
                border:
                  '1px solid var(--color-border)',
                padding: '1.25rem',
              }}
              onClick={e =>
                e.stopPropagation()
              }
            >

              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  marginBottom:
                    '1rem',
                }}
              >

                <h3
                  style={{
                    fontSize:
                      '1.1rem',
                    fontWeight:
                      '700',
                    color:
                      'var(--color-text)',
                  }}
                >
                  Add to Trip
                </h3>

                <X
                  size={16}
                  color="#64748b"
                  onClick={() => {
                    setShowAddPanel(
                      false
                    );
                    setActivityToAdd(
                      null
                    );
                  }}
                  style={{
                    cursor:
                      'pointer',
                  }}
                />

              </div>


              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginBottom:
                    '1.25rem',
                }}
              >

                <img
                  src={activityToAdd.img}
                  alt={
                    activityToAdd.title
                  }
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius:
                      '0.5rem',
                    objectFit:
                      'cover',
                  }}
                />

                <div>

                  <div
                    style={{
                      fontSize:
                        '0.9rem',
                      fontWeight:
                        '700',
                      color:
                        'var(--color-text)',
                    }}
                  >
                    {
                      activityToAdd.title
                    }
                  </div>

                  <div
                    style={{
                      fontSize:
                        '0.75rem',
                      color:
                        'var(--color-text-muted)',
                      display: 'flex',
                      alignItems:
                        'center',
                      gap: '0.2rem',
                      marginTop:
                        '0.2rem',
                    }}
                  >
                    <MapPin size={11} />

                    {
                      activityToAdd.loc
                    }
                  </div>

                  <div
                    style={{
                      fontSize:
                        '0.8rem',
                      color:
                        'var(--color-text-muted)',
                      marginTop:
                        '0.2rem',
                    }}
                  >
                    From

                    <span
                      style={{
                        color:
                          '#10b981',
                        fontWeight:
                          '600',
                        marginLeft:
                          '0.2rem',
                      }}
                    >
                      $
                      {
                        activityToAdd.price
                      }
                    </span>

                    {' '} / person
                  </div>

                </div>

              </div>


              <div
                style={{
                  marginBottom:
                    '1rem',
                }}
              >

                <label
                  style={{
                    display:
                      'block',
                    fontSize:
                      '0.75rem',
                    color:
                      'var(--color-text-muted)',
                    marginBottom:
                      '0.25rem',
                  }}
                >
                  Select trip
                </label>

                <div
                  style={{
                    display:
                      'flex',
                    justifyContent:
                      'space-between',
                    alignItems:
                      'center',
                    border:
                      '1px solid var(--color-border)',
                    padding:
                      '0.6rem 0.75rem',
                    borderRadius:
                      '0.5rem',
                    fontSize:
                      '0.85rem',
                  }}
                >
                  European Summer Escape

                  <ChevronDown
                    size={14}
                    color="#64748b"
                  />

                </div>

              </div>


              <div
                style={{
                  marginBottom:
                    '1rem',
                }}
              >

                <label
                  style={{
                    display:
                      'block',
                    fontSize:
                      '0.75rem',
                    color:
                      'var(--color-text-muted)',
                    marginBottom:
                      '0.25rem',
                  }}
                >
                  Select date
                </label>

                <div
                  style={{
                    display:
                      'flex',
                    alignItems:
                      'center',
                    gap: '0.5rem',
                    border:
                      '1px solid var(--color-border)',
                    padding:
                      '0.6rem 0.75rem',
                    borderRadius:
                      '0.5rem',
                    fontSize:
                      '0.85rem',
                  }}
                >
                  <Calendar
                    size={14}
                    color="#64748b"
                  />

                  Jun 15, 2026

                </div>

              </div>


              <div
                style={{
                  marginBottom:
                    '1.25rem',
                }}
              >

                <span
                  style={{
                    display:
                      'block',
                    fontSize:
                      '0.75rem',
                    color:
                      'var(--color-text-muted)',
                  }}
                >
                  Estimated cost
                </span>

                <span
                  style={{
                    fontSize:
                      '1.25rem',
                    fontWeight:
                      '800',
                    color:
                      '#0f172a',
                  }}
                >
                  $
                  {
                    activityToAdd.price
                  }
                </span>

              </div>


              <div
                style={{
                  display:
                    'flex',
                  gap:
                    '0.5rem',
                }}
              >

                <button
                  type="button"
                  onClick={() => {
                    setShowAddPanel(
                      false
                    );
                    setActivityToAdd(
                      null
                    );
                  }}
                  style={{
                    flex: 1,
                    background:
                      'white',
                    color:
                      'var(--color-text)',
                    border:
                      '1px solid var(--color-border)',
                    padding:
                      '0.6rem',
                    borderRadius:
                      '0.5rem',
                    fontWeight:
                      '600',
                    fontSize:
                      '0.85rem',
                    cursor:
                      'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    confirmAddActivity
                  }
                  style={{
                    flex: 1,
                    background:
                      '#1d4ed8',
                    color:
                      'white',
                    border:
                      'none',
                    padding:
                      '0.6rem',
                    borderRadius:
                      '0.5rem',
                    fontWeight:
                      '600',
                    fontSize:
                      '0.85rem',
                    cursor:
                      'pointer',
                    display:
                      'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center',
                    gap:
                      '0.25rem',
                  }}
                >
                  <Plus size={14} />
                  Add Activity
                </button>

              </div>

            </div>

          </div>

        )}


      {/* =====================================================
          TOAST
          ===================================================== */}

      {showToast && (

        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            background: '#0f172a',
            color: 'white',
            padding:
              '1rem 1.25rem',
            borderRadius:
              '0.5rem',
            display: 'flex',
            alignItems:
              'center',
            gap: '1rem',
            boxShadow:
              '0 10px 15px -3px rgba(0,0,0,0.1)',
            zIndex: 400,
          }}
        >

          <CheckCircle2
            size={24}
            color="#10b981"
          />

          <div
            style={{
              paddingRight:
                '1rem',
            }}
          >

            <div
              style={{
                fontSize:
                  '0.9rem',
                fontWeight:
                  '600',
              }}
            >
              {toastMessage}
            </div>

            <div
              style={{
                fontSize:
                  '0.8rem',
                color:
                  '#94a3b8',
              }}
            >
              You can view it in your itinerary.
            </div>

          </div>

          <X
            size={16}
            color="#94a3b8"
            onClick={() =>
              setShowToast(false)
            }
            style={{
              cursor:
                'pointer',
            }}
          />

        </div>

      )}

    </div>
  );
};

export default Explore;