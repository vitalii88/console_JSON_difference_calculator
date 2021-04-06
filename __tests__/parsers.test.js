import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import genDiff from '../src/parsers.js';

const getFixturePath = (filename) => resolve(cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('to compare two JSON/yaml files', () => {
    const resultJSON = genDiff(getFixturePath('before.json').trim(), getFixturePath('after.json')).trim();
    const resultPlain = genDiff(getFixturePath('before.json').trim(), getFixturePath('after.json'), 'plain').trim();
    const referenceJSON = readFile('expected_json').trim();
    const referencePlain = readFile('expected_plain').trim();
    expect(referenceJSON).toBe(resultJSON);
    expect(referencePlain).toBe(resultPlain);
  });
});
