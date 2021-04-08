import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => resolve(cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('to compare two JSON/yaml files', () => {
    const resultStylish = genDiff(getFixturePath('before.json').trim(), getFixturePath('after.json')).trim();
    const resultPlain = genDiff(getFixturePath('before.json').trim(), getFixturePath('after.json'), 'plain').trim();
    const resultJSON = genDiff(getFixturePath('before.json').trim(), getFixturePath('after.json'), 'json').trim();
    const referenceStylish = readFile('expected_stylish').trim();
    const referencePlain = readFile('expected_plain').trim();
    const referenceJSON = readFile('expected_json').trim();
    expect(referenceStylish).toBe(resultStylish);
    expect(referencePlain).toBe(resultPlain);
    expect(referenceJSON).toBe(resultJSON);
  });
});
