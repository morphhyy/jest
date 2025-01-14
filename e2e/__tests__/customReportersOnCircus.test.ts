/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {skipSuiteOnJasmine} from '@jest/test-utils';
import runJest from '../runJest';

skipSuiteOnJasmine();

describe('Custom Reporters Integration on jest-circus', () => {
  test('valid passing assertion counts for adding reporters', () => {
    const {stdout} = runJest('custom-reporters', [
      '--config',
      JSON.stringify({
        reporters: [
          'default',
          '<rootDir>/reporters/AssertionCountsReporter.js',
        ],
      }),
      'add.test.js',
    ]);

    expect(stdout).toMatchSnapshot();
  });

  test('valid failing assertion counts for adding reporters', () => {
    const {stdout} = runJest('custom-reporters', [
      '--config',
      JSON.stringify({
        reporters: [
          'default',
          '<rootDir>/reporters/AssertionCountsReporter.js',
        ],
      }),
      'addFail.test.js',
    ]);

    expect(stdout).toMatchSnapshot();
  });
});
