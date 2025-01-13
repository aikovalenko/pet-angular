import {Component, inject, OnInit} from '@angular/core';
import {MediaItem, ApiService} from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details-page',
  imports: [],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss'
})
export class MovieDetailsPageComponent implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);

  public movie? : any;


  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.apiService.getMovieDetails(id).subscribe(data => this.movie = data);
  }
}
