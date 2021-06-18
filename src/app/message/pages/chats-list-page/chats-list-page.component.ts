import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ChatsService } from '@app/message/pages/chats-list-page/chats.service';
import { IonSearchbar } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chats-list-page',
  templateUrl: './chats-list-page.component.html',
  styleUrls: ['./chats-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListPageComponent {
  @ViewChild(IonSearchbar) public searchbar: IonSearchbar;

  constructor(private readonly chatsService: ChatsService) {}

  public get chatList$(): Observable<any> {
    return this.chatsService.chatList$;
  }

  public search(data: string): any {
    this.chatsService.doSearch(data);
  }
}
