import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Experience } from '@app/master/models/experience';
import { AbstractEditComponent } from '@app/shared/abstract/abstract-edit-component';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-experience-edit',
  templateUrl: './experience-edit.component.html',
  styleUrls: ['./experience-edit.component.scss'],
})
export class ExperienceEditComponent extends AbstractEditComponent<Experience> {

  constructor(private readonly location: Location) {
    super();
  }

  public locationBack(): void {
    this.location.back();
  }

  protected transform(data: Experience): Experience {
    const transData: Experience = plainToClass(Experience, data);
    transData.formatDates();

    return transData;
  }
}
