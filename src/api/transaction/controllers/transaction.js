'use strict';

/**
 * transaction controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { MeiliSearch } = require('meilisearch');

// Function to parse date string "DD-MM-YYYY" into JavaScript Date object
function parseDate(dateString) {
    const parts = dateString.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}
const formatValue = value => {
    // Convert the value to a number and round it to remove decimal numbers
    const roundedValue = Math.round(value);
    // Use toLocaleString to add commas as thousand separators
    return roundedValue.toLocaleString('en-US') + ' AED';
};

module.exports = createCoreController('api::transaction.transaction',
    ({ strapi }) => ({
        async findOne(ctx) {
            try {
                // Extract the id from the request parameters (assuming it's a route parameter)
                const { id } = ctx.params;
                // Ensure the id is treated as an integer
                const location = await strapi.db
                    .query("api::transaction.transaction")
                    .findWithCount({ where: { area_id: parseInt(id) }, limit: 100 // Limit the results to the first 100
                });
                ctx.send({ success: true, data: location });
            } catch (error) {
                // Handle errors
                ctx.send({ success: false, message: "An error occurred." });
            }
        },
        async marketInsights(ctx) {
            try {
                const { query } = ctx.request.query;
                // Initialize MeiliSearch client
                const meilisearch = new MeiliSearch({
                    host: process.env.MEILISEARCH_URL, // MeiliSearch host URL
                    apiKey: 'aSampleMasterKey' // Optional: MeiliSearch API key (if authentication is enabled)
                });

                const index = await meilisearch.index('transactions');
                let indexSettings = await index.getSettings();
                if (!indexSettings.filterableAttributes.includes('reg_type_en')) {
                    indexSettings.filterableAttributes.push('reg_type_en');
                    await index.updateSettings(indexSettings);
                }
                // Add 'property_usage_en' as a filterable attribute if not already present
                if (!indexSettings.filterableAttributes.includes('property_usage_en')) {
                    indexSettings.filterableAttributes.push('property_usage_en');
                    await index.updateSettings(indexSettings);
                }
                if (!indexSettings.sortableAttributes.includes('instance_date')) {
                    indexSettings.sortableAttributes.push('instance_date');
                    await index.updateSettings(indexSettings);
                }
                // @ts-ignore
                const searchResult = await index.search(query, {
                    attributesToSearchOn: ['master_project_en'],
                    filter: 'property_usage_en = "Residential" AND reg_type_en = "Existing Properties"', // Add filter based on property_usage_en and reg_type_en
                    limit: 30
                });
                const queryedSearch = searchResult.hits.sort((a, b) => {
                    const dateA = parseDate(a.instance_date);
                    const dateB = parseDate(b.instance_date);
                    // @ts-ignore
                    return dateB - dateA;
                })
                let actualWorthList = queryedSearch.map(transaction => transaction.actual_worth);
                // Calculate highest, average, and lowest values
                const highest = Math.max(...actualWorthList);
                const lowest = Math.min(...actualWorthList);
                // Calculate the sum of actualWorthList
                const sum = actualWorthList.reduce((acc, value) => acc + parseFloat(value), 0);
                const average = sum / actualWorthList.length;

                const highestFormatted = formatValue(highest);
                const lowestFormatted = formatValue(lowest);
                const averageFormatted = formatValue(average);
                const resultObject = {
                    highest: highestFormatted,
                    average: averageFormatted,
                    lowest: lowestFormatted,
                    transactions: queryedSearch
                };
                // Send the response with the result object
                ctx.send({ success: true, data: resultObject });

            } catch (error) {
                ctx.send({ success: false, message: `${error}.` });
            }
        },
        async recentTransactions(ctx) {
            try {
                const { query, type } = ctx.request.query;
                // Initialize MeiliSearch client
                const meilisearch = new MeiliSearch({
                    host: process.env.MEILISEARCH_URL, // MeiliSearch host URL
                    apiKey: 'aSampleMasterKey' // Optional: MeiliSearch API key (if authentication is enabled)
                });

                const index = await meilisearch.index('transactions');
                let indexSettings = await index.getSettings();
                console.log(indexSettings)
                const attributesToUpdate = ['reg_type_en', 'property_type_en', 'property_usage_en'];
                for (const attribute of attributesToUpdate) {
                    if (!indexSettings.filterableAttributes.includes(attribute)) {
                        indexSettings.filterableAttributes.push(attribute);
                    }
                }
                if (!indexSettings.sortableAttributes.includes('instance_date')) {
                    indexSettings.sortableAttributes.push('instance_date');
                }
                // Update index settings
                await index.updateSettings(indexSettings);
                console.log(indexSettings)

                // @ts-ignore
                const searchResult = await index.search(query, {
                    attributesToSearchOn: ['master_project_en'],
                    filter: `property_type_en = ${type} AND property_usage_en = "Residential" AND reg_type_en = "Existing Properties"`, // Add filter based on property_usage_en and reg_type_en
                    limit: 15
                });
                const queryedSearch = searchResult.hits.sort((a, b) => {
                    const dateA = parseDate(a.instance_date);
                    const dateB = parseDate(b.instance_date);
                    // @ts-ignore
                    return dateB - dateA;
                })
                // Send the response with the result object
                ctx.send({ success: true, data: queryedSearch });

            } catch (error) {
                ctx.send({ success: false, message: `${error}.` });
            }
        },
    })
);