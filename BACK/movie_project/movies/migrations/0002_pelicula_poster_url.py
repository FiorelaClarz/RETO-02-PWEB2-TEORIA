# Generated by Django 5.0.6 on 2024-07-11 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pelicula',
            name='poster_url',
            field=models.URLField(blank=True),
        ),
    ]