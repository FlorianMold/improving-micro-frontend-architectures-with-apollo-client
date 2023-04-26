type SafeAny = any;

function mapObjectData(
  object: { id: string; __typename: string; [key: string]: SafeAny },
  path: string[],
  toData: SafeAny
): { [key: string]: SafeAny } {
  const key = path[0];
  let value;

  if (!object[key]) {
    return object;
  }

  if (path.length === 1) {
    if (Array.isArray(object[key])) {
      value = object[key].map((item: SafeAny) => ({
        ...item,
        ...(toData || []).find(({ id }: { id: string }) => id === item.id),
      }));
    } else if (Array.isArray(toData)) {
      value = {
        ...object[key],
        ...toData.find(({ id }) => id === object[key].id),
      };
    } else {
      value = {
        ...object[key],
        ...(toData || {}),
      };
    }
  } else if (Array.isArray(object[key])) {
    value = object[key].map((item: SafeAny) => ({
      ...item,
      ...mapObjectData(item, path.slice(1), toData),
    }));
  } else {
    value = mapObjectData(object[key], path.slice(1), toData);
  }

  return { ...object, [key]: value };
}

/**
 *
 * @param data
 * @param map
 */
export function mapData(data?: SafeAny, map: { [key: string]: string } = {}) {
  if (!data) {
    return data;
  }

  return Object.entries(map).reduce((result, [from, to]: SafeAny) => {
    const fromPath = from.split('.');

    return mapObjectData(result, fromPath, result[to]);
  }, data);
}
