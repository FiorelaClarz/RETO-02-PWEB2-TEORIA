# from django.db import models

# Create your models here.
from django.db import models

class Genero(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Pelicula(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    rating = models.FloatField()
    generos = models.ManyToManyField(Genero)
    poster_url = models.URLField(max_length=200, blank=True)  # Agrega este campo

    def __str__(self):
        return self.titulo
