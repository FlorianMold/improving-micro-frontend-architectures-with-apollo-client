import { faker } from '@faker-js/faker/locale/de';
import { UiContactModel, UiEmailTypeModel, UiPersonModel, UiSubContactModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';

type UiSubContactHelperTypes = { contacts: UiContactModel[]; emailTypes: UiEmailTypeModel[]; people: UiPersonModel[] };

function generateSubContacts(amount: number, { contacts, emailTypes, people }: UiSubContactHelperTypes): UiSubContactModel[] {
  let i = 0;
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      emailType_id: faker.helpers.arrayElement(emailTypes).id,
      contact_id: contacts[i].id,
      person_id: people[i++].id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeSubContacts(subContacts: UiSubContactModel[], path: string): UiSubContactModel[] {
  writeFileSync(path, JSON.stringify(subContacts, null, 2));
  return subContacts;
}

export function generateAndStoreSubContacts(
  amount: number,
  folder: string,
  filename: string,
  helperTypes: UiSubContactHelperTypes
): UiSubContactModel[] {
  return storeSubContacts(generateSubContacts(amount, helperTypes), `${folder}/${filename}`);
}
