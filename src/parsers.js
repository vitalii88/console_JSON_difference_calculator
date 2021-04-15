import { resolve } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const getData = (packageDist, type) => {
  const normalaizDist = resolve(cwd(), packageDist);
  const data = readFileSync(normalaizDist, 'utf-8');

  switch (type) {
    case '.yml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      return data;
  }
};

export default getData;
