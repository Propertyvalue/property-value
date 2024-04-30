'use strict';

const NodeCache = require('node-cache');
const fetch = require('node-fetch');
const cache = new NodeCache();
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::toolkit.toolkit',
    ({ strapi }) => ({
        async googleapis(ctx) {
            try {
                const { emirate, placename } = ctx.request.query;
                const cacheKey = `${emirate}_${placename}`;

                // Check if the data is already in cache
                let cachedData = cache.get(cacheKey);
                if (cachedData) {
                    return ctx.send({ success: true, data: cachedData });
                }

                const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${emirate},${placename}&key=${process.env.GOOGLE_API_TOKEN}`);
                const geoData = await geoResponse.json();

                if (geoData.status === 'OK') {
                    const location = geoData.results[0].geometry.location;
                    const { lat, lng } = location;

                    // Fetching nearby transit stations
                    const transitResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=transit_station&key=${process.env.GOOGLE_API_TOKEN}`);
                    const transitData = await transitResponse.json();

                    // Fetching nearby schools
                    const schoolsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=school&key=${process.env.GOOGLE_API_TOKEN}`);
                    const schoolsData = await schoolsResponse.json();

                    if (transitData.status === 'OK' || schoolsData.status === 'OK') {
                        // Extracting relevant information from the responses
                        const nearbyTransit = transitData?.results.map(place => ({
                            name: place.name,
                            vicinity: place.vicinity,
                            type: place.types,
                            geometry: place.geometry?.location,
                        }));

                        const nearbySchools = schoolsData?.results.map(place => ({
                            name: place.name,
                            vicinity: place.vicinity,
                            type: place.types,
                            geometry: place.geometry?.location,
                        }));

                        const responseData = {
                            address: geoData.results[0]?.formatted_address,
                            lat: location.lat,
                            lng: location.lng,
                            nearbyTransit: nearbyTransit,
                            nearbySchools: nearbySchools
                        };

                        // Cache the data for future use
                        cache.set(cacheKey, responseData);

                        ctx.send({
                            success: true,
                            data: responseData
                        });
                    } else {
                        ctx.send({ success: false, message: "An error occurred while fetching nearby places" });
                    }
                } else {
                    ctx.send({ success: false, message: "An error occurred while fetching location" });
                }
            } catch (error) {
                ctx.send({ success: false, message: "An error occurred." });
            }
        },
    }));
