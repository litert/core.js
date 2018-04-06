/*
   +----------------------------------------------------------------------+
   | LiteRT Core.js Library                                               |
   +----------------------------------------------------------------------+
   | Copyright (c) 2018 Fenying Studio                                    |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/core.js/blob/master/LICENSE                |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <fenying@litert.org>                          |
   +----------------------------------------------------------------------+
 */

const DOMAIN_REGEXP = /^[a-z0-9][-a-z0-9]{0,62}(\.[a-z0-9][-a-z0-9]{0,62})*$/i;

const DOMAIN_MAX_LENGTH = 255;

const EMAIL_REGEXP = /^[-+_a-z0-9][-+_\.a-z0-9]{0,62}@[a-z0-9][-a-z0-9]{0,62}(\.[a-z0-9][-a-z0-9]{0,62})*$/i;

const EMAIL_MAX_LENGTH = 255;

/**
 * Validate if the input string is a domain.
 *
 * @param domain The string to be validated.
 */
export function isDomain(domain: string): boolean {

    return domain.length < DOMAIN_MAX_LENGTH &&
           DOMAIN_REGEXP.test(domain);
}

/**
 * Validate if the input string is an E-Mail address.
 *
 * Not exactly matches the RFC, but for most usage.
 *
 * @param email The string to be validated.
 */
export function isEMailAddress(email: string): boolean {

    return email.length < EMAIL_MAX_LENGTH &&
           EMAIL_REGEXP.test(email) &&
           email.indexOf("..") === -1 &&
           email.indexOf(".@") === -1;
}
