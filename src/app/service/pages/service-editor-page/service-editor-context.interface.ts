import { FormGroup } from '@angular/forms';
import { Service } from '@app/api/models';

export default interface ServiceEditorContext {
  service: Service;
  form: FormGroup;
}
