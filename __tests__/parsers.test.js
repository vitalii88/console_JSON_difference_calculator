import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => resolve(cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  const resultStylish = genDiff(getFixturePath('file1.json').trim(), getFixturePath('file2.json')).trim();
  const resultPlain = genDiff(getFixturePath('file1.json').trim(), getFixturePath('file2.json'), 'plain').trim();
  const referenceStylish = readFile('result_stylish.txt').trim();
  const referencePlain = readFile('result_plain.txt').trim();
  test.each([
    [referenceStylish, resultStylish],
    [referencePlain, resultPlain],
  ])('to compare two JSON/yaml files', (a, expected) => {
    expect(a).toBe(expected);
  });
});
