/**
 * FORKED from https://github.com/BridgeAR/safe-stable-stringify
 *
 */

const { hasOwnProperty } = Object.prototype;

export interface StringifyOptions {
  bigint?: boolean;
  circularValue?: string | null | TypeErrorConstructor | ErrorConstructor;
  deterministic?: boolean;
  maximumBreadth?: number;
  maximumDepth?: number;
  strict?: boolean;
}

export type Replacer =
  | (number | string)[]
  | null
  | undefined
  | ((key: string, value: unknown) => string | number | boolean | null);

type SafeAny = any;

const stringify = configure();

stringify.configure = configure;
stringify.stringify = stringify;

const strEscapeSequencesRegExp =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
const strEscapeSequencesReplacer = new RegExp(strEscapeSequencesRegExp, 'g');

// Escaped special characters. Use empty strings to fill up unused entries.
const meta = [
  '\\u0000',
  '\\u0001',
  '\\u0002',
  '\\u0003',
  '\\u0004',
  '\\u0005',
  '\\u0006',
  '\\u0007',
  '\\b',
  '\\t',
  '\\n',
  '\\u000b',
  '\\f',
  '\\r',
  '\\u000e',
  '\\u000f',
  '\\u0010',
  '\\u0011',
  '\\u0012',
  '\\u0013',
  '\\u0014',
  '\\u0015',
  '\\u0016',
  '\\u0017',
  '\\u0018',
  '\\u0019',
  '\\u001a',
  '\\u001b',
  '\\u001c',
  '\\u001d',
  '\\u001e',
  '\\u001f',
  '',
  '',
  '\\"',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\\\',
];

function escapeFn(str: string) {
  if (str.length === 2) {
    const charCode = str.charCodeAt(1);
    return `${str[0]}\\u${charCode.toString(16)}`;
  }
  const charCode = str.charCodeAt(0);
  return meta.length > charCode ? meta[charCode] : `\\u${charCode.toString(16)}`;
}

// Escape C0 control characters, double quotes, the backslash and every code
// unit with a numeric value in the inclusive range 0xD800 to 0xDFFF.
function strEscape(str: string) {
  // Some magic numbers that worked out fine while benchmarking with v8 8.0
  if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) {
    return str;
  }
  if (str.length > 100) {
    return str.replace(strEscapeSequencesReplacer, escapeFn);
  }
  let result = '';
  let last = 0;
  for (let i = 0; i < str.length; i++) {
    const point = str.charCodeAt(i);
    if (point === 34 || point === 92 || point < 32) {
      result += `${str.slice(last, i)}${meta[point]}`;
      last = i + 1;
    } else if (point >= 0xd800 && point <= 0xdfff) {
      if (point <= 0xdbff && i + 1 < str.length) {
        const nextPoint = str.charCodeAt(i + 1);
        if (nextPoint >= 0xdc00 && nextPoint <= 0xdfff) {
          i++;
          continue;
        }
      }
      result += `${str.slice(last, i)}\\u${point.toString(16)}`;
      last = i + 1;
    }
  }
  result += str.slice(last);
  return result;
}

function insertSort(array: SafeAny[]) {
  // Insertion sort is very efficient for small input sizes but it has a bad
  // worst case complexity. Thus, use native array sort for bigger values.
  if (array.length > 2e2) {
    return array.sort();
  }
  for (let i = 1; i < array.length; i++) {
    const currentValue = array[i];
    let position = i;
    while (position !== 0 && array[position - 1] > currentValue) {
      array[position] = array[position - 1];
      position--;
    }
    array[position] = currentValue;
  }
  return array;
}

const typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
  Symbol.toStringTag
)?.get;

function isTypedArrayWithEntries(value: SafeAny) {
  return typedArrayPrototypeGetSymbolToStringTag?.call(value) !== undefined && value.length !== 0;
}

function stringifyTypedArray(array: SafeAny, separator: SafeAny, maximumBreadth: SafeAny) {
  if (array.length < maximumBreadth) {
    maximumBreadth = array.length;
  }
  const whitespace = separator === ',' ? '' : ' ';
  let res = `"0":${whitespace}${array[0]}`;
  for (let i = 1; i < maximumBreadth; i++) {
    res += `${separator}"${i}":${whitespace}${array[i]}`;
  }
  return res;
}

