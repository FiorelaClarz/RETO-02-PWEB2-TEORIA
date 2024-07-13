import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenreService } from '../../services/genre.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-genre-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './genre-form.component.html',
  styleUrl: './genre-form.component.css'
})
export class GenreFormComponent implements OnInit {
  genreForm: FormGroup;
  genres: any[] = [];
  editingGenre: any = null;

  constructor(private fb: FormBuilder, private genreService: GenreService) {
    this.genreForm = this.fb.group({
      nombre: ['']
    });
  }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe(data => {
      this.genres = data;
    });
  }

  submit(): void {
    if (this.editingGenre) {
      this.genreService.updateGenre(this.editingGenre.id, this.genreForm.value).subscribe(response => {
        console.log('Genre updated:', response);
        this.editingGenre = null;
        this.genreForm.reset();
        this.loadGenres(); // Actualizar la lista de géneros
      });
    } else {
      this.genreService.addGenre(this.genreForm.value).subscribe(response => {
        console.log('Genre added:', response);
        this.genreForm.reset();
        this.loadGenres(); // Actualizar la lista de géneros
      });
    }
  }

  editGenre(genre: any): void {
    this.editingGenre = genre;
    this.genreForm.patchValue(genre);
  }

  deleteGenre(id: number): void {
    this.genreService.deleteGenre(id).subscribe(response => {
      console.log('Genre deleted:', response);
      this.loadGenres(); // Actualizar la lista de géneros
    });
  }
}
// export class GenreFormComponent implements OnInit {
//   genreForm: FormGroup;
//   genres: any[] = [];

//   constructor(private fb: FormBuilder, private genreService: GenreService) {
//     this.genreForm = this.fb.group({
//       nombre: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loadGenres();
//   }

//   loadGenres(): void {
//     this.genreService.getGenres().subscribe(data => {
//       this.genres = data;
//     });
//   }

//   submit(): void {
//     this.genreService.addGenre(this.genreForm.value).subscribe(response => {
//       console.log('Genre added:', response);
//       this.loadGenres(); // Actualizar la lista de géneros
//     });
//   }
// }