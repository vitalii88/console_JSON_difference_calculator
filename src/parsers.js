import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import yaml from 'js-yaml';
import stylishFormater from './formaters/stylish.js';

/**
 * The function takes 2 arguments.
 * 1.path to file
 * 2.file format
  */
const getData = (packageDist, fileType) => {
  const normalaizDist = resolve(cwd(), packageDist);
  const data = readFileSync(normalaizDist, 'utf-8');

  let res;
  switch (fileType) {
    case '.yaml':
      res = yaml.load(data);
      break;
    case '.json':
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
 * Retrieves unique keys
 * @param firstObj
 * @param secondObj
 * @returns {string[]}
 * Alternative "_.union(Object.keys(firstObj), Object.keys(secondObj));"
 */
const getUnqKeys = (firstObj, secondObj) => [
  ...new Set([...Object.keys(firstObj), ...Object.keys(secondObj)]),
];

/**
 *
 */
const builder = (beforeObj, afterObj) => {
  const before = getSortObjFromKey(beforeObj);
  const after = getSortObjFromKey(afterObj);
  const allKeys = getUnqKeys(before, after);

  const tree = allKeys.map((key) => {
    const past = before[key];
    const current = after[key];
    if (!_.has(before, key)) return { status: 'added', key, current };
    if (!_.has(after, key)) return { status: 'deleted', key, past };
    if (typeof past === 'object' && typeof current === 'object') {
      const children = builder(past, current);
      return { status: 'node', key, children };
    }
    if (!_.isEqual(past, current)) {
      return {
        status: 'notEqual', key, past, current,
      };
    }
    return { status: 'areEqual', key, past };
  });

  return tree;
};

/**
 *
 * @param {file1}
 * @param {file2}
 * @param {format}
 * @returns {*}
 */
export default function geneDiff(file1, file2, format = 'stylish') {
  const fileType = extname(file1);
  const object1 = getData(file1, fileType);
  const object2 = getData(file2, fileType);
  const res = builder(object1, object2);
  const diffTree = stylishFormater(res);
  return (format === 'stylish') ? stylishFormater(res) : diffTree;
}
