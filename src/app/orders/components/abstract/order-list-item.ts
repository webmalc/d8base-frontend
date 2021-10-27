import { EventEmitter } from '@angular/core';

export abstract class OrderListItem {
  public abstract statusChanged: EventEmitter<void>;
  public pending: boolean = false;

  protected async perform(action: () => Promise<void>): Promise<void> {
    this.pending = true;
    try {
      await action();
      this.statusChanged.emit();
    } finally {
      this.pending = false;
    }
  }
}
