import {Validators} from '@angular/forms';
import {AppValidators} from '@app/core/validators/app.validators';

export const passwordValidators = Validators.compose([
    Validators.required, Validators.minLength(8), AppValidators.forbidNumericValue
]);
