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

const errors = Core.getDefaultErrorHub();

const TEST_ERROR = errors.define(123, "TEST_ERROR", "This is a test error.", {});

console.error(JSON.stringify(new TEST_ERROR().toJSON(true), null, 2));

interface IMyErrorMetadata {

    source: string;
}

const myErrors = Core.createErrorHub();

/**
 * Type 1 of error.
 */
const MY_TEST_ERROR1 = myErrors.define<IMyErrorMetadata>(
    1,
    "MY_TEST_ERROR1",
    "Custom error 1",
    {
        source: "UK"
    }
);

/**
 * Type 2 of error.
 */
const MY_TEST_ERROR2 = myErrors.define<IMyErrorMetadata>(
    2,
    "MY_TEST_ERROR2",
    "Custom error 2",
    {
        "source": "China"
    },
    [1234],
    ["HEIHEIHEI"]
);

console.error(JSON.stringify(new MY_TEST_ERROR1({
    "metadata": {
        "source": "USA"
    }
}).toJSON(true), null, 2));

if (Core.isError(new MY_TEST_ERROR2({ metadata: {} }))) {

    console.log(MY_TEST_ERROR2.message);
    console.log(MY_TEST_ERROR2.aliasCodes);
    console.log(MY_TEST_ERROR2.aliases);
    console.log(new MY_TEST_ERROR2().metadata.source);
    console.log(new MY_TEST_ERROR2({ "metadata": { "source": "Japan" } }).metadata.source);
    console.log(new MY_TEST_ERROR2({ "metadata": { "source": "Japan" } }).aliasCodes);
}

try {

    myErrors.define<IMyErrorMetadata>(
        2,
        "MY_TEST_ERROR2",
        "Custom error 2",
        {
            source: "RU"
        }
    );
}
catch (e) {

    console.error(e.toString());
}

console.log(`Hub[default] Module:               ${errors.module}`);

console.log(`Hub[myErrors] Module:              ${myErrors.module}`);

console.log(`Error[MY_TEST_ERROR2] Module:      ${MY_TEST_ERROR2.module}`);

console.log(`Error[INVALID_ERROR_NAME] Module:  ${errors.get("INVALID_ERROR_NAME").module}`);

console.log(`Error[MY_TEST_ERROR2] Source:      ${myErrors.get("MY_TEST_ERROR2").defaultMetadata.source}`);

console.log(`Error[1234] Name:                  ${myErrors.get(1234).name}`);

console.log(`Error[HEIHEIHEI] Name:             ${myErrors.get("HEIHEIHEI").name}`);
