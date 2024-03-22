'use strict';

/**
 * units-dld controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::units-dld.units-dld',
    ({ strapi }) => ({
        async findOne(ctx) {
            try {
                // Extract the id from the request parameters (assuming it's a route parameter)
                const { id } = ctx.params;
                // Ensure the id is treated as an integer
                const location = await strapi.db
                    .query("api::units-dld.units-dld")
                    .findWithCount({ where: { area_id: parseInt(id) } });
                ctx.send({ success: true, data: location });
            } catch (error) {
                // Handle errors
                ctx.send({ success: false, message: "An error occurred." });
            }
        },
    })
);