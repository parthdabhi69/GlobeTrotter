# destination/services.py
import os
import requests
import re

# ============================================================
# API URLS
# ============================================================

GEOAPIFY_GEOCODING_URL = "https://api.geoapify.com/v1/geocode/search"
GEOAPIFY_PLACES_URL = "https://api.geoapify.com/v2/places"
GEOAPIFY_DETAILS_URL = "https://api.geoapify.com/v2/place-details"
WIKIPEDIA_SEARCH_URL = "https://en.wikipedia.org/w/rest.php/v1/search/page"

# ============================================================
# IMAGE FILTERING - EXPANDED
# ============================================================

BAD_IMAGE_TERMS = [
    # Sports
    "football", "soccer", "basketball", "cricket", "rugby",
    "baseball", "hockey", "tennis", "golf", "volleyball",
    "badminton", "table tennis", "handball", "water polo",
    "football club", "soccer club", "basketball club",
    "cricket club", "rugby club", "club", "team", "player",
    "footballer", "athlete", "stadium", "arena", "logo",
    "badge", "crest", "emblem", "jersey", "kit", "coach",
    "manager", "league", "championship", "tournament",
    "sports", "fc", "cf", "sc", "ac", "sporting",
    
    # Generic/Non-landmark
    "flag", "map", "icon", "symbol", "illustration",
    "drawing", "painting", "artwork", "graphic",
    
    # People
    "portrait", "person", "people", "crowd", "fan",
    
    # Food (unless it's a food destination)
    "pizza", "burger", "pasta", "sushi", "taco",
]

# ============================================================
# HIGH QUALITY IMAGE FILTERS
# ============================================================

def is_low_quality_image(image_url):
    """Check if image is likely low quality or blurry."""
    if not image_url:
        return True
    
    # Check for small image dimensions (blurry)
    if "width=" in image_url:
        match = re.search(r'width=(\d+)', image_url)
        if match and int(match.group(1)) < 400:
            return True
    
    # Check for thumbnail indicators
    low_quality_patterns = [
        r'thumb/',
        r'/thumb/',
        r'_\d+px-',
        r'-\d+x\d+',
        r'scale-to-width-down/\d+',
    ]
    
    for pattern in low_quality_patterns:
        if re.search(pattern, image_url, re.IGNORECASE):
            return True
    
    return False

def enhance_image_url(image_url):
    """Get higher quality version of the image."""
    if not image_url:
        return ""
    
    # Remove thumbnail restrictions
    # Wikipedia: replace size with larger
    if "wikipedia" in image_url:
        # Remove size constraints
        image_url = re.sub(r'/\d+px-', '/1024px-', image_url)
        image_url = re.sub(r'-\d+x\d+\.', '.', image_url)
    
    # Ensure HTTPS
    if image_url.startswith("//"):
        image_url = "https:" + image_url
    
    return image_url

# ============================================================
# GEOAPIFY API KEY
# ============================================================

def get_geoapify_key():
    api_key = os.getenv("GEOAPIFY_API_KEY")
    if not api_key:
        raise RuntimeError("GEOAPIFY_API_KEY is missing from .env")
    return api_key

# ============================================================
# CHECK WHETHER WIKIPEDIA RESULT IS A BAD IMAGE
# ============================================================

def is_bad_wikipedia_result(title, description=""):
    text = f"{title} {description}".lower()
    
    # Check for sports/team keywords
    for term in BAD_IMAGE_TERMS:
        if term in text:
            return True
    
    # Additional check: if it has "FC", "SC", etc.
    if re.search(r'\b(fc|cf|sc|ac|united|city|rovers|wanderers)\b', text, re.IGNORECASE):
        if "football" in text or "soccer" in text:
            return True
    
    return False

# ============================================================
# WIKIPEDIA IMAGE - IMPROVED
# ============================================================

