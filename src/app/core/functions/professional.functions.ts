import { ProfessionalList } from '@app/api/models';

export function getProfessionalName(professional?: ProfessionalList): string {
  const user = professional?.user;
  return user ? `${user.first_name} ${user.last_name}` : '';
}
