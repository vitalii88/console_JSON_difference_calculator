import yaml from 'js-yaml';

const parser = (data, type) => {
  switch (type) {
    case '.yml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      return data;
  }
};

export default parser;
