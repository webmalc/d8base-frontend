import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent {

    @Input() public rating: number;

    public generateRatingArray(): number[] {
        const arr = [];
        for (let i = 0; i < Math.trunc(this.rating); i += 1) {
            arr.push(1);
        }

        return arr;
    }

    public needToRenderHalf(): boolean {
        return this.rating && (this.rating - Math.floor(this.rating) !== 0);
    }
}
