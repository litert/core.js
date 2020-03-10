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

import * as Core from '../lib';

(async () => {

    let ret = new Core.TimeoutPromise<string, Error>(
        100,
        new Error('TIMEOUT'),
        true,
        function(result): void {

            if (result.value) {

                console.log('Timeout Result:', result.value);
            }
            else if (result.error) {

                console.error('Timeout Error:', result.error);
            }
        }
    );

    setTimeout(ret.resolve, 300, 'hello');

    try {

        await ret.promise;

        console.log('Not timeout.');
    }
    catch (e) {

        console.error(e);
    }

})();
