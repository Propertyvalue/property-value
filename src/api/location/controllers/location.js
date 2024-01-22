"use strict";

/**
 * location controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::location.location",
  ({ strapi }) => ({
    async find(ctx, next) {
      try {
        const queryParams = new URLSearchParams(ctx.request.url.split("?")[1]);
        const query = queryParams.get("q");
        const locations = await strapi.db
          .query("api::location.location")
          .findMany({ _q: query, limit: 50 });
        ctx.send({ success: true, data: locations });
      } catch (error) {
        // Handle errors
        ctx.send({ success: false, message: "An error occurred." });
      }
    },
    async findOne(ctx) {
      try {
        // Extract the id from the request parameters (assuming it's a route parameter)
        const { id } = ctx.params;
        // Ensure the id is treated as an integer
        const location = await strapi.db
          .query("api::location.location")
          .findOne({ where: { location_id: parseInt(id) } });
        ctx.send({ success: true, data: location });
      } catch (error) {
        // Handle errors
        ctx.send({ success: false, message: "An error occurred." });
      }
    },
  })
);
