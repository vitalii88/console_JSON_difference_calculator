const getIndent = (depth) => {
  const current = '  '.repeat(depth);
  const bracket = (depth <= 1) ? '' : '  '.repeat(depth - 1);
  return { current, bracket };
};

const check = (value, depth = 1) => {
  const idents = getIndent(depth);
  if (typeof value !== 'object') {
    return value;
  }
  const [key, val] = Object.entries(value).flat();
  return `{\n${idents.current}${key}: ${check(val)}\n${idents.bracket}}`;
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
