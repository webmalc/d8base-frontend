import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonViewDidEnter } from '@app/core/interfaces/ionic.interfaces';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { ServicePublishSteps } from '@app/service/enums/service-publish-steps';
import { StepSevenDataInterface } from '@app/service/interfaces/step-seven-data-interface';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements IonViewDidEnter {
  public scheduleEditor = new FormControl();

  constructor(
    private readonly servicePublishDataHolderService: ServicePublishDataHolderService,
    private readonly location: Location,
  ) {}

  public ionViewDidEnter(): void {
    const stepData = this.servicePublishDataHolderService.getStepData<StepSevenDataInterface>(ServicePublishSteps.Seven);
    const { timetable } = stepData;
    this.scheduleEditor.setValue(timetable);
  }

  public async saveTimetable(): Promise<void> {
    const timetable: AbstractSchedule[] = this.scheduleEditor.value ?? [];
    await this.servicePublishDataHolderService.assignStepData(ServicePublishSteps.Seven, { timetable });
    this.location.back();
  }
}
