'use strict';

/**
 * index-meili service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::index-meili.index-meili');
