# destination/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .services import get_global_popular_destinations, search_destinations


class PopularDestinationAPIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            destinations = get_global_popular_destinations()
            return Response(destinations)
        except Exception as e:
            print(f"Popular destinations error: {e}")
            # Return fallback data if API fails
            from .services import get_fallback_destinations
            return Response(get_fallback_destinations())


class SearchDestinationAPIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        query = request.query_params.get('q', '').strip()
        
        try:
            destinations = search_destinations(query)
            return Response(destinations)
        except Exception as e:
            print(f"Search error: {e}")
            return Response([])