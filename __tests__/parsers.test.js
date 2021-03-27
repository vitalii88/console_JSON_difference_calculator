import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';
import genDiff from '../src/parsers.js';

const getFixturePath = (filename) => resolve(cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('to compare two JSON files', () => {
    const result = genDiff(getFixturePath('before.json').trim(), getFixturePath('after.json')).trim();
    const reference = readFile('expected_json').trim();
    expect(reference).toBe(result);
  });
  test('read yaml file', () => {
    const file = yaml.load(readFile('beforeFlat.yaml'));
    expect(file).not.toBeFalsy();
  });
  test('to compare two YAML files', () => {
    const result = genDiff(getFixturePath('beforeFlat.yaml').trim(), getFixturePath('afterFlat.yaml')).trim();
    const reference = readFile('expected_json').trim();
    expect(reference).toBe(result);
  });
});
