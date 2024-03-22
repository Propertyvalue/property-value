'use strict';

/**
 * transaction controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::transaction.transaction',
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
                    .query("api::transaction.transaction")
                    .findWithCount({ where: { area_id: parseInt(id) } });
                ctx.send({ success: true, data: location });
            } catch (error) {
                // Handle errors
                ctx.send({ success: false, message: "An error occurred." });
            }
        },
        // async averageList(ctx) {
        //     try {
        //         const { master_development } = ctx.query;
        //         // Get the current date
        //         const currentDate = new Date();
        //         // Calculate the date 30 days ago
        //         const thirtyDaysAgo = new Date(currentDate);
        //         thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        //         // Query transactions for the last 30 days with specified conditions
        //         const averageList = await strapi.db
        //             .query("api::transaction.transaction")
        //             .findWithCount({
        //                 where: {
        //                     instance_date: {
        //                         $gte: thirtyDaysAgo.toISOString(),
        //                         $lte: currentDate.toISOString(),
        //                     },                            
        //                     MASTER_PROJECT_EN: master_development,
        //                     PROPERTY_USAGE_EN: 'Residential'
        //                 }
        //                 // _sort: 'INSTANCE_DATE:ASC', // Sort by INSTANCE_DATE in ascending order
        //                 _limit: 30, // Limit the result to the last 30 transactions
        //             });

        //             if (transactions.length === 0) {
        //                 ctx.send({ success: true, data: {} });
        //                 return;
        //             }

        // const leastPrice = transactions[0].ACTUAL_WORTH;
        // const maxPrice = transactions[transactions.length - 1].ACTUAL_WORTH;
        // const total = transactions.reduce((sum, transaction) => sum + transaction.ACTUAL_WORTH, 0);
        // const averagePrice = total / transactions.length;

        // ctx.send({ success: true, data: { leastPrice, maxPrice, averagePrice } });            } catch (error) {
        //         // Handle errors
        //         ctx.send({ success: false, message: "An error occurred." });
        //     }
        // },
        // async areaLevelTrans(ctx) {
        //     try {
        //         const { area_name_en } = ctx.query;
        //         // Get the current date
        //         const currentDate = new Date();
        //         // Calculate the date 30 days ago
        //         const thirtyDaysAgo = new Date(currentDate);
        //         thirtyDaysAgo.setDate(currentDate.getDate() - 30);

        //         // Query transactions for the last 30 days with specified conditions
        //         const areaLevelTrans = await strapi.db
        //             .query("api::transaction.transaction")
        //             .findWithCount({
        //                 where: {
        //                     AREA_NAME_EN: area_name_en,
        //                     REG_TYPE_EN:'Existing Properties',
        //                     PROPERTY_USAGE_EN: 'Residential'
        //                 }
        //                 // _sort: 'INSTANCE_DATE:ASC', // Sort by INSTANCE_DATE in ascending order
        //                 _limit: 15, // Limit the result to the last 15 transactions
        //             })
        //             if (transactions.length === 0) {
        //                 ctx.send({ success: true, data: {} });
        //                 return;
        //             }

        //         ctx.send({ success: true, data: areaLevelTrans });
        //         } catch (error) {
        //         // Handle errors
        //         ctx.send({ success: false, message: "An error occurred." });
        //     }
        // },
    })
);