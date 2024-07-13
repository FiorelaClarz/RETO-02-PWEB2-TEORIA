import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8000/api/peliculas/';
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);
  }
  getMovie(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`);
  }

  // getMoviesByGenre(genreId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/api/generos/${genreId}/movies/`);
  // }

  // getMoviesByGenre(genreId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/api/generos/${genreId}/peliculas/`);
  // }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/generos/`);
  }

  

  deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/peliculas/${movieId}/`);
  }

  getMovieById(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/peliculas/${movieId}/`);
  }

  updateMovie(movieId: number, movieData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/peliculas/${movieId}/`, movieData);
  }

}