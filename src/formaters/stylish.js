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
  // const replacer = ' ';
  const idents = getIndent(depth);
  const str = parsTree.flatMap(({
    status, key, past, current, children
  }) => {
    if (status === 'deleted') {
      return `${idents.current}- ${key}: ${check(past, depth + 2)}`;
    }
    if (status === 'added') {
      return `${idents.current}+ ${key}: ${check(current, depth + 2)}`;
    }
    if (status === 'areEqual') {
      return `${idents.current}  ${key}: ${check(past, depth + 2)}`;
    }
    if (status === 'notEqual') {
      return `${idents.current}- ${key}: ${check(past, depth + 2)}\n${idents.current}+ ${key}: ${check(current, depth + 2)}`;
    }
    if (status === 'node') {
      const zzz = stylishFormater(children, depth + 2);
      return `${idents.current}  ${key}: ${zzz}`;
    }
  });
  const res = [
    '{',
    ...str,
    `${idents.bracket}}`
  ].join('\n');
  return res;
}

export default stylishFormater;
