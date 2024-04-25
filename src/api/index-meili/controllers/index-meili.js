'use strict';

/**
 * index-meili controller
 */

const { MeiliSearch } = require('meilisearch');

const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::index-meili.index-meili');

async function fetchStrapiData(batchSize, offset) {
    const locationsBatch = await strapi.db
        .query("api::transaction.transaction")
        .findMany({
            limit: batchSize,
            offset: offset
        });
    return locationsBatch;
}

module.exports = createCoreController('api::index-meili.index-meili',
    ({ strapi }) => ({
        async indexUnits(ctx, next) {
            try {
                let offset = 0;
                const batchSize = 10000; // You can adjust this value as needed
                const meilisearch = new MeiliSearch({
                    host: process.env.MEILISEARCH_URL, // MeiliSearch host URL
                    apiKey: process.env.MEILISEARCH_MASTER_KEY // Optional: MeiliSearch API key (if authentication is enabled)
                });
                while (true) {
                    async function fetchStrapiData() {
                        // while (batchSize < 10000) {
                        // Fetch data from Strapi API in batches
                        const locationsBatch = await strapi.db
                            .query("api::units-dld.units-dld")
                            .findMany({
                                limit: batchSize,
                                offset: offset
                            });
                        return locationsBatch;
                    }
                    const strapiData = await fetchStrapiData();
                    if (strapiData.length === 0) {
                        break;
                    }
                    await meilisearch.index('units').addDocuments(strapiData,
                        {
                            primaryKey: "id"
                        });
                    offset += 10000
                    console.log(`Batch with offset ${offset} is done`);
                }
                console.log('All batches indexed successfully!');
                ctx.send({ success: true, message: "Data indexed successfully!" });
            } catch (error) {
                // Handle specific errors if needed
                ctx.send({ success: false, message: "An error occurred!" });
            }
        },
        async indexTransactions(ctx, next) {
            try {
                let offset = 0;
                const batchSize = 10000; // You can adjust this value as needed
                const meilisearch = new MeiliSearch({
                    host: process.env.MEILISEARCH_URL, // MeiliSearch host URL
                    apiKey: process.env.MEILISEARCH_MASTER_KEY
                });
                // await meilisearch.deleteIndex('transactions');
                while (true) {
                    const strapiData = await fetchStrapiData(batchSize, offset);
                    // Break the loop if no more data is fetched
                    if (strapiData.length === 0) {
                        break;
                    }
                    try {
                        // Index Strapi content into MeiliSearch
                        await meilisearch.index('transactions').addDocuments(strapiData,
                            {
                                primaryKey: "id"
                            });
                    } catch (error) {
                        console.error(`Failed to add documents to MeiliSearch index: ${error}`);
                        throw error;
                    }
                    offset += 10000
                    console.log(`Batch with offset ${offset} is done`);
                }
                console.log('All batches of transactions are indexed successfully!');
                ctx.send({ success: true, message: 'All batches of transactions are indexed successfully!' });
            } catch (error) {
                // Handle specific errors if needed
                ctx.send({ success: false, message: `An error occurred: ${error}` });
            }
        },
    }
    ))
