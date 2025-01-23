import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = '727b06ca9feb083efc840ed4199bcd7e';
const API_URL = 'https://api.themoviedb.org/3';

export type ApiMethod = 'getTrending' | 'getPopular' | 'getUpcoming';
export type MediaType = 'movie' | 'tv' | 'person';

export interface MediaItemResponse {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public getTrending(page: number): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(
      `${API_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`,
    );
  }

  public getPopular(page: number): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(
      `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
    );
  }

  public getUpcoming(page: number): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(
      `${API_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`,
    );
  }

  public getMovieDetails(id: string | null): Observable<any> {
    return this.http.get<any>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  }

  public getMovieGenreList(): Observable<any> {
    return this.http.get<any>(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
  }

  public multiSearch(
    query: string,
    page: number,
  ): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(
      `${API_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`,
    );
  }
}
