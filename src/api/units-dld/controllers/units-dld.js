'use strict'

/**
 * units-dld controller
 */

const { MeiliSearch } = require('meilisearch')
const { createCoreController } = require('@strapi/strapi').factories

module.exports = createCoreController(
  'api::units-dld.units-dld',
  ({ strapi }) => ({
    async find (ctx) {
      try {
        const { query } = ctx.request.query
        // Initialize MeiliSearch client
        const meilisearch = new MeiliSearch({
          host: process.env.MEILISEARCH_URL, // MeiliSearch host URL
          apiKey: 'aSampleMasterKey' // Optional: MeiliSearch API key (if authentication is enabled)
        })
        // const indexSettings = await meilisearch.index('units').getSettings();
        //     // Add 'property_type_en' to the list of filterable attributes
        // indexSettings.filterableAttributes.push('property_type_en');
        // Search in MeiliSearch only in the 'property_id' attribute
        // @ts-ignore
        const searchResult = await meilisearch.index('units').search(query, {
          attributesToSearchOn: [
            'area_name_en',
            'project_name_en',
            'master_project_en',
            'unit_number'
          ],
          // filter: 'property_type_en = Unit',
          limit: 50
        })
        ctx.send({ success: true, data: searchResult.hits })
      } catch (error) {
        ctx.send({ success: false, message: `${error}.` })
      }
    },
    async findOne (ctx) {
      try {
        // Extract the id from the request parameters (assuming it's a route parameter)
        const { id } = ctx.params
        // Ensure the id is treated as an integer
        const location = await strapi.db
          .query('api::units-dld.units-dld')
          .findWithCount({ where: { area_id: parseInt(id) }, limit: 100 })
        ctx.send({ success: true, data: location })
      } catch (error) {
        // Handle errors
        ctx.send({ success: false, message: 'An error occurred.' })
      }
    }
  })
)
