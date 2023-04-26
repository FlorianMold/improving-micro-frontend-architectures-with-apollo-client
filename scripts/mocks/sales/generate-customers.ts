import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import { UiSalesCountryModel, UiCustomerModel } from '@ui-frontend-service/sales/api-types';

type UiCustomerHelperTypes = { countries: UiSalesCountryModel[] };

function generateCustomers(amount: number, { countries }: UiCustomerHelperTypes): UiCustomerModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      name2: faker.company.bs(),
      postal: faker.address.zipCode(),
      street: faker.address.street(),
      salesCountry_id: faker.helpers.arrayElement(countries).id,
      vatNumber: faker.finance.bic(),
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeCustomers(customers: UiCustomerModel[], path: string): UiCustomerModel[] {
  writeFileSync(path, JSON.stringify(customers, null, 2));
  return customers;
}

export function generateAndStoreCustomers(amount: number, folder: string, filename: string, helperTypes: UiCustomerHelperTypes) {
  return storeCustomers(generateCustomers(amount, helperTypes), `${folder}/${filename}`);
}
