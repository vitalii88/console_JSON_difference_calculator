import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import _ from 'lodash';

/**
 * The function takes 2 arguments.
 * 1.path to JSON file
 * 2.format in which will return the result:
 * 'string' - will return the file structure in string format.
 * 'object' - return structure in object format
 */
const getDataFromJSON = (packageDist, format) => {
  const normalaizDist = resolve(cwd(), packageDist);
  const data = readFileSync(normalaizDist);

  let res;
  switch (format) {
    case 'string':
      res = data.toString();
      break;
    case 'object':
      res = JSON.parse(data);
      break;
    default:
      res = data;
  }
  return res;
};

/**
 * The function sorts "A -> B" flat object
 */
const getSortObjFromKey = (object) => Object.fromEntries(Object.entries(object).sort());

/**
 * The function takes two arguments: paths to files with flat objects.
 * The result of the function will be a line with marks about changes
 * in the second file in relation to the first.
 */
const genFlatFileDiff = (file1, file2) => {
  const sortObject1 = getSortObjFromKey(getDataFromJSON(file1, 'object'));
  const sortObject2 = getSortObjFromKey(getDataFromJSON(file2, 'object'));

  const objToArr1 = Object.entries(sortObject1);
  const objToArr2 = Object.entries(sortObject2);
  const allKeys = Object.getOwnPropertyNames(_.defaults(sortObject1, sortObject2));

  const diffArr = allKeys.reduce((acc, key) => {
    const arg1 = objToArr1.find((element1) => element1[0] === key);
    const arg2 = objToArr2.find((element2) => element2[0] === key);

    if (arg1 !== undefined && arg2 !== undefined) {
      if (arg1[1] === arg2[1]) {
        acc.push([`    ${arg1[0]}: ${arg1[1]}`]);
      } else {
        acc.push([`  - ${arg1[0]}: ${arg1[1]}`]);
        acc.push([`  + ${arg2[0]}: ${arg2[1]}`]);
      }
      return acc;
    }
    if (arg1 !== undefined && arg2 === undefined) acc.push([`  - ${arg1[0]}: ${arg1[1]}`]);
    if (arg1 === undefined) acc.push([`  + ${arg2[0]}: ${arg2[1]}`]);
    return acc;
  }, []);
  return `{\n${diffArr.join('\n')}\n}`;
};

export {
  getDataFromJSON,
  getSortObjFromKey,
  genFlatFileDiff,
};
