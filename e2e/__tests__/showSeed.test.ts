/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as path from 'path';
import {extractSummary, replaceSeed} from '../Utils';
import runJest from '../runJest';

const dir = path.resolve(__dirname, '../jest-object');

const randomSeedValueRegExp = /Seed:\s+<<REPLACED>>/;
const seedValueRegExp = /Seed:\s+1234/;

test('--showSeed changes report to output seed', () => {
  const {stderr} = runJest(dir, ['--showSeed', '--no-cache']);

  const {summary} = extractSummary(stderr);

  expect(replaceSeed(summary)).toMatch(randomSeedValueRegExp);
});

test('if --showSeed is not present the report will not show the seed', () => {
  const {stderr} = runJest(dir, ['--seed', '1234']);

  const {summary} = extractSummary(stderr);

  expect(replaceSeed(summary)).not.toMatch(randomSeedValueRegExp);
});

test('if showSeed is present in the config the report will show the seed', () => {
  const {stderr} = runJest(dir, [
    '--seed',
    '1234',
    '--config',
    'different-config.json',
  ]);

  const {summary} = extractSummary(stderr);

  expect(summary).toMatch(seedValueRegExp);
});

test('--seed --showSeed will show the seed in the report', () => {
  const {stderr} = runJest(dir, ['--showSeed', '--seed', '1234']);

  const {summary} = extractSummary(stderr);

  expect(summary).toMatch(seedValueRegExp);
});
