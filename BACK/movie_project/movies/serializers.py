from rest_framework import serializers
from .models import Genero, Pelicula

class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'

class PeliculaSerializer(serializers.ModelSerializer):
    generos = serializers.PrimaryKeyRelatedField(queryset=Genero.objects.all(), many=True)
    # generos = GeneroSerializer(many=True, read_only=True)
    class Meta:
        model = Pelicula
        fields = '__all__'

    def create(self, validated_data):
        generos_data = validated_data.pop('generos')
        pelicula = Pelicula.objects.create(**validated_data)
        pelicula.generos.set(generos_data)
        return pelicula

    def update(self, instance, validated_data):
        generos_data = validated_data.pop('generos')
        instance.titulo = validated_data.get('titulo', instance.titulo)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.poster_url = validated_data.get('poster_url', instance.poster_url)
        instance.save()
        instance.generos.set(generos_data)
        return instance