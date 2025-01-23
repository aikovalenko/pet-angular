import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-movie-details-page',
  imports: [],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsPageComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  public movie?: any;

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.api
      .getMovieDetails(id)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.movie = data;
        this.cdr.markForCheck();
      });

    this.api
      .getMovieGenreList()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        console.log(data);
        this.cdr.markForCheck();
      });
  }
}
