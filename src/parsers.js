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
const getData = (packageDist, format) => {
  const normalaizDist = resolve(cwd(), packageDist);
  const data = readFileSync(normalaizDist, 'utf-8');

  let res;
  switch (format) {
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
const getUnqKeys = (firstObj, secondObj) => [...new Set([...Object.keys(firstObj), ...Object.keys(secondObj)])];

/**
 *
 */
const builder = (beforeObj, afterObj) => {
  const before = getSortObjFromKey(beforeObj);
  const after = getSortObjFromKey(afterObj);
  const allKeys = getUnqKeys(before, after);
  // console.log('allKeys ==> ', allKeys);
  // console.log('before After allKeys ==> ', before);
  // console.log('after After allKeys ==> ', after);
  const tree = allKeys.map((key) => {
    // console.log('Map Key => ', key);
    // console.log('before[key] => ', before[key]);
    const past = before[key];
    // console.log('after[key] => ', after[key]);
    const current = after[key];
    if (!_.has(before, key)) return { status: 'added', key, current };
    if (!_.has(after, key)) return { status: 'deleted', key, past };
    if (typeof past === 'object' && typeof current === 'object') {
      const children = builder(past, current);
      return { status: 'node', key, children };
    }
    if (!_.isEqual(past, current)) return { status: 'notEqual', key, past, current, };
    return { status: 'areEqual', key, past }
  });

  return tree;
}

/**
 * The function takes two arguments: paths to files with flat objects.
 * The result of the function will be a line with marks about changes
 * in the second file in relation to the first.
 * { key: xxx,
 *   value: yyy,
 *   status: notEqual, deleted, added, node
 *    child: {}
 * }
 */
export default function genFlatFileDiff(file1, file2) {
  const format = extname(file1);
  const object1 = getData(file1, format);
  const object2 = getData(file2, format);
  const res = builder(object1, object2);
  // console.log('---------------------------')
  // console.dir(res, {depth: 10});
  const diffTree = stylishFormater(res);
  // const diffArr = genDiffArr(allKeys, objToArr1, objToArr2);
  // return `{\n${diffArr.join('\n')}\n}`;
  return 'END';
}










