import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { GenreFormComponent } from './components/genre-form/genre-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GenreService } from './services/genre.service';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieFormComponent, MovieListComponent, GenreFormComponent, RouterLink, CommonModule, FormsModule,NavBarComponent, ReactiveFormsModule],
  providers: [GenreService, MovieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-frontend';
}
