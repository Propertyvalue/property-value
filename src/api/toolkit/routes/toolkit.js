'use strict';

/**
 * toolkit router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::toolkit.toolkit');