def get_wikipedia_image(place_name, city="", country=""):
    if not place_name:
        return ""
    
    # Clean place name - remove common suffixes
    clean_name = re.sub(r'\s*(city|town|village|region|province|state)$', '', place_name, flags=re.IGNORECASE)
    
    search_query = " ".join(part for part in [clean_name, city, country] if part)
    
    params = {
        "q": search_query,
        "limit": 10,
    }
    
    headers = {
        "User-Agent": "GlobeTrotter/1.0 (travel-planning-project)"
    }
    
    try:
        response = requests.get(WIKIPEDIA_SEARCH_URL, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        for page in data.get("pages", []):
            title = page.get("title", "")
            description = page.get("description", "")
            
            # Reject sports/team/etc.
            if is_bad_wikipedia_result(title, description):
                continue
            
            thumbnail = page.get("thumbnail")
            if not thumbnail:
                continue
            
            image_url = thumbnail.get("url")
            if not image_url:
                continue
            
            # Fix protocol-relative URLs
            if image_url.startswith("//"):
                image_url = "https:" + image_url
            
            # Enhance image quality
            image_url = enhance_image_url(image_url)
            
            # Skip low quality images
            if is_low_quality_image(image_url):
                continue
            
            return image_url
            
    except requests.RequestException as error:
        print("Wikipedia image error:", error)
    
    return ""

# ============================================================
# GEOAPIFY PLACE IMAGE - IMPROVED
# ============================================================

def get_place_image(place_id):
    if not place_id:
        return ""
    
    params = {
        "id": place_id,
        "features": "details",
        "lang": "en",
        "apiKey": get_geoapify_key(),
    }
    
    try:
        response = requests.get(GEOAPIFY_DETAILS_URL, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        for feature in data.get("features", []):
            properties = feature.get("properties", {})
            if properties.get("feature_type") != "details":
                continue
            
            wiki_and_media = properties.get("wiki_and_media", {})
            image = wiki_and_media.get("image", "")
            
            if image:
                # Enhance image quality
                image = enhance_image_url(image)
                if not is_low_quality_image(image):
                    return image
                
    except requests.RequestException as error:
        print("Geoapify image error:", error)
    
    return ""

# ============================================================
# FIND BEST IMAGE - IMPROVED
# ============================================================

def get_best_destination_image(name, city="", country="", place_id=""):
    # Try Geoapify first (usually better quality)
    image = get_place_image(place_id)
    if image:
        return image
    
    # Try Wikipedia with better search
    image = get_wikipedia_image(name, city, country)
    if image:
        return image
    
    # Try with just city and country if name failed
    if city and country:
        image = get_wikipedia_image(city, "", country)
        if image:
            return image
    
    # Try with just country as last resort
    if country:
        image = get_wikipedia_image(country, "", "")
        if image:
            return image
    
    return ""

# ============================================================
# GLOBAL GEOCODING
# ============================================================

def geocode_global(query):
    if not query:
        return []
    
    params = {
        "text": query,
        "filter": "countrycode:none",
        "limit": 10,
        "lang": "en",
        "apiKey": get_geoapify_key(),
    }
    
    response = requests.get(GEOAPIFY_GEOCODING_URL, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()
    return data.get("results", [])

# ============================================================
# NORMALIZE GEOCODING RESULT
# ============================================================

def normalize_geocoding_result(result):
    place_id = result.get("place_id", "")
    
    name = (
        result.get("name") or 
        result.get("city") or 
        result.get("address_line1") or 
        result.get("formatted") or 
        "Unnamed destination"
    )
    
    # Clean up name
    name = re.sub(r',\s*[^,]+$', '', name)  # Remove everything after last comma
    
    city = result.get("city", "")
    country = result.get("country", "")
    latitude = result.get("lat")
    longitude = result.get("lon")
    
    image = get_best_destination_image(name, city, country, place_id)
    
    return {
        "id": place_id,
        "name": name,
        "country": country,
        "city": city,
        "latitude": latitude,
        "longitude": longitude,
        "image": image,
        "formatted": result.get("formatted", ""),
        "categories": result.get("categories", []),
    }

# ============================================================
# NORMALIZE PLACE RESULT
# ============================================================

def normalize_place(feature):
    properties = feature.get("properties", {})
    geometry = feature.get("geometry", {})
    coordinates = geometry.get("coordinates", [])
    
    longitude = None
    latitude = None
    if isinstance(coordinates, list) and len(coordinates) >= 2:
        longitude = coordinates[0]
        latitude = coordinates[1]
    
    place_id = properties.get("place_id", "")
    
    name = (
        properties.get("name") or 
        properties.get("address_line1") or 
        properties.get("formatted") or 
        "Unnamed destination"
    )
    
    city = properties.get("city", "")
    country = properties.get("country", "")
    
    image = get_best_destination_image(name, city, country, place_id)
    
    return {
        "id": place_id,
        "name": name,
        "country": country,
        "city": city,
        "latitude": latitude,
        "longitude": longitude,
        "image": image,
        "formatted": properties.get("formatted", ""),
        "categories": properties.get("categories", []),
    }

# ============================================================
# GET TOURIST PLACES AROUND A DESTINATION
# ============================================================

def get_places_for_location(latitude, longitude, radius=50000, limit=20):
    if latitude is None or longitude is None:
        return []
    
    params = {
        "categories": "tourism.sights,tourism.attraction,tourism",
        "filter": f"circle:{longitude},{latitude},{radius}",
        "bias": f"proximity:{longitude},{latitude}",
        "limit": limit,
        "lang": "en",
        "apiKey": get_geoapify_key(),
    }
    
    response = requests.get(GEOAPIFY_PLACES_URL, params=params, timeout=10)
    response.raise_for_status()
    data = response.json()
    
    destinations = []
    for feature in data.get("features", []):
        destination = normalize_place(feature)
        destinations.append(destination)
    
    return destinations

# ============================================================
# SEARCH DESTINATIONS - FIXED
# ============================================================

def search_destinations(query):
    query = query.strip()
    if not query:
        return []
    
    try:
        results = geocode_global(query)
        if not results:
            return []
        
        # Direct amenity results
        direct_results = []
        for result in results:
            result_type = result.get("result_type", "")
            if result_type == "amenity":
                destination = normalize_geocoding_result(result)
                direct_results.append(destination)
        
        if direct_results:
            return direct_results
        
        # Search around best result
        best_result = results[0]
        latitude = best_result.get("lat")
        longitude = best_result.get("lon")
        
        if latitude is None or longitude is None:
            return [normalize_geocoding_result(best_result)]
        
        destinations = get_places_for_location(latitude, longitude, radius=50000, limit=20)
        
        if not destinations:
            return [normalize_geocoding_result(best_result)]
        
        return destinations
        
    except Exception as error:
        print(f"Search error: {error}")
        return []

# ============================================================
# GLOBAL POPULAR DESTINATIONS - FIXED
# ============================================================

def get_global_popular_destinations():
    """Global dashboard destinations - no location bias."""
    
    popular_queries = [
        "Paris France",
        "Tokyo Japan", 
        "London United Kingdom",
        "Dubai United Arab Emirates",
        "New York United States",
        "Rome Italy",
        "Singapore",
        "Barcelona Spain",
        "Sydney Australia",
        "Bangkok Thailand",
        "Istanbul Turkey",
        "Mumbai India",
        "Cape Town South Africa",
        "Rio de Janeiro Brazil",
        "Marrakech Morocco",
        "Prague Czech Republic",
        "Amsterdam Netherlands",
        "Oslo Norway",
        "San Francisco United States",
        "Chicago United States",
    ]
    
    destinations = []
    
    for query in popular_queries:
        try:
            results = geocode_global(query)
            if not results:
                continue
            
            result = results[0]
            destination = normalize_geocoding_result(result)
            
            # Skip results without proper name
            if not destination["name"] or destination["name"] == "Unnamed destination":
                continue
            
            # Skip results with no image
            if not destination["image"]:
                continue
            
            # Check if image is a valid looking URL
            if destination["image"]:
                # Ensure it's a proper image URL
                if not any(ext in destination["image"].lower() for ext in ['.jpg', '.jpeg', '.png', '.webp', '.svg']):
                    continue
                if "placeholder" in destination["image"].lower():
                    continue
                if "blank" in destination["image"].lower():
                    continue
            
            destinations.append(destination)
            
            if len(destinations) >= 10:
                break
                
        except requests.RequestException as error:
            print(f"Popular destination error for {query}: {error}")
        except Exception as error:
            print(f"Destination processing error for {query}: {error}")
    
    return destinations