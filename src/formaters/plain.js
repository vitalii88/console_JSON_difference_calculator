const chek = (val) => (typeof val !== 'object' ? `'${val}'` : '[complex value]');

const plainFormater = (parsTree, depth = '') => {
  const cleanArr = parsTree.filter((iter) => iter.status !== 'areEqual');
  const res = cleanArr.flatMap(({
    status, key, past, current, children,
  }) => {
    const fullKey = `${depth}${key}`;
    switch (status) {
      case 'deleted':
        return `Property '${fullKey}' was removed`;
      case 'added':
        return `Property '${fullKey}' was added with value: ${chek(current)}`;
      case 'notEqual':
        return `Property '${fullKey}' was updated. From ${chek(past)} to ${chek(current)}`;
      default:
        return `${plainFormater(children, `${fullKey}.`)}`;
    }
  });
  return res.join('\n');
};

export default plainFormater;
