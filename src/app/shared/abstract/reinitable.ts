import {OnInit} from '@angular/core';

export abstract class Reinitable implements OnInit {
    public abstract ngOnInit(): any;

    public ionViewDidEnter(): void {
        this.ngOnInit();
    }
}
