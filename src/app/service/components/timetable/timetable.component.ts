import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractSchedule } from '@app/core/models/abstract-schedule';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent {
  public scheduleEditor = new FormControl();

  private readonly STEP = 6;

  constructor(public servicePublishDataHolderService: ServicePublishDataHolderService, public location: Location) {}

  public async saveTimetable(): Promise<void> {
    const timetable: AbstractSchedule[] = this.scheduleEditor.value ?? [];
    await this.servicePublishDataHolderService.assignStepData(this.STEP, { timetable });
    this.location.back();
  }
}
