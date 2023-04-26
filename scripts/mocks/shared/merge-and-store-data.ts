import { mergeAndStoreData } from '../helper/merge-data';
import UI_USERS_MOCK_DATA from '../../../libs/shared/data-access/src/lib/mock-data/user-mock.data.json';
import UI_ADDRESSES_MOCK_DATA from '../../../libs/shared/data-access/src/lib/mock-data/address-mock.data.json';

const result = {
  users: UI_USERS_MOCK_DATA,
  addresses: UI_ADDRESSES_MOCK_DATA,
};

const targetFolder = process.argv[2];

mergeAndStoreData(targetFolder, result);