function getCircularValueOption(options: SafeAny) {
  if (hasOwnProperty.call(options, 'circularValue')) {
    const circularValue = options.circularValue;
    if (typeof circularValue === 'string') {
      return `"${circularValue}"`;
    }
    if (circularValue == null) {
      return circularValue;
    }
    if (circularValue === Error || circularValue === TypeError) {
      return {
        toString() {
          throw new TypeError('Converting circular structure to JSON');
        },
      };
    }
    throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
  }
  return '"[Circular]"';
}

function getBooleanOption(options: SafeAny, key: SafeAny) {
  let value;
  if (hasOwnProperty.call(options, key)) {
    value = options[key];
    if (typeof value !== 'boolean') {
      throw new TypeError(`The "${key}" argument must be of type boolean`);
    }
  }
  return value === undefined ? true : value;
}

function getPositiveIntegerOption(options: SafeAny, key: SafeAny) {
  let value;
  if (hasOwnProperty.call(options, key)) {
    value = options[key];
    if (typeof value !== 'number') {
      throw new TypeError(`The "${key}" argument must be of type number`);
    }
    if (!Number.isInteger(value)) {
      throw new TypeError(`The "${key}" argument must be an integer`);
    }
    if (value < 1) {
      throw new RangeError(`The "${key}" argument must be >= 1`);
    }
  }
  return value === undefined ? Infinity : value;
}

function getItemCount(amount: number) {
  if (amount === 1) {
    return '1 item';
  }
  return `${amount} items`;
}

function getUniqueReplacerSet(replacerArray: SafeAny) {
  const replacerSet = new Set();
  for (const value of replacerArray) {
    if (typeof value === 'string' || typeof value === 'number') {
      replacerSet.add(String(value));
    }
  }
  return replacerSet;
}

function getStrictOption(options: SafeAny): SafeAny {
  if (hasOwnProperty.call(options, 'strict')) {
    const value = options.strict;
    if (typeof value !== 'boolean') {
      throw new TypeError('The "strict" argument must be of type boolean');
    }
    if (value) {
      return (value: SafeAny) => {
        let message = `Object can not safely be stringified. Received type ${typeof value}`;
        if (typeof value !== 'function') message += ` (${value.toString()})`;
        throw new Error(message);
      };
    }
  }
}

