import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  private apiService = inject(ApiService);
  protected searchControl = new FormControl<string>('');

  results: any[] = [];
  isLoading: boolean = false;

  public ngOnInit(): void {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(query => (query?.length ?? 0) >= 3),
        switchMap(query => {
          this.isLoading = true;
          return this.apiService.multiSearch(query);
        })
      ).subscribe(
      (data) => {
        this.results = data.results;
        this.isLoading = false;
      })
  }
}
