import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiUrl = 'http://localhost:8000/api/generos/';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addGenre(genre: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, genre);
  }
  
  updateGenre(id: number, genre: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, genre);
  }

  deleteGenre(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }

  getMoviesByGenre(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${id}/peliculas/`);
  }
}