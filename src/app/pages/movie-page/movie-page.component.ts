import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadDataDirective } from '../../directives/load-data.directive';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { MediaPaginationComponent } from '../../components/media-pagination/media-pagination.component';

@Component({
  selector: 'app-movie-page',
  imports: [LoadDataDirective, MediaListComponent, MediaPaginationComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviePageComponent {}
