import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import yaml from 'js-yaml';

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
 * the function takes 3 arguments:
 * keys: An array of all keys
 * beforeArr: original array
 * afterArr: array with result
 * The result of the function will be an array with states
 */
const genDiffArr = (keys, beforeArr, afterArr) => keys.reduce((acc, key) => {
  const arg1 = beforeArr.find((element1) => element1[0] === key);
  const arg2 = afterArr.find((element2) => element2[0] === key);

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

/**
 * Retrieves unique keys
 * @param firstObj
 * @param secondObj
 * @returns {string[]}
 */
const getUnqKeys = (firstObj, secondObj) => {
  // return Object.getOwnPropertyNames(_.defaults(firstObj, secondObj));
  return _.union(Object.keys(firstObj), Object.keys(secondObj));
  // const key1 = Object.keys(firstObj);
  // console.log('key1 ==>', key1);
  // const key2 = Object.keys(secondObj);
  // console.log('key2 ==>', key2);
  // return _.union(key1, key2);
}

/**
 *
 */
const builder = () => {

}

/**
 * The function takes two arguments: paths to files with flat objects.
 * The result of the function will be a line with marks about changes
 * in the second file in relation to the first.
 * { key: xxx,
 *   value: yyy,
 *   status: areEqual, deleted, added
 *    child: {}
 * }
 */
export default function genFlatFileDiff(file1, file2) {
  const format = extname(file1);
  const sortObject1 = getSortObjFromKey(getData(file1, format));
  console.log('sortObject1 ==> ', sortObject1);
  const sortObject2 = getSortObjFromKey(getData(file2, format));
  console.log('sortObject2 ==> ', sortObject2);
  // const objToArr1 = Object.entries(sortObject1);
  // const objToArr2 = Object.entries(sortObject2);

  const allKeys = getUnqKeys(sortObject1, sortObject2);
  console.log('allKeys ==> ', allKeys);
  console.log('sortObject1 After allKeys ==> ', sortObject1);
  console.log('sortObject2 After allKeys ==> ', sortObject2);
  const tree = allKeys.map((key) => {
    console.log('Map Key => ', key);
    console.log('sortObject1[key] => ', sortObject1[key]);
    console.log('sortObject2[key] => ', sortObject2[key]);
    // if (!_.has(sortObject1, key)) {
    //   return {  };
    // }
  });


  // const diffArr = genDiffArr(allKeys, objToArr1, objToArr2);
  // return `{\n${diffArr.join('\n')}\n}`;
  return 'END';
}










