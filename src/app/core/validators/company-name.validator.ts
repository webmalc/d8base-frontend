import { FormGroup, ValidationErrors } from '@angular/forms';

export function companyNameValidator(group: FormGroup): ValidationErrors | null {
  const invalid = group.get('is_company').value === 'company' && !group.get('company_name').value;

  return invalid ? { emptyCompanyNameError: true } : null;
}
