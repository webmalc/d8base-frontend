import { FormGroup } from '@angular/forms';
import { Service } from '@app/service/models/service';

export default interface ServiceEditorContext {
  service: Service;
  form: FormGroup;
}
