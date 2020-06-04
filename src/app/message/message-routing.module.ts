import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessageBoxComponent} from '@app/message/components/message-box/message-box.component';
import {MessagePage} from '@app/message/message.page';
import {MessageBoxType} from '@app/message/enums/message-box-type';
import {MessageReaderComponent} from '@app/message/components/message-reader/message-reader.component';
import {MessageInboxResolver} from '@app/message/resolvers/message-inbox.resolver';
import {MessageOutboxResolver} from '@app/message/resolvers/message-outbox.resolver';

const routes: Routes = [
    {
        path: '', component: MessagePage, children: [
            {
                path: '', component: MessageBoxComponent, data: {
                    boxType: MessageBoxType.INBOX
                },
                outlet: 'inboxOutlet'
            },
            {
                path: '', component: MessageBoxComponent, data: {
                    boxType: MessageBoxType.OUTBOX
                },
                outlet: 'outboxOutlet'
            }
        ]
    },
    {
        path: 'inbox',
        component: MessageBoxComponent,
        data: {
            boxType: MessageBoxType.INBOX
        }
    },
    {
        path: 'outbox', component: MessageBoxComponent, data: {
            boxType: MessageBoxType.OUTBOX
        }
    },
    {
        path: 'read/inbox/:id',
        component: MessageReaderComponent,
        resolve: {
            message: MessageInboxResolver
        }
    },
    {
        path: 'read/outbox/:id',
        component: MessageReaderComponent,
        resolve: {
            message: MessageOutboxResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessagePageRoutingModule {
}
