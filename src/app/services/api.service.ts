import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_KEY = '727b06ca9feb083efc840ed4199bcd7e';
const API_URL = 'https://api.themoviedb.org/3';

export interface MediaItemResponse {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}

export interface MediaItem {
  id: number;
  title?: string; // Movie-specific
  name?: string;  // TV show-specific
  original_title?: string; // Movie-specific
  original_name?: string;  // TV show-specific
  overview: string;
  poster_path: string;
  backdrop_path: string;
  media_type?: 'movie' | 'tv'; // Indicates whether the item is a movie or TV show
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string; // Movie-specific
  first_air_date?: string; // TV show-specific
  vote_average: number;
  vote_count: number;
  origin_country?: string[]; // TV show-specific
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  public getTrending(): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(`${API_URL}/trending/all/day?api_key=${API_KEY}`);
  }

  public getPopular(): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  }

  public getUpcoming(): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(`${API_URL}/movie/upcoming?api_key=${API_KEY}`);
  }

  public getMovieDetails(id: string | null): Observable<MediaItem> {
    return this.http.get<MediaItem>(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  }

  public multiSearch(query: string | null, page = 1): Observable<MediaItemResponse> {
    return this.http.get<MediaItemResponse>(`${API_URL}/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
  }
}
