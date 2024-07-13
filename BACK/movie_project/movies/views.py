from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Genero, Pelicula
from .serializers import GeneroSerializer, PeliculaSerializer

class GeneroViewSet(viewsets.ModelViewSet):
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer

    @action(detail=True, methods=['get'])
    def peliculas(self, request, pk=None):
        genero = self.get_object()
        # peliculas = genero.peliculas.all()
        peliculas = genero.peliculas.all()  # Usar related_name para acceder a las películas
        serializer = PeliculaSerializer(peliculas, many=True)
        return Response(serializer.data)

class PeliculaViewSet(viewsets.ModelViewSet):
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer
