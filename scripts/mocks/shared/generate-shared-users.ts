import { UiSharedAddressModel, UiSharedUserModel } from '@ui-frontend-service/shared/api-types';
import { faker } from '@faker-js/faker/locale/de';
import { writeFileSync } from 'fs';
import { UiSalutationModel, UiTitleModel } from '@ui-frontend-service/contact/api-types';

type UiUserHelperTypes = { addresses: UiSharedAddressModel[]; titles: UiTitleModel[]; salutations: UiSalutationModel[] };

function generateSharedUsers(amount: number, { addresses, salutations, titles }: UiUserHelperTypes): UiSharedUserModel[] {
  let aId = 0;
  return Array.from({ length: amount }).map((_) => {
    const title = faker.helpers.arrayElement(titles).id;
    return {
      id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      token: faker.datatype.uuid(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      firstName: faker.name.firstName(),
      secondName: faker.name.lastName(),
      gender: faker.name.sex(),
      birthdate: faker.date.past().toISOString(),
      salutation_id: faker.helpers.arrayElement(salutations).id,
      address_id: addresses[aId++].id,
      title_id: title,
      changedAt: faker.date.recent().valueOf(),
      createdAt: faker.date.past().valueOf(),
      deletedAt: null,
    };
  });
}

function storeUsers(users: UiSharedUserModel[], path: string): UiSharedUserModel[] {
  writeFileSync(path, JSON.stringify(users, null, 2));
  return users;
}

export function generateAndStoreUsers(amount: number, folder: string, filename: string, helperTypes: UiUserHelperTypes) {
  return storeUsers(generateSharedUsers(amount, helperTypes), `${folder}/${filename}`);
}
