import { resolve } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const getFormatData = (packageDist, fileType) => {
  const normalaizDist = resolve(cwd(), packageDist);
  const data = readFileSync(normalaizDist, 'utf-8');

  switch (fileType) {
    case '.yml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      return data;
  }
};

export default getFormatData;
