import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import * as _ from 'lodash';
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

export {
  getDataFromJSON,
};
