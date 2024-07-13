import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { GenreFormComponent } from './components/genre-form/genre-form.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieByGenreComponent } from './components/movie-by-genre/movie-by-genre.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { ListarComponent } from './components/listar/listar.component';

export const routes: Routes = [
    { path: '', component: MovieListComponent },
    { path: 'movies', component: MovieListComponent },
    { path: 'add-movie', component: MovieFormComponent },
    { path: 'add-genre', component: GenreFormComponent },
    { path: 'movie/:id', component: MovieDetailComponent },  // Ruta para detalles de película
    { path: 'movies-by-genre', component: MovieByGenreComponent }, // Nueva ruta para películas por género
    { path: 'edit-movie/:id', component: EditMovieComponent }, // Nueva ruta para editar película
    { path: 'listar', component: ListarComponent }, // 
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
];
