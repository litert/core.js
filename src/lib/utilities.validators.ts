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

const DOMAIN_REGEXP = /^[a-z0-9][-a-z0-9]{0,62}(\.[a-z0-9][-a-z0-9]{0,62})*$/i;

const DOMAIN_MAX_LENGTH = 255;

const EMAIL_REGEXP = /^[-+_a-z0-9][-+_.a-z0-9]{0,62}@[a-z0-9][-a-z0-9]{0,62}(\.[a-z0-9][-a-z0-9]{0,62})*$/i;

const EMAIL_MAX_LENGTH = 255;

/**
 * Validate if the input string is a domain.
 *
 * @param domain The string to be validated.
 */
export function isDomain(domain: string): boolean {

    return domain.length > 0 &&
           domain.length < DOMAIN_MAX_LENGTH &&
           DOMAIN_REGEXP.test(domain);
}

/**
 * Validate if the input string is an E-Mail address.
 *
 * Not exactly matches the RFC, but fits most general usage.
 *
 * @param email The string to be validated.
 */
export function isEMailAddress(email: string): boolean {

    return email.length > 0 &&
           email.length < EMAIL_MAX_LENGTH &&
           email.indexOf('..') === -1 &&
           email.indexOf('.@') === -1 &&
           EMAIL_REGEXP.test(email);
}
