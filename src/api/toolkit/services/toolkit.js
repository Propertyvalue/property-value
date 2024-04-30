'use strict';

/**
 * toolkit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::toolkit.toolkit');
