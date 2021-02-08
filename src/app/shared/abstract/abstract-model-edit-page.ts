import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceInterface } from '@app/core/interfaces/api-service-interface';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { switchMap } from 'rxjs/operators';

/* eslint-disable @angular-eslint/directive-class-suffix */
@Directive()
export abstract class AbstractModelEditPage<T> implements OnInit {

  public item: T;
  public itemId: number;

  protected constructor(
    protected readonly route: ActivatedRoute,
    protected readonly api: ApiServiceInterface<T>,
    protected readonly masterManager?: MasterManagerService,
  ) {
  }

  public ngOnInit(): void {
    this.itemId = this.getItemId();
    if (this.itemId) {
      this.api.getByEntityId(this.itemId).subscribe(
        experience => this.item = experience,
      );
    } else {
      this.item = this.getNewModel();
    }
  }

  public save(item: T): void {
    this.itemId ?
      this.api.patch(item).subscribe((entity: T) => this.afterApiCallback(entity)) :
      (this.isUserOnly() ? this.api.create(item) : this.masterManager.getMasterList().pipe(
        switchMap(
          list => {
            // @ts-ignore
            item.professional = list[0].id;

            return this.api.create(item);
          },
        ),
      ).subscribe(() => this.afterApiCallback()));
  }

  public delete(item: T): void {
    this.api.delete(item).subscribe(() => this.afterApiCallback());
  }

  protected abstract getNewModel(): T;

  protected abstract isUserOnly(): boolean;

  protected abstract getItemId(): number;

  protected abstract afterApiCallback(entity?: T): void;
}

