"use strict";

/**
 * unit controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::unit.unit", ({ strapi }) => ({
  async findOne(ctx) {
    try {
      // Extract the id from the request parameters (assuming it's a route parameter)
      const { id } = ctx.params;
      // Ensure the id is treated as an integer
      const unit = await strapi.db
        .query("api::unit.unit")
        .findWithCount({ where: { location_id: parseInt(id) } });
      ctx.send({ success: true, data: unit });
    } catch (error) {
      // Handle errors
      ctx.send({ success: false, message: "An error occurred." });
    }
  },
}));
