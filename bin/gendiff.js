#!/usr/bin/env node

import { Command } from 'commander';
import { genFlatFileDiff } from '../src/functions.js';

const gendiff = new Command();

gendiff
  .name('gendiff ')
  .description('Compares two configuration files and shows a difference.')
  .version('1.2.0')

gendiff
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    genFlatFileDiff(filepath1, filepath2);
  });

gendiff.parse(process.argv);

const options = gendiff.opts();
if (options.format) console.log('This option is not implemented in the current version of the application.');
