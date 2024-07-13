import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenreService } from '../../services/genre.service';
import { MovieService } from '../../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css'
})
export class MovieFormComponent implements OnInit {
  movieForm: FormGroup;
  genres: any[] = [];

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private genreService: GenreService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      rating: [''],
      generos: [[]],
      poster_url: ['']  // Agrega este campo
    });
  }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }

  onCheckboxChange(event: any) {
    const selectedGeneros = this.movieForm.get('generos')?.value as number[];
    if (event.target.checked) {
      selectedGeneros.push(event.target.value);
    } else {
      const index = selectedGeneros.indexOf(event.target.value);
      if (index >= 0) {
        selectedGeneros.splice(index, 1);
      }
    }
    this.movieForm.patchValue({ generos: selectedGeneros });
  }

  submit(): void {
    this.movieService.addMovie(this.movieForm.value).subscribe(response => {
      console.log('Movie added:', response);
    });
  }

}