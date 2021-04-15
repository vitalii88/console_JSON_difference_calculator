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
    if (!_.has(beforeObj, key)) return { type: 'added', key, current };
    if (!_.has(afterObj, key)) return { type: 'deleted', key, past };
    if (_.isPlainObject(past) && _.isPlainObject(current)) {
      const children = astBuilder(past, current);
      return { type: 'nested', key, children };
    }
    if (!_.isEqual(past, current)) {
      return {
        type: 'changed', key, past, current,
      };
    }
    return { type: 'unchanged', key, past };
  });
};
export default astBuilder;
