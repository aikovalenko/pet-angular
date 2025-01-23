import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-media-pagination',
  imports: [],
  templateUrl: './media-pagination.component.html',
  styleUrl: './media-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPaginationComponent {
  @Input() public currentPage?: number;
  @Input() public totalPages?: number;

  @Output() public currentPageChange = new EventEmitter<number>();
}
