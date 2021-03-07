import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatsService } from '@app/message/services/chats.service';
import { Reinitable } from '@app/shared/abstract/reinitable';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent extends Reinitable {
  @ViewChild(IonSearchbar) public searchbar: IonSearchbar;

  constructor(public chatsService: ChatsService, private readonly router: Router) {
    super();
  }

  public search(data: string): any {
    this.chatsService.doSearch(data);
  }

  public onChatClick(interlocutorId: number): void {
    this.router.navigateByUrl(`/message/chat/${interlocutorId}`);
  }

  protected init(): void {
    this.searchbar.value = '';
  }
}
