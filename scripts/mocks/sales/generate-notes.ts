import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import { UiInvoiceModel, UiNoteModel } from '@ui-frontend-service/sales/api-types';

type UiNoteHelperTypes = { invoices: UiInvoiceModel[] };

function generateSentInvoices(amount: number, { invoices }: UiNoteHelperTypes): UiNoteModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.datatype.uuid(),
      body: faker.lorem.sentences(),
      date: faker.date.past().valueOf(),
      subject: faker.random.words(),
      uid: parseInt(faker.random.numeric(12)),
      invoice_id: faker.helpers.arrayElement(invoices).id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeNotes(notes: UiNoteModel[], path: string): UiNoteModel[] {
  writeFileSync(path, JSON.stringify(notes, null, 2));
  return notes;
}

export function generateAndStoreNotes(amount: number, folder: string, filename: string, helperTypes: UiNoteHelperTypes) {
  return storeNotes(generateSentInvoices(amount, helperTypes), `${folder}/${filename}`);
}
