import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';
import genFlatFileDiff from '../src/parsers.js';

const getFixturePath = (filename) => resolve(cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genFlatFileDiff', () => {
  test('to compare two flat JSON files', () => {
    const result = genFlatFileDiff(getFixturePath('before.json').trim(), getFixturePath('after.json')).trim();
    const reference = readFile('expected_json').trim();
    expect(reference).toBe(result);
  });
});

// describe('genFlatYamlDiff', () => {
//   test('read yaml file', () => {
//     const file = yaml.load(readFile('beforeFlat.yaml'));
//     expect(file).not.toBeFalsy();
//   });
//   test('to compare two flat YAML files', () => {
//     const result = genFlatFileDiff(getFixturePath('beforeFlat.yaml').trim(), getFixturePath('afterFlat.yaml')).trim();
//     const reference = readFile('expected_json').trim();
//     expect(reference).toBe(result);
//   });
// });
