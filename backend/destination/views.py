# destination/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .services import (
    get_global_popular_destinations,
    search_destinations,
)


class PopularDestinationAPIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            destinations = get_global_popular_destinations()
            
            # Return empty list instead of error if no destinations
            if not destinations:
                return Response([])
            
            return Response(destinations)
            
        except Exception as error:
            print(f"Popular destinations error: {error}")
            # Return empty list for frontend to handle gracefully
            return Response([], status=200)


class SearchDestinationAPIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        query = request.query_params.get("q", "").strip()
        
        # If no query, return popular destinations
        if not query:
            try:
                destinations = get_global_popular_destinations()
                return Response(destinations)
            except Exception as error:
                print(f"Fallback popular error: {error}")
                return Response([], status=200)
        
        try:
            destinations = search_destinations(query)
            
            # If search returns empty, fallback to popular
            if not destinations:
                destinations = get_global_popular_destinations()
            
            return Response(destinations)
            
        except Exception as error:
            print(f"Destination search error: {error}")
            # Fallback to popular destinations on error
            try:
                destinations = get_global_popular_destinations()
                return Response(destinations)
            except:
                return Response([], status=200)