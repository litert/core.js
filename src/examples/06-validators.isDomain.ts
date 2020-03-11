/**
 * Copyright 2020 Angus.Fenying <fenying@litert.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as Core from '../lib';

const TESTS: string[] = [
    '',
    'localhost',
    '127.0.0.1',
    'a.com',
    '.',
    'com.',
    '.com',
    '-',
    '_',
    'g_',
    'g-',
    'c+',
    'c!',
    'a.b.c.d',
    'www.google.com',
    '.google.com'
];

const MAX_LENGTH = Math.max(...TESTS.map((x) => x.length)) + 4;

for (const item of TESTS) {

    if (Core.Validators.isDomain(item)) {

        console.info(`${item.padEnd(MAX_LENGTH, ' ')} -> Yes`);
    }
    else {

        console.error(`${item.padEnd(MAX_LENGTH, ' ')} -> No`);
    }
}
