import { extname } from 'path';
import getFormatData from './formater.js';
import astBuilder from './ast.js';
import formater from './formaters/index.js';

export default function geneDiff(file1, file2, format = 'stylish') {
  const fileType = extname(file1);
  const object1 = getFormatData(file1, fileType);
  const object2 = getFormatData(file2, fileType);
  const structure = astBuilder(object1, object2);
  return formater(structure, format);
}
