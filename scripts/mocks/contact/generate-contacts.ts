import { faker } from '@faker-js/faker/locale/de';
import { UiAddressModel, UiContactModel, UiSalutationModel, UiTitleModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';

type UiContactHelperTypes = { titles: UiTitleModel[]; salutations: UiSalutationModel[]; addresses: UiAddressModel[] };

/**
 * Generates the amount of contacts.
 *
 * @param amount The amount of contacts to generate.
 * @param salutations The possible salutations for the contact.
 * @param titles The possible titles for the contact.
 * @param addresses The possible addresses for the contact.
 */
function generateContacts(amount: number, { salutations, titles, addresses }: UiContactHelperTypes): UiContactModel[] {
  let cId = 1;
  let aId = 0;
  return Array.from({ length: amount }).map((_) => {
    const title = faker.helpers.arrayElement(titles).id;

    return {
      id: faker.datatype.uuid(),
      comment: faker.lorem.word(10),
      bankWithdrawal: faker.datatype.boolean(),
      billByEmail: faker.datatype.boolean(),
      customerNumber: cId++,
      dataFolder: faker.system.directoryPath(),
      dunning: faker.datatype.boolean(),
      firstName: faker.name.firstName(),
      secondName: faker.name.lastName(),
      isCustomer: faker.datatype.boolean(),
      isEmployee: faker.datatype.boolean(),
      isSupplier: faker.datatype.boolean(),
      name: faker.name.firstName(),
      name2: faker.name.lastName(),
      newsletter: faker.datatype.boolean(),
      paymentDeadline: faker.datatype.number(20),
      salutation_id: faker.helpers.arrayElement(salutations).id,
      state: faker.datatype.number({ max: 6 }),
      title_id: title,
      address_id: addresses[aId++].id,
      uidNumber: `${faker.datatype.number()}`,
      valueAddedTax: `${faker.datatype.number()}`,
      creditor: `${faker.datatype.number()}`,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

/**
 * Stores the given contacts at the given path in the repo.
 *
 * @param contacts The contacts to store.
 * @param path The path, where the file should be stored.
 */
function storeContacts(contacts: UiContactModel[], path: string): UiContactModel[] {
  writeFileSync(path, JSON.stringify(contacts, null, 2));
  return contacts;
}

export function generateAndStoreContacts(amount: number, folder: string, filename: string, helperTypes: UiContactHelperTypes) {
  return storeContacts(generateContacts(amount, helperTypes), `${folder}/${filename}`);
}
