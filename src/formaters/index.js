import plainFormater from './plain.js';
import stylishFormater from './stylish.js';

const getTree = (tree, format) => {
  switch (format) {
    case 'plain':
      return plainFormater(tree);
    case 'stylish':
      return stylishFormater(tree);
    case 'json':
      return JSON.stringify(tree, null, 2);
    default:
      throw new Error(`Unknown format '${format}'.`);
  }
};

export default getTree;
