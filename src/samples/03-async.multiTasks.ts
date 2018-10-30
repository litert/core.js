/**
 * Copyright 2018 Angus.Fenying
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

// tslint:disable:no-console

import * as Core from "../lib";

async function makePromise(ms: number): Promise<number> {

    await Core.Async.sleep(ms);

    const ret = Math.floor(Math.random() * 10);

    if (ret >= 5) {

        return ret;
    }

    throw new Error("Failed.");
}

(async () => {

    const result = await Core.Async.multiTasks(
        Array(10).fill(0).map(
            (x) => Math.floor(Math.random() * 1000)
        ).map(makePromise)
    );

    console.log(JSON.stringify(result, null, 2));

})();
