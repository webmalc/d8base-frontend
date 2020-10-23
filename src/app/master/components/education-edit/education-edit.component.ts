import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {Education} from '@app/master/models/education';
import {AbstractEditComponent} from '@app/shared/abstract/abstract-edit-component';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-education-edit',
    templateUrl: './education-edit.component.html',
    styleUrls: ['./education-edit.component.scss']
})
export class EducationEditComponent extends AbstractEditComponent<Education> {

    constructor(private readonly location: Location) {
        super();
    }

    public locationBack(): void {
        this.location.back();
    }

    protected transform(data: Education): Education {
        const trans: Education = plainToClass(Education, data);
        trans.formatDates();

        return trans;
    }
}
