import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { LoadDataDirective } from '../../directives/load-data.directive';
import { MediaPaginationComponent } from '../../components/media-pagination/media-pagination.component';

@Component({
  selector: 'app-entrance-page',
  imports: [
    RouterLink,
    SearchComponent,
    MediaListComponent,
    LoadDataDirective,
    MediaPaginationComponent,
  ],
  templateUrl: './entrance-page.component.html',
  styleUrl: './entrance-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntrancePageComponent {}
