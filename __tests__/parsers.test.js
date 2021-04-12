import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => resolve(cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('to compare two JSON/yaml files', () => {
    const resultStylish = genDiff(getFixturePath('file1.json').trim(), getFixturePath('file2.json')).trim();
    const resultPlain = genDiff(getFixturePath('file1.json').trim(), getFixturePath('file2.json'), 'plain').trim();
    const referenceStylish = readFile('result_stylish.txt').trim();
    const referencePlain = readFile('result_plain.txt').trim();
    expect(referenceStylish).toBe(resultStylish);
    expect(referencePlain).toBe(resultPlain);
  });
});
