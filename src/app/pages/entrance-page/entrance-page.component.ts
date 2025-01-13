import {Component, inject, OnInit} from '@angular/core';
import {MediaItem, ApiService} from '../../services/api.service';
import {RouterLink} from '@angular/router';
import {SearchComponent} from '../../components/search/search.component';


@Component({
  selector: 'app-entrance-page',
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './entrance-page.component.html',
  styleUrl: './entrance-page.component.scss'
})
export class EntrancePageComponent implements OnInit {
  private ApiService = inject(ApiService);

  public trendingList: MediaItem[] = [];

  public ngOnInit(): void {
    this.ApiService.getTrending().subscribe((response) => {
      this.trendingList = response.results;
    });
  }
}
