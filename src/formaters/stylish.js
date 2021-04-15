import _ from 'lodash';

const getIndent = (depth) => {
  const current = '  '.repeat(depth);
  const bracket = (depth <= 1) ? '' : '  '.repeat(depth - 1);
  return { current, bracket };
};

const check = (value, depth = 1) => {
  const idents = getIndent(depth);
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.flatMap((key) => `\n${idents.current}  ${key}: ${check(value[key], depth + 2)}`);
  return `{${result.join('')}\n${idents.bracket}}`;
};

const stylishFormater = (parsTree, depth = 1) => {
  const idents = getIndent(depth);
  const str = parsTree.flatMap(({
    type, key, past, current, children,
  }) => {
    switch (type) {
      case 'deleted':
        return `${idents.current}- ${key}: ${check(past, depth + 2)}`;
      case 'added':
        return `${idents.current}+ ${key}: ${check(current, depth + 2)}`;
      case 'unchanged':
        return `${idents.current}  ${key}: ${check(past, depth + 2)}`;
      case 'changed':
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
