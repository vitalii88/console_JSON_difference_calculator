const chek = (val) => {
  if (val === null) return 'null';
  if (typeof val === 'string') return `'${val}'`;
  return typeof val !== 'object' ? val : '[complex value]';
};

const plainFormater = (parsTree, depth = '') => {
  const cleanArr = parsTree.filter((iter) => iter.type !== 'unchanged');
  const res = cleanArr.flatMap(({
    type, key, past, current, children,
  }) => {
    const fullKey = `${depth}${key}`;
    switch (type) {
      case 'deleted':
        return `Property '${fullKey}' was removed`;
      case 'added':
        return `Property '${fullKey}' was added with value: ${chek(current)}`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${chek(past)} to ${chek(current)}`;
      default:
        return `${plainFormater(children, `${fullKey}.`)}`;
    }
  });
  return res.join('\n');
};

export default plainFormater;
