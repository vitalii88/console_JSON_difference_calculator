import _ from 'lodash';

const getIndent = (depth) => {
  const current = '  '.repeat(depth);
  const bracket = (depth <= 1) ? '' : '  '.repeat(depth - 1);
  return { current, bracket };
};
// const getSortObjFromKey = (object) => Object.fromEntries(Object.entries(object).sort());
const check = (value, depth = 1) => {

  const idents = getIndent(depth);
  if (!_.isObject(value)) {
    return value;
  }
  const valKeys = Object.keys(value);
  const strElems = valKeys.flatMap((key) => `\n${idents.current}  ${key}: ${check(value[key], depth + 2)}`);
  return `{${strElems.join('')}\n${idents.bracket}}`;
};

const stylishFormater = (parsTree, depth = 1) => {
  const idents = getIndent(depth);
  const str = parsTree.flatMap(({
    status, key, past, current, children,
  }) => {
    switch (status) {
      case 'deleted':
        return `${idents.current}- ${key}: ${check(past, depth + 2)}`;
      case 'added':
        return `${idents.current}+ ${key}: ${check(current, depth + 2)}`;
      case 'areEqual':
        return `${idents.current}  ${key}: ${check(past, depth + 2)}`;
      case 'notEqual':
        return `${idents.current}- ${key}: ${check(past, depth + 2)}\n${idents.current}+ ${key}: ${check(current, depth + 2)}`;
      default:
        return `${idents.current}  ${key}: ${stylishFormater(children, depth + 2)}`;
    }
  });
  return [
    '{',
    ...str,
    `${idents.bracket}}`,
  ].join('\n');
};

export default stylishFormater;
