import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css'
})

export class EditMovieComponent implements OnInit {
  movieForm: FormGroup;
  movieId: number = 0;
  genres: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      titulo: [''],
      descripcion: [''],
      rating: [0],
      poster_url: [''],
      generos: [[]]
    });
  }

  ngOnInit(): void {
    this.movieId = this.route.snapshot.params['id'];
    this.loadGenres();
    this.loadMovie();
  }

  loadGenres(): void {
    this.movieService.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  loadMovie(): void {
    this.movieService.getMovieById(this.movieId).subscribe(data => {
      this.movieForm.patchValue(data);
    });
  }

  onCheckboxChange(event: any): void {
    const selectedGenres = this.movieForm.get('generos')?.value as number[] ?? [];
    const genreId = +event.target.value; // Convert to number

    if (event.target.checked) {
      if (!selectedGenres.includes(genreId)) {
        selectedGenres.push(genreId);
      }
    } else {
      const index = selectedGenres.indexOf(genreId);
      if (index >= 0) {
        selectedGenres.splice(index, 1);
      }
    }
    this.movieForm.patchValue({ generos: selectedGenres });
  }

  isChecked(genreId: number): boolean {
    const selectedGenres = this.movieForm.get('generos')?.value as number[] ?? [];
    return selectedGenres.includes(genreId);
  }

  submit(): void {
    this.movieService.updateMovie(this.movieId, this.movieForm.value).subscribe(() => {
      this.router.navigate(['/movies']);
    });
  }
  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
// export class EditMovieComponent implements OnInit {
//   movieForm: FormGroup;
//   movieId: number = 0;
//   genres: any[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     private movieService: MovieService,
//     private router: Router
//   ) {
//     this.movieForm = this.fb.group({
//       titulo: [''],
//       descripcion: [''],
//       rating: [0],
//       poster_url: [''],
//       generos: [[]]
//     });
//   }

//   ngOnInit(): void {
//     this.movieId = this.route.snapshot.params['id'];
//     this.loadGenres();
//     this.loadMovie();
//   }

//   loadGenres(): void {
//     this.movieService.getGenres().subscribe(data => {
//       this.genres = data;
//     });
//   }

//   loadMovie(): void {
//     this.movieService.getMovieById(this.movieId).subscribe(data => {
//       this.movieForm.patchValue(data);
//     });
//   }

//   onCheckboxChange(event: any): void {
//     const selectedGenres = this.movieForm.get('generos')?.value as number[] ?? [];
//     if (event.target.checked) {
//       selectedGenres.push(event.target.value);
//     } else {
//       const index = selectedGenres.indexOf(event.target.value);
//       if (index >= 0) {
//         selectedGenres.splice(index, 1);
//       }
//     }
//     this.movieForm.patchValue({ generos: selectedGenres });
//   }

//   submit(): void {
//     this.movieService.updateMovie(this.movieId, this.movieForm.value).subscribe(() => {
//       this.router.navigate(['/movies']);
//     });
//   }
// }
