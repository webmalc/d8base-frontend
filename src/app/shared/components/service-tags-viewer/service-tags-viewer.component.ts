import { Component, Input } from '@angular/core';
import { ServiceTagList } from '@app/api/models';

@Component({
  selector: 'app-service-tags-viewer',
  templateUrl: './service-tags-viewer.component.html',
  styleUrls: ['./service-tags-viewer.component.scss'],
})
export class ServiceTagsViewerComponent {
  @Input()
  public tags: ServiceTagList[];
}
