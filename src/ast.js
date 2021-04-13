import _ from 'lodash';

const getUnqKeys = (firstObj, secondObj) => [
  ...new Set([...firstObj, ...secondObj]),
];

const astBuilder = (beforeObj, afterObj) => {
  const before = Object.keys(beforeObj);
  const after = Object.keys(afterObj);
  const allKeys = getUnqKeys(before, after);

  return _.sortBy(allKeys).map((key) => {
    const past = beforeObj[key];
    const current = afterObj[key];
    if (!_.has(beforeObj, key)) return { status: 'added', key, current };
    if (!_.has(afterObj, key)) return { status: 'deleted', key, past };
    if (typeof past === 'object' && typeof current === 'object') {
      const children = astBuilder(past, current);
      return { status: 'node', key, children };
    }
    if (!_.isEqual(past, current)) {
      return {
        status: 'notEqual', key, past, current,
      };
    }
    return { status: 'areEqual', key, past };
  });
};
export default astBuilder;
