import { generateAndStoreUsers } from './generate-shared-users';
import { writeFileSync } from 'fs';
import UI_SALUTATIONS_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/salutation-mock.data.json';
import UI_TITLES_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/title-mock.data.json';
import UI_ADDRESSES_MOCK_DATA from '../../../libs/contact/data-access/src/lib/mock-data/address-mock.data.json';

const mockedDataAmount = +process.argv[2];
const folder = process.argv[3];

const titles = UI_TITLES_MOCK_DATA;
const salutations = UI_SALUTATIONS_MOCK_DATA;
const addresses = UI_ADDRESSES_MOCK_DATA;

const users = generateAndStoreUsers(mockedDataAmount, folder, 'user-mock.data.json', {
  addresses,
  titles,
  salutations,
});

console.log('Successfully generated shared mock-data.');

const MOCK_DATA = {
  users,
};

writeFileSync('mock-data/shared-mock-data.json', JSON.stringify(MOCK_DATA, null, 2));
