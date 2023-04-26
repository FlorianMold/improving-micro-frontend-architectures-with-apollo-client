import { writeFileSync } from 'fs';
import { UiClientModel, UiClientRefModel } from '@ui-frontend-service/sales/api-types';

type UiClientRefHelperTypes = { clients: UiClientModel[] };

function generateClientReferences({ clients }: UiClientRefHelperTypes): UiClientRefModel[] {
  return clients.map((client) => {
    return {
      id: client.id,
      client_id: client.id,
    };
  });
}

function storeClientReferences(customers: UiClientRefModel[], path: string): UiClientRefModel[] {
  writeFileSync(path, JSON.stringify(customers, null, 2));
  return customers;
}

export function generateAndStoreClientReferences(folder: string, filename: string, helperTypes: UiClientRefHelperTypes) {
  return storeClientReferences(generateClientReferences(helperTypes), `${folder}/${filename}`);
}
