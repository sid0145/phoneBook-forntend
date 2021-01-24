export interface Phonebook {
  _id?: string;
  name?: string;
  phoneNumber?: number;
  email?: string;
}

export class ContactWithPage {
  docs: Phonebook[];
  total: number;
  pages: number;
  page: number;
  limit: number;
}
