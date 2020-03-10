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

/**
 * Semantically stressing an nullable type.
 */
export type Nullable<T> = T | null;

export * from './class.RawPromise';

export * from './class.TimeoutPromise';

export * from './Error';

import * as Async from './utilities.async';

import * as Validators from './utilities.validators';

export { Async, Validators };
