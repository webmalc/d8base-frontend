import { Directive, HostBinding } from '@angular/core';

/* eslint-disable no-shadow */
enum SizeAttr {
  Xs = 'size-xs',
  Sm = 'size-sm',
  Md = 'size-md',
  Lg = 'size-lg',
  Xl = 'size-xl',
}

const MAIN_COLUMN_SIZE = {
  [SizeAttr.Xs]: 12,
  [SizeAttr.Sm]: 8,
  [SizeAttr.Md]: 8,
  [SizeAttr.Lg]: 7,
  [SizeAttr.Xl]: 5,
};

@Directive({
  selector: '[appMainColumn]',
})
export class MainColumnDirective {
  @HostBinding(`attr.${SizeAttr.Xs}`)
  public get sizeXs(): number {
    return MAIN_COLUMN_SIZE[SizeAttr.Xs];
  }

  @HostBinding(`attr.${SizeAttr.Sm}`)
  public get sizeSm(): number {
    return MAIN_COLUMN_SIZE[SizeAttr.Sm];
  }

  @HostBinding(`attr.${SizeAttr.Md}`)
  public get sizeMd(): number {
    return MAIN_COLUMN_SIZE[SizeAttr.Md];
  }

  @HostBinding(`attr.${SizeAttr.Lg}`)
  public get sizeLg(): number {
    return MAIN_COLUMN_SIZE[SizeAttr.Lg];
  }

  @HostBinding(`attr.${SizeAttr.Xl}`)
  public get sizeXl(): number {
    return MAIN_COLUMN_SIZE[SizeAttr.Xl];
  }
}
