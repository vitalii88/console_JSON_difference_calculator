#!/usr/bin/env node

import { Command } from 'commander';
import { getDataFromJSON } from '../src/functions.js';

const gendiff = new Command();

gendiff
  .version('1.2.0');

gendiff
  .option('-f, --format [type]', 'output format');

gendiff.parse(process.argv);
