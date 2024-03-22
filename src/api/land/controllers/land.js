'use strict';

/**
 * land controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::land.land', {
    async findOne(ctx) {
        try {
            // Extract the id from the request parameters (assuming it's a route parameter)
            const { id } = ctx.params;
            // Ensure the id is treated as an integer
            const location = await strapi.db
                .query("api::land.land")
                .findOne({ where: { area_id: parseInt(id) } });
            ctx.send({ success: true, data: location });
        } catch (error) {
            // Handle errors
            ctx.send({ success: false, message: "An error occurred." });
        }
    }
})

// All
// propertytype apartment
// unit number 401
// in dubai Marina