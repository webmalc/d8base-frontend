import { PartialUserInterface } from '@app/core/interfaces/partial-user-interface';

export interface UserInterface extends PartialUserInterface {
  patronymic?: string;
  password?: string;
  phone: string;
  email: string;
  main_language: string;
  account_type: string;
}
