import _ from 'lodash';


const check = (value, replaser = '') => {
  if (typeof value !== 'object') {
    return value;
  }
  const [key, val] = Object.entries(value).flat();
  return `{\n${replaser}${replaser}${key}: ${check(val)}\n}`;
}
// const spacesCount = (replacer = ' ', count = 1, depth = 1) => {
//   return replacer.repeat(count * depth);
// };
const stylishFormater = (parsTree, depth = 1) => {
  const replacer = '  ';
  const spacesCount = 1;
  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const str = parsTree.flatMap(({status, key, past, current, children}) => {
    if (status === 'deleted') {
      return `${currentIndent}- ${key}: ${check(past, currentIndent)}`;
    }
    if (status === 'added') {
      return `${currentIndent}+ ${key}: ${check(current, currentIndent)}`;
    }
    if (status === 'areEqual') {
      return `${currentIndent}  ${key}: ${check(past, currentIndent)}`;
    }
    if (status === 'notEqual') {
      return `${currentIndent}- ${key}: ${check(past, currentIndent)}\n${currentIndent}+ ${key}: ${check(current, currentIndent)}`;
    }
    if (status === 'node') {
      // console.log('children =======>', children)
      const zzz = stylishFormater(children, depth + 1);
      // console.log('zzz ===> ', zzz);
      return `${currentIndent}  ${key}: ${zzz}`;
      // return zzz;
    }
  });
  /***********************************/
  const res = [
    '{',
    ...str,
    `${bracketIndent}}`
  ].join('\n');
  // console.log('str => ', str)
  console.log('res ====>');
  console.log(res);
  // return console.log('END of stylishFormater');
  return res;
}

export default stylishFormater;
