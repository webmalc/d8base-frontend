import { Component, Input } from '@angular/core';
import {ProfessionalLocationInline} from '@app/api/models/professional-location-inline';

@Component({
  selector: 'app-location-viewer',
  templateUrl: './location-viewer.component.html',
  styleUrls: ['./location-viewer.component.scss']
})
export class LocationViewerComponent {

  @Input() public location: ProfessionalLocationInline;
}
