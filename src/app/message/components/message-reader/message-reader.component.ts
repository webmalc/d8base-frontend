import {Component, OnInit} from '@angular/core';
import {MessageInterface} from '@app/message/interfaces/message-interface';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-message-reader',
    templateUrl: './message-reader.component.html',
    styleUrls: ['./message-reader.component.scss'],
})
export class MessageReaderComponent implements OnInit {
    public message: MessageInterface;

    constructor(
        private route: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.route.data.subscribe(
            data => this.message = data.message
        );
    }

}