function configure(options?: StringifyOptions): SafeAny {
  options = { ...options };
  const fail = getStrictOption(options);
  if (fail) {
    if (options.bigint === undefined) {
      options.bigint = false;
    }
    if (!('circularValue' in options)) {
      options.circularValue = Error;
    }
  }
  const circularValue = getCircularValueOption(options);
  const bigint = getBooleanOption(options, 'bigint');
  const deterministic = getBooleanOption(options, 'deterministic');
  const maximumDepth = getPositiveIntegerOption(options, 'maximumDepth');
  const maximumBreadth = getPositiveIntegerOption(options, 'maximumBreadth');

  function stringifyFnReplacer(
    key: string | number,
    parent: Record<string, SafeAny>,
    stack: unknown[],
    replacer: Replacer,
    spacer: string,
    indentation: string
  ) {
    let value = parent[key];

    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }
    value = (replacer as SafeAny)?.call(parent, key, value);

    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`;
      case 'object': {
        if (value === null) {
          return 'null';
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue;
        }

        let res = '';
        let join = ',';
        const originalIndentation = indentation;

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]';
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"';
          }
          stack.push(value);
          if (spacer !== '') {
            indentation += spacer;
            res += `\n${indentation}`;
            join = `,\n${indentation}`;
          }
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
          let i = 0;
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation);
            res += tmp !== undefined ? tmp : 'null';
            res += join;
          }
          const tmp = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation);
          res += tmp !== undefined ? tmp : 'null';
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1;
            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
          }
          if (spacer !== '') {
            res += `\n${originalIndentation}`;
          }
          stack.pop();
          return `[${res}]`;
        }

        let keys = Object.keys(value);
        const keyLength = keys.length;
        if (keyLength === 0) {
          return '{}';
        }
        if (maximumDepth < stack.length + 1) {
          return '"[Object]"';
        }
        let whitespace = '';
        let separator = '';
        if (spacer !== '') {
          indentation += spacer;
          join = `,\n${indentation}`;
          whitespace = ' ';
        }
        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
        if (isTypedArrayWithEntries(value)) {
          res += stringifyTypedArray(value, join, maximumBreadth);
          keys = keys.slice(value.length);
          maximumPropertiesToStringify -= value.length;
          separator = join;
        }
        if (deterministic) {
          keys = insertSort(keys);
        }
        stack.push(value);
        for (let i = 0; i < maximumPropertiesToStringify; i++) {
          const key = keys[i];
          const tmp = stringifyFnReplacer(key, value, stack, replacer, spacer, indentation);
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}":${whitespace}${tmp}`;
            separator = join;
          }
        }
        if (keyLength > maximumBreadth) {
          const removedKeys = keyLength - maximumBreadth;
          res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
          separator = join;
        }
        if (spacer !== '' && separator.length > 1) {
          res = `\n${indentation}${res}\n${originalIndentation}`;
        }
        stack.pop();
        return `{${res}}`;
      }
      case 'number':
        return isFinite(value) ? String(value) : fail ? fail(value) : 'null';
      case 'boolean':
        return value ? 'true' : 'false';
      case 'undefined':
        return undefined;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- ok
      case 'bigint':
        if (bigint) {
          return String(value);
        }
      // fallthrough
      default:
        return fail ? fail(value) : undefined;
    }
  }

  function stringifyArrayReplacer(
    key: SafeAny,
    value: SafeAny,
    stack: SafeAny,
    replacer: SafeAny,
    spacer: SafeAny,
    indentation: SafeAny
  ) {
    if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
      value = value.toJSON(key);
    }

    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`;
      case 'object': {
        if (value === null) {
          return 'null';
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue;
        }

        const originalIndentation = indentation;
        let res = '';
        let join = ',';

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]';
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"';
          }
          stack.push(value);
          if (spacer !== '') {
            indentation += spacer;
            res += `\n${indentation}`;
            join = `,\n${indentation}`;
          }
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
          let i = 0;
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation);
            res += tmp !== undefined ? tmp : 'null';
            res += join;
          }
          const tmp = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation);
          res += tmp !== undefined ? tmp : 'null';
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1;
            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
          }
          if (spacer !== '') {
            res += `\n${originalIndentation}`;
          }
          stack.pop();
          return `[${res}]`;
        }
        if (replacer.size === 0) {
          return '{}';
        }
        stack.push(value);
        let whitespace = '';
        if (spacer !== '') {
          indentation += spacer;
          join = `,\n${indentation}`;
          whitespace = ' ';
        }
        let separator = '';
        for (const key of replacer) {
          const tmp = stringifyArrayReplacer(key, value[key], stack, replacer, spacer, indentation);
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}":${whitespace}${tmp}`;
            separator = join;
          }
        }
        if (spacer !== '' && separator.length > 1) {
          res = `\n${indentation}${res}\n${originalIndentation}`;
        }
        stack.pop();
        return `{${res}}`;
      }
      case 'number':
        return isFinite(value) ? String(value) : fail ? fail(value) : 'null';
      case 'boolean':
        return value ? 'true' : 'false';
      case 'undefined':
        return undefined;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- ok
      case 'bigint':
        if (bigint) {
          return String(value);
        }
      // fallthrough
      default:
        return fail ? fail(value) : undefined;
    }
  }

  function stringifyIndent(key: SafeAny, value: SafeAny, stack: SafeAny, spacer: SafeAny, indentation: SafeAny): SafeAny {
    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`;
      case 'object': {
        if (value === null) {
          return 'null';
        }
        if (typeof value.toJSON === 'function') {
          value = value.toJSON(key);
          // Prevent calling `toJSON` again.
          if (typeof value !== 'object') {
            return stringifyIndent(key, value, stack, spacer, indentation);
          }
          if (value === null) {
            return 'null';
          }
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue;
        }
        const originalIndentation = indentation;

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]';
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"';
          }
          stack.push(value);
          indentation += spacer;
          let res = `\n${indentation}`;
          const join = `,\n${indentation}`;
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
          let i = 0;
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifyIndent(i, value[i], stack, spacer, indentation);
            res += tmp !== undefined ? tmp : 'null';
            res += join;
          }
          const tmp = stringifyIndent(i, value[i], stack, spacer, indentation);
          res += tmp !== undefined ? tmp : 'null';
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1;
            res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
          }
          res += `\n${originalIndentation}`;
          stack.pop();
          return `[${res}]`;
        }

        let keys = Object.keys(value);
        const keyLength = keys.length;
        if (keyLength === 0) {
          return '{}';
        }
        if (maximumDepth < stack.length + 1) {
          return '"[Object]"';
        }
        indentation += spacer;
        const join = `,\n${indentation}`;
        let res = '';
        let separator = '';
        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
        if (isTypedArrayWithEntries(value)) {
          res += stringifyTypedArray(value, join, maximumBreadth);
          keys = keys.slice(value.length);
          maximumPropertiesToStringify -= value.length;
          separator = join;
        }
        if (deterministic) {
          keys = insertSort(keys);
        }
        stack.push(value);
        for (let i = 0; i < maximumPropertiesToStringify; i++) {
          const key = keys[i];
          const tmp = stringifyIndent(key, value[key], stack, spacer, indentation);
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}": ${tmp}`;
            separator = join;
          }
        }
        if (keyLength > maximumBreadth) {
          const removedKeys = keyLength - maximumBreadth;
          res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
          separator = join;
        }
        if (separator !== '') {
          res = `\n${indentation}${res}\n${originalIndentation}`;
        }
        stack.pop();
        return `{${res}}`;
      }
      case 'number':
        return isFinite(value) ? String(value) : fail ? fail(value) : 'null';
      case 'boolean':
        return value ? 'true' : 'false';
      case 'undefined':
        return undefined;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- ok
      case 'bigint':
        if (bigint) {
          return String(value);
        }
      // fallthrough
      default:
        return fail ? fail(value) : undefined;
    }
  }

  function stringifySimple(key: string | number, value: SafeAny, stack: SafeAny[]): SafeAny {
    switch (typeof value) {
      case 'string':
        return `"${strEscape(value)}"`;
      case 'object': {
        if (value === null) {
          return 'null';
        }
        if (typeof value.toJSON === 'function') {
          value = value.toJSON(key);
          // Prevent calling `toJSON` again
          if (typeof value !== 'object') {
            return stringifySimple(key, value, stack);
          }
          if (value === null) {
            return 'null';
          }
        }
        if (stack.indexOf(value) !== -1) {
          return circularValue;
        }

        let res = '';

        if (Array.isArray(value)) {
          if (value.length === 0) {
            return '[]';
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Array]"';
          }
          stack.push(value);
          const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
          let i = 0;
          for (; i < maximumValuesToStringify - 1; i++) {
            const tmp = stringifySimple(i, value[i], stack);
            res += tmp !== undefined ? tmp : 'null';
            res += ',';
          }
          const tmp = stringifySimple(i, value[i], stack);
          res += tmp !== undefined ? tmp : 'null';
          if (value.length - 1 > maximumBreadth) {
            const removedKeys = value.length - maximumBreadth - 1;
            res += `,"... ${getItemCount(removedKeys)} not stringified"`;
          }
          stack.pop();
          return `[${res}]`;
        }

        let keys = Object.keys(value);
        const keyLength = keys.length;
        if (keyLength === 0) {
          return '{}';
        }
        if (maximumDepth < stack.length + 1) {
          return '"[Object]"';
        }
        let separator = '';
        let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
        if (isTypedArrayWithEntries(value)) {
          res += stringifyTypedArray(value, ',', maximumBreadth);
          keys = keys.slice(value.length);
          maximumPropertiesToStringify -= value.length;
          separator = ',';
        }
        if (deterministic) {
          keys = insertSort(keys);
        }
        stack.push(value);
        for (let i = 0; i < maximumPropertiesToStringify; i++) {
          const key = keys[i];
          const tmp = stringifySimple(key, value[key], stack);
          if (tmp !== undefined) {
            res += `${separator}"${strEscape(key)}":${tmp}`;
            separator = ',';
          }
        }
        if (keyLength > maximumBreadth) {
          const removedKeys = keyLength - maximumBreadth;
          res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
        }
        stack.pop();
        return `{${res}}`;
      }
      case 'number':
        return isFinite(value) ? String(value) : fail ? fail(value) : 'null';
      case 'boolean':
        return value ? 'true' : 'false';
      case 'undefined':
        return undefined;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore -- ok
      case 'bigint':
        if (bigint) {
          return String(value);
        }
      // fallthrough
      default:
        return fail ? fail(value) : undefined;
    }
  }

  function stringify(value: unknown, replacer?: Replacer, space?: string | number) {
    if (arguments.length > 1) {
      let spacer = '';
      if (typeof space === 'number') {
        spacer = ' '.repeat(Math.min(space, 10));
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- fork
        // @ts-ignore
        spacer = space?.slice(0, 10);
      }
      if (replacer != null) {
        if (typeof replacer === 'function') {
          return stringifyFnReplacer('', { '': value }, [], replacer, spacer, '');
        }
        if (Array.isArray(replacer)) {
          return stringifyArrayReplacer('', value, [], getUniqueReplacerSet(replacer), spacer, '');
        }
      }
      if (spacer.length !== 0) {
        return stringifyIndent('', value, [], spacer, '');
      }
    }
    return stringifySimple('', value, []);
  }

  return stringify;
}

export { stringify };
