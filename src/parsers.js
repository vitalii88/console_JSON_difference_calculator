import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import yaml from 'js-yaml';
import getTree from './formaters/index.js';

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

const getSortObjFromKey = (object) => Object.fromEntries(Object.entries(object).sort());

const getUnqKeys = (firstObj, secondObj) => [
  ...new Set([...Object.keys(firstObj), ...Object.keys(secondObj)]),
];

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

export default function geneDiff(file1, file2, format = 'stylish') {
  const fileType = extname(file1);
  const object1 = getData(file1, fileType);
  const object2 = getData(file2, fileType);
  const structure = builder(object1, object2);
  return getTree(structure, format);
}
