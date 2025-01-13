import {Component, inject, OnInit} from '@angular/core';
import {MediaItem, ApiService} from '../../services/api.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-movie-page',
  imports: [
    RouterLink
  ],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})
export class MoviePageComponent implements OnInit{
  private ApiService = inject(ApiService);

  public popularList: MediaItem[] = [];
  public upcomingList: MediaItem[] = [];

  public ngOnInit(): void {
    this.ApiService.getPopular().subscribe((response) => {
      this.popularList = response.results;
    });
    this.ApiService.getUpcoming().subscribe((response) => {
      this.upcomingList = response.results;
    });
  }
}
