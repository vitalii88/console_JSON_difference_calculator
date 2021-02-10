#!/usr/bin/env node

import { Command } from 'commander';

const gendiff = new Command();

gendiff
  .version('0.0.1');

gendiff.parse(process.argv);
