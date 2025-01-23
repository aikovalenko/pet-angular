import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  inject,
} from '@angular/core';
import {
  ApiMethod,
  ApiService,
  MediaItemResponse,
} from '../services/api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface LoadDataDirectiveContext<T> {
  $implicit: MediaItemResponse | undefined;
  loading: boolean;
  controller: Controller | undefined;
}

type Controller = { load: (page: number) => void };

@UntilDestroy()
@Directive({
  selector: '[appLoadData]',
})
export class LoadDataDirective<T> implements OnInit {
  private api = inject(ApiService);
  private templateRef = inject(TemplateRef<LoadDataDirectiveContext<T>>);
  private viewContainer = inject(ViewContainerRef);

  @Input('appLoadDataParams') params?: { method: ApiMethod };

  public ngOnInit(): void {
    this.loadData();
  }

  private render(
    data: MediaItemResponse | undefined,
    loading: boolean,
    controller: Controller | undefined,
  ): void {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: data,
      loading,
      controller,
    });
  }

  public loadData(page: number = 1): void {
    if (!this.params?.method) return;

    this.render(undefined, true, undefined);

    this.api[this.params.method](page)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.render(data, false, {
          load: (page: number) => this.loadData(page),
        });
      });
  }

  static ngTemplateContextGuard<T>(
    dir: LoadDataDirective<T>,
    ctx: any,
  ): ctx is LoadDataDirectiveContext<T> {
    // As before the guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }
}
