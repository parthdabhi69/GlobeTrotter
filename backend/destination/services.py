# destination/services.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()


def get_global_popular_destinations():
    """Return 25+ real destinations with high-quality, professional images"""
    
    return [
        # === EUROPE ===
        {
            "id": "1",
            "name": "Eiffel Tower",
            "country": "France",
            "city": "Paris",
            "latitude": 48.8584,
            "longitude": 2.2945,
            "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop&auto=format",
            "formatted": "Eiffel Tower, Paris, France"
        },
        {
            "id": "2",
            "name": "Colosseum",
            "country": "Italy",
            "city": "Rome",
            "latitude": 41.8902,
            "longitude": 12.4922,
            "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=500&fit=crop&auto=format",
            "formatted": "Colosseum, Rome, Italy"
        },
        {
            "id": "3",
            "name": "Big Ben",
            "country": "United Kingdom",
            "city": "London",
            "latitude": 51.5007,
            "longitude": -0.1246,
            "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop&auto=format",
            "formatted": "Big Ben, London, UK"
        },
        {
            "id": "4",
            "name": "Sagrada Familia",
            "country": "Spain",
            "city": "Barcelona",
            "latitude": 41.4036,
            "longitude": 2.1744,
            "image": "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=500&fit=crop&auto=format",
            "formatted": "Sagrada Familia, Barcelona, Spain"
        },
        {
            "id": "5",
            "name": "Neuschwanstein Castle",
            "country": "Germany",
            "city": "Schwangau",
            "latitude": 47.5576,
            "longitude": 10.7498,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0zDQsljmigu2B0LS8JHQCsUwdNXwJitIr8wVlf9w6Zg&s",
            "formatted": "Neuschwanstein Castle, Germany"
        },
        {
            "id": "6",
            "name": "Acropolis of Athens",
            "country": "Greece",
            "city": "Athens",
            "latitude": 37.9715,
            "longitude": 23.7257,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIaxQuLSPLVHrCkBELvpNyfF9kQEJtCUTIor3rMAKc7A&s=10",
            "formatted": "Acropolis, Athens, Greece"
        },
        {
            "id": "7",
            "name": "Amsterdam Canals",
            "country": "Netherlands",
            "city": "Amsterdam",
            "latitude": 52.3676,
            "longitude": 4.9041,
            "image": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=500&fit=crop&auto=format",
            "formatted": "Amsterdam Canals, Netherlands"
        },

        # === ASIA ===
        {
            "id": "8",
            "name": "Tokyo Tower",
            "country": "Japan",
            "city": "Tokyo",
            "latitude": 35.6586,
            "longitude": 139.7454,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy-0eGkOowDJ0U6gIdLlGweIaJDLIL-6oDcvanLd3QBQ&s=10",
            "formatted": "Tokyo Tower, Tokyo, Japan"
        },
        {
            "id": "9",
            "name": "Taj Mahal",
            "country": "India",
            "city": "Agra",
            "latitude": 27.1751,
            "longitude": 78.0421,
            "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=500&fit=crop&auto=format",
            "formatted": "Taj Mahal, Agra, India"
        },
        {
            "id": "10",
            "name": "Marina Bay Sands",
            "country": "Singapore",
            "city": "Singapore",
            "latitude": 1.2834,
            "longitude": 103.8607,
            "image": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=500&fit=crop&auto=format",
            "formatted": "Marina Bay Sands, Singapore"
        },
        {
            "id": "11",
            "name": "Burj Khalifa",
            "country": "UAE",
            "city": "Dubai",
            "latitude": 25.1972,
            "longitude": 55.2744,
            "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop&auto=format",
            "formatted": "Burj Khalifa, Dubai, UAE"
        },
        {
            "id": "12",
            "name": "Great Wall of China",
            "country": "China",
            "city": "Beijing",
            "latitude": 40.4319,
            "longitude": 116.5704,
            "image": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=500&fit=crop&auto=format",
            "formatted": "Great Wall, Beijing, China"
        },
        {
            "id": "13",
            "name": "Petronas Towers",
            "country": "Malaysia",
            "city": "Kuala Lumpur",
            "latitude": 3.1579,
            "longitude": 101.7117,
            "image": "https://images.unsplash.com/photo-1573487507483-86c6f1430ef1?w=800&h=500&fit=crop&auto=format",
            "formatted": "Petronas Towers, Kuala Lumpur, Malaysia"
        },
        {
            "id": "14",
            "name": "Angkor Wat",
            "country": "Cambodia",
            "city": "Siem Reap",
            "latitude": 13.4125,
            "longitude": 103.8660,
            "image": "https://images.unsplash.com/photo-1559738007-04a277d08a8c?w=800&h=500&fit=crop&auto=format",
            "formatted": "Angkor Wat, Siem Reap, Cambodia"
        },

        # === NORTH AMERICA ===
        {
            "id": "15",
            "name": "Statue of Liberty",
            "country": "USA",
            "city": "New York",
            "latitude": 40.6892,
            "longitude": -74.0445,
            "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=500&fit=crop&auto=format",
            "formatted": "Statue of Liberty, New York, USA"
        },
        {
            "id": "16",
            "name": "Golden Gate Bridge",
            "country": "USA",
            "city": "San Francisco",
            "latitude": 37.8199,
            "longitude": -122.4783,
            "image": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=500&fit=crop&auto=format",
            "formatted": "Golden Gate Bridge, San Francisco, USA"
        },
        {
            "id": "17",
            "name": "CN Tower",
            "country": "Canada",
            "city": "Toronto",
            "latitude": 43.6426,
            "longitude": -79.3871,
            "image": "https://images.unsplash.com/photo-1570790586853-4b1877114a2a?w=800&h=500&fit=crop&auto=format",
            "formatted": "CN Tower, Toronto, Canada"
        },

        # === SOUTH AMERICA ===
        {
            "id": "18",
            "name": "Christ the Redeemer",
            "country": "Brazil",
            "city": "Rio de Janeiro",
            "latitude": -22.9519,
            "longitude": -43.2105,
            "image": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=500&fit=crop&auto=format",
            "formatted": "Christ the Redeemer, Rio de Janeiro, Brazil"
        },
        {
            "id": "19",
            "name": "Machu Picchu",
            "country": "Peru",
            "city": "Cusco",
            "latitude": -13.1631,
            "longitude": -72.5450,
            "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=500&fit=crop&auto=format",
            "formatted": "Machu Picchu, Cusco, Peru"
        },

        # === AFRICA ===
        {
            "id": "20",
            "name": "Pyramids of Giza",
            "country": "Egypt",
            "city": "Cairo",
            "latitude": 29.9792,
            "longitude": 31.1342,
            "image": "https://images.unsplash.com/photo-1539656262152-6cb9103f1a33?w=800&h=500&fit=crop&auto=format",
            "formatted": "Pyramids of Giza, Cairo, Egypt"
        },
        {
            "id": "21",
            "name": "Table Mountain",
            "country": "South Africa",
            "city": "Cape Town",
            "latitude": -33.9249,
            "longitude": 18.4241,
            "image": "https://images.unsplash.com/photo-1512831838641-e3f6e759b6bf?w=800&h=500&fit=crop&auto=format",
            "formatted": "Table Mountain, Cape Town, South Africa"
        },

        # === OCEANIA ===
        {
            "id": "22",
            "name": "Sydney Opera House",
            "country": "Australia",
            "city": "Sydney",
            "latitude": -33.8568,
            "longitude": 151.2153,
            "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=500&fit=crop&auto=format",
            "formatted": "Sydney Opera House, Sydney, Australia"
        },
        {
            "id": "23",
            "name": "Hobbiton",
            "country": "New Zealand",
            "city": "Matamata",
            "latitude": -37.8720,
            "longitude": 175.6827,
            "image": "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=500&fit=crop&auto=format",
            "formatted": "Hobbiton, Matamata, New Zealand"
        },

        # === MIDDLE EAST ===
        {
            "id": "24",
            "name": "Petra",
            "country": "Jordan",
            "city": "Wadi Musa",
            "latitude": 30.3285,
            "longitude": 35.4444,
            "image": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&h=500&fit=crop&auto=format",
            "formatted": "Petra, Wadi Musa, Jordan"
        },
        {
            "id": "25",
            "name": "Cappadocia Balloons",
            "country": "Turkey",
            "city": "Göreme",
            "latitude": 38.6439,
            "longitude": 34.8299,
            "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop&auto=format",
            "formatted": "Cappadocia, Göreme, Turkey"
        }
    ]


def search_destinations(query):
    """Search through destinations"""
    all_destinations = get_global_popular_destinations()
    
    if not query or not query.strip():
        return all_destinations
    
    query_lower = query.lower().strip()
    results = []
    
    for dest in all_destinations:
        if (query_lower in dest['name'].lower() or 
            query_lower in dest['country'].lower() or
            query_lower in dest['city'].lower()):
            results.append(dest)
    
    return results if results else all_destinations[:5]