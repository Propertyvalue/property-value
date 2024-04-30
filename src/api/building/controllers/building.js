'use strict';

/**
 * building controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::building.building',
    ({ strapi }) => ({
        async findOne(ctx) {
            try {
                // Extract the id from the request parameters (assuming it's a route parameter)
                const { id } = ctx.params;
                // Assuming project_id is also coming from the request parameters
                const { master_project_id, project_id, building_number } = ctx.request.query;
                // Ensure the id is treated as an integer
                const whereClause = {
                    area_id: parseInt(id)
                };
                if (master_project_id) {
                    whereClause.master_project_id = master_project_id;
                }
                if (project_id) {
                    whereClause.project_id = project_id;
                }
                if (building_number) {
                    whereClause.building_number = building_number;
                }
                const location = await strapi.db
                    .query("api::building.building")
                    .findWithCount({ 
                        where: whereClause
                    });
                ctx.send({ success: true, data: location });
            } catch (error) {
                // Handle errors
                ctx.send({ success: false, message: "An error occurred." });
            }
        },
    })
);