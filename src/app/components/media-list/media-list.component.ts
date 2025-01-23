import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaType } from '../../services/api.service';

@Component({
  selector: 'app-media-list',
  imports: [RouterLink],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaListComponent {
  @Input() mediaItemList?: any[];
  @Input() mediaType?: MediaType;
}
