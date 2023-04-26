import { faker } from '@faker-js/faker/locale/de';
import { UiPersonModel, UiSubContactModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';

type UiPersonHelperTypes = { subContacts: UiSubContactModel[] };

function generatePersons(amount: number, _?: UiPersonHelperTypes): UiPersonModel[] {
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.number(),
      mobile: faker.phone.number(),
      fax: faker.phone.number(),
      function: faker.name.jobTitle(),
      createdAt: faker.date.past().valueOf(),
      changedAt: faker.date.recent().valueOf(),
      deletedAt: null,
    };
  });
}

function storePersons(persons: UiPersonModel[], path: string): UiPersonModel[] {
  writeFileSync(path, JSON.stringify(persons, null, 2));
  return persons;
}

export function generateAndStorePersons(
  amount: number,
  folder: string,
  filename: string,
  helperTypes?: UiPersonHelperTypes
): UiPersonModel[] {
  return storePersons(generatePersons(amount, helperTypes), `${folder}/${filename}`);
}
