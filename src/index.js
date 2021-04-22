import { readFileSync } from 'fs';
import { extname, resolve } from 'path';
import { cwd } from 'process';
import parser from './parsers.js';
import astBuilder from './ast.js';
import formater from './formaters/index.js';

const getData = (file) => {
  const fileType = extname(file).slice(1);
  const normalaizDist = resolve(cwd(), file);
  const data = readFileSync(normalaizDist, 'utf-8');
  return parser(data, fileType);
};

export default function geneDiff(file1, file2, format = 'stylish') {
  const object1 = getData(file1);
  const object2 = getData(file2);
  const structure = astBuilder(object1, object2);
  return formater(structure, format);
}
