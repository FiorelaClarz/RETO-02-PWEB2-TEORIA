import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-by-genre',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './movie-by-genre.component.html',
  styleUrl: './movie-by-genre.component.css'
})

export class MovieByGenreComponent implements OnInit {
  genres: any[] = [];
  movies: any[] = [];
  allMovies: any[] = [];
  contadorGeneral: Number=0;
  contadorEspecifico: Number=0;
  genreForm: FormGroup;
  selectedGenre: number = 0;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService
  ) {
    this.genreForm = this.fb.group({
      genreId: ['']
    });
  }

  ngOnInit(): void {
    this.loadGenres();
    this.loadMovies();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.allMovies = movies;
      this.movies = movies;

      
     this.contadorGeneral=this.movies.length; 
    });
  }

  onGenreChange(): void {
    const genreId = this.genreForm.get('genreId')?.value;
    this.selectedGenre = Number(genreId);
    this.filterMovies();
  }

  filterMovies(): void {
    if (this.selectedGenre) {
      this.movies = this.allMovies.filter(movie =>
        movie.generos.includes(this.selectedGenre)
      );

      this.contadorEspecifico=this.movies.length;
    } else {
      this.movies = this.allMovies;
    }
  }
}