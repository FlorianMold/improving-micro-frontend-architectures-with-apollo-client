import { writeFileSync } from 'fs';

/**
 * Merges the given array of mock-data into one object and store it on the file system.
 *
 * @param filename The name of the file to write the merged data to.
 * @param mockData The array of mock-data to merge.
 */
export function mergeAndStoreData(filename: string, mockData: unknown) {
  writeFileSync(filename, JSON.stringify(mockData, null, 2));
}
