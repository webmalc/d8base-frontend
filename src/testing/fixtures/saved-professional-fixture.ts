import { SavedProfessionalInterface } from '../../app/core/interfaces/saved-professional.interface';

export class SavedProfessionalFixture {
  public static create(): SavedProfessionalInterface<number> {
    return {
      created: '',
      created_by: 0,
      id: 0,
      modified: '',
      modified_by: 0,
      note: '',
      professional: 0,
    };
  }
}
