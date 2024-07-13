import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { GenreService } from '../../services/genre.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {
  movies: any[] = [];
  genres: any[] = [];
  selectedGenre: string = '';

  constructor(private movieService: MovieService, private genreService: GenreService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
    });
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  filterByGenre(genreId: string): void {
    this.genreService.getMoviesByGenre(genreId).subscribe(movies => {
      this.movies = movies;
      this.selectedGenre = genreId;
    });
  }

  shouldShowMovie(movie: any): boolean {
    return this.selectedGenre === '' || movie.generos.some((g: any) => g.nombre === this.selectedGenre);
  }
  editMovie(movieId: number): void {
    this.router.navigate(['/edit-movie', movieId]);
  }

  deleteMovie(movieId: number): void {
    this.movieService.deleteMovie(movieId).subscribe(() => {
      this.loadMovies();
    });
  }
}
