import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, MediaItemResponse } from '../../services/api.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MediaListComponent } from '../media-list/media-list.component';
import { MediaPaginationComponent } from '../media-pagination/media-pagination.component';

@UntilDestroy()
@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MediaListComponent,
    MediaPaginationComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  private api = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  protected searchControl = new FormControl<string>('');
  public query = '';
  public data?: MediaItemResponse;
  public isLoading?: boolean;

  private searchByQuery$ = this.searchControl.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(Boolean),
    filter((query) => query?.length >= 3),
    tap((query) => (this.query = query)),
    switchMap((query) => {
      this.isLoading = true;
      this.cdr.markForCheck();
      return this.api.multiSearch(query, 1);
    }),
  );

  public ngOnInit(): void {
    this.searchByQuery$.pipe(untilDestroyed(this)).subscribe((data) => {
      this.data = data;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  public changePage(page: number): void {
    this.api
      .multiSearch(this.query, page)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.data = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      });
  }
}
