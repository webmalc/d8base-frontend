import { environment } from '@env/environment';

export function fileToBase64(file: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export function getNoAvatarLink(): string {
  return 'assets/images/profile/noavatar.png';
}

export function getContactIconName(media: string): string {
  const contacts = {
    facebook: 'logo-facebook',
    instagram: 'logo-instagram',
    skype: 'logo-skype',
    whatsapp: 'logo-whatsapp',
    phone: 'call-outline',
    email: 'mail-outline',
    web: 'globe-outline',
    default: 'reader-outline',
    ...environment.contacts,
  };

  return contacts[media.toLowerCase()] ?? contacts.default;
}
