import { UiAddressModel, UiContactModel, UiCountryModel } from '@ui-frontend-service/contact/api-types';
import { writeFileSync } from 'fs';
import { faker } from '@faker-js/faker/locale/de';

type UiAddressHelperTypes = { countries: UiCountryModel[]; contacts?: UiContactModel[] };

function generateAddresses(amount: number, { countries }: UiAddressHelperTypes): UiAddressModel[] {
  return Array.from({ length: amount }).map(() => {
    return {
      id: faker.datatype.uuid(),
      country_id: faker.helpers.arrayElement(countries).id,
      location: faker.address.city(),
      postalCode: faker.address.zipCode(),
      streetName: faker.address.street(),
      createdAt: faker.date.past().valueOf(),
      changedAt: faker.date.recent().valueOf(),
      deletedAt: null,
    };
  });
}

function storeAddresses(addresses: UiAddressModel[], path: string): UiAddressModel[] {
  writeFileSync(path, JSON.stringify(addresses, null, 2));
  return addresses;
}

export function generateAndStoreAddresses(
  amount: number,
  folder: string,
  filename: string,
  helpers: UiAddressHelperTypes
): UiAddressModel[] {
  return storeAddresses(generateAddresses(amount, helpers), `${folder}/${filename}`);
}
