import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { genFlatFileDiff } from '../src/functions.js';

const getFixturePath = (filename) => resolve(cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genFlatFileDiff', () => {
  test('to compare two flat JSON files', () => {
    const result = genFlatFileDiff(getFixturePath('before.json'), getFixturePath('after.json')).trim();
    const reference = readFile('expected_json').trim();
    expect(reference).toBe(result);
  });
});
