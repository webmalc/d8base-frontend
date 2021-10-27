import { Component } from '@angular/core';
import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  public get becomeProfessionalUrl(): any[] {
    return [NavPath.Service, NavBranch.Publish];
  }
}
