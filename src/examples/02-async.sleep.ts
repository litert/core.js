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

    console.log(new Date().toISOString());

    const result = await Core.Async.sleep(1000, 'cc', 123, true);

    console.log(new Date().toISOString());

    for (let i = 0; i < result.length; i++) {

        console.info(`result[${i}] = ${JSON.stringify(result[i])}`);
    }

})();
