'use strict';

const { MeiliSearch } = require('meilisearch');
// @ts-ignore
const Strapi = require('strapi');

(async () => {
  try {
    let offset = 550000;
    const batchSize = 50000; // You can adjust this value as needed
    const meilisearch = new MeiliSearch({
      host: 'http://localhost:7700', // MeiliSearch host URL
      apiKey: 'aSampleMasterKey' // Optional: MeiliSearch API key (if authentication is enabled)
    });

    while (true) {
      // Fetch data from Strapi API in batches
      const locationsBatch = await fetchStrapiData(offset, batchSize);

      // Break the loop if no more data is fetched
      if (locationsBatch.length === 0) {
        break;
      }

      // Index Strapi content into MeiliSearch
      await meilisearch.index('units').addDocuments(locationsBatch);
      
      // Increment the offset for the next batch
      offset += batchSize;
      console.log(`Batch with offset ${offset} is done`);
    }

    console.log('All batches indexed successfully!');
    // ctx.send({ success: true, message: "Data indexed successfully!" });
  } catch (error) {
    // Handle specific errors if needed
    // ctx.send({ success: false, message: "An error occurred!" });
    console.error('An error occurred:', error);
  }
})();

async function fetchStrapiData(offset, limit) {
  // Fetch data from Strapi API in batches
  const strapi = Strapi();
  await strapi.load();
  const locationsBatch = await strapi.db
    .query("api::units-dld.units-dld")
    .findMany({
      limit,
      offset
    });

  return locationsBatch;
}











'use strict';

/**
 * units-dld controller
 */
const { MeiliSearch } = require('meilisearch');

const { createCoreController } = require('@strapi/strapi').factories;
const cache = {}; // Global cache object to store query results

// async function getCachedOrFetch(query, page, pageSize) {
//   const cacheKey = `${query}_${page}_${pageSize}`;
//   if (cache[cacheKey]) {
//     // Return cached result if available
//     return cache[cacheKey];
//   } else {
//     // Fetch records from the database
//     const offset = (page - 1) * pageSize;
//     const units = await strapi.db
//       .query("api::units-dld.units-dld")
//       .findWithCount({ _q: query, limit: pageSize, offset: offset });
//     // Store fetched records in the cache
//     cache[cacheKey] = units;
//     return units;
//   }
// }

// module.exports = createCoreController('api::units-dld.units-dld',
//   ({ strapi }) => ({
//     async find(ctx, next) {
//       try {
//         let offset = 550000;
//         const batchSize = 50000; // You can adjust this value as needed
//         while (true) {
//           const meilisearch = new MeiliSearch({
//             host: 'http://localhost:7700', // MeiliSearch host URL
//             apiKey: 'aSampleMasterKey' // Optional: MeiliSearch API key (if authentication is enabled)
//           });
//           // await meilisearch.deleteIndex('units');
//           // await meilisearch.deleteIndex('my_index');
//           // await meilisearch.deleteIndex('units_index');
//           // Function to fetch data from Strapi API

//           async function fetchStrapiData() {
//             // while (batchSize < 100000) {
//             // Fetch data from Strapi API in batches
//             const locationsBatch = await strapi.db
//               .query("api::units-dld.units-dld")
//               .findMany({
//                 limit: batchSize,
//                 offset: offset
//               });

//             return locationsBatch;



//             // Concatenate the batch of locations to the result array
//             // allLocations = allLocations.concat(locationsBatch);

//             // Increment the offset for the next batch
//             // offset += batchSize;
//           }

//           // return allLocations;
//           // }
//           // Fetch data from Strapi API
//           const strapiData = await fetchStrapiData();

//             // Break the loop if no more data is fetched
//             if (strapiData.length === 0) {
//             break;
//             }
//           // Split the data into batches
//           // for (let i = 0; i < strapiData.length; i += batchSizeDoc) {
//           // const batch = strapiData.slice(i, i + batchSizeDoc);

//           // Add property ID to each document in the batch
//           // const indexedData = batch.map(data => {
//           //   // Assuming property_id is already present in each document, if not, modify accordingly
//           //   data.property_id = data.property_id.toString(); // Convert property_id to string if necessary
//           //   return data;
//           // });

//           // Index Strapi content into MeiliSearch
//           await meilisearch.index('units').addDocuments(strapiData);
//           offset += 50000
//           console.log(`Batch with offset ${offset} is done`);
//         }

//         // console.log(`Batch ${i / batchSizeDoc + 1} indexed successfully!`);
//         // }

//         console.log('All batches indexed successfully!');
//         ctx.send({ success: true, message: "Data indexed successfully!" });
//       } catch (error) {
//         // Handle specific errors if needed
//         ctx.send({ success: false, message: "An error occurred!" });
//       }
//     }
