import { UiClientModel, UiContractModel, UiCustomerModel } from '@ui-frontend-service/sales/api-types';
import { writeFileSync } from 'fs';
import { faker } from '@faker-js/faker/locale/de';

type UiContractHelperTypes = { clients: UiClientModel[]; customers: UiCustomerModel[] };

function generateContracts(amount: number, { clients, customers }: UiContractHelperTypes): UiContractModel[] {
  return Array.from({ length: amount }).map((_) => {
    return {
      id: faker.datatype.uuid(),
      contractor: faker.name.fullName(),
      description: faker.lorem.sentence(),
      name: faker.name.jobTitle(),
      payPeriod: faker.datatype.number(),
      payPeriodAdvance: faker.datatype.number(),
      paymentAt: faker.date.past().valueOf(),
      validAt: faker.date.recent().valueOf(),
      validTo: faker.date.future().valueOf(),
      client_id: faker.helpers.arrayElement(clients).id,
      customer_id: faker.helpers.arrayElement(customers).id,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeContracts(countries: UiContractModel[], path: string): UiContractModel[] {
  writeFileSync(path, JSON.stringify(countries, null, 2));
  return countries;
}

export function generateAndStoreContracts(
  amount: number,
  folder: string,
  filename: string,
  helperTypes: UiContractHelperTypes
): UiContractModel[] {
  return storeContracts(generateContracts(amount, helperTypes), `${folder}/${filename}`);
}
