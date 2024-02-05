# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

# API.propertyvalue.ae Documentation

Welcome to the documentation for API.propertyvalue.ae. This API provides information about property locations and units. Currently, two main routes are available: `/locations` and `/units`.

## Authorization

To access the API, you need to include an authorization header with a bearer token. Use the following token:

```plaintext
Bearer api-token 
```


## Locations
### `Get all locations`

To retrieve information about all locations, send a GET request to /locations.

Example:
```plaintext
curl -H "Authorization: Bearer api-token" https://api.propertyvalue.ae/locations
```

### `Get a specific location by ID`
To retrieve information about a specific location, replace :location_id with the desired location ID and send a GET request to /location/:location_id.

Example:
```plaintext
curl -H "Authorization: Bearer api-token" https://api.propertyvalue.ae/location/:location_id
```

### `Search or filter locations`

To search or filter locations, add the query parameter q with the filter criteria to the /locations endpoint.

```plaintext
curl -H "Authorization: Bearer api-token" https://api.propertyvalue.ae/locations?q="filter_criteria"
```

## Units

### `Get all units`

To retrieve information about all units, send a GET request to /units.

Example:
```plaintext
curl -H "Authorization: Bearer api-token" https://api.propertyvalue.ae/units
```

### `Get units by location ID`
To retrieve information about units based on a specific location ID, replace :location_id with the desired location ID and send a GET request to /units/:location_id.

```plaintext
curl -H "Authorization: Bearer api-token" https://api.propertyvalue.ae/units/:location_id
```

## `Conclusion`
This documentation provides basic information on how to interact with the API.propertyvalue.ae API. Ensure that you include the correct authorization token in the header for successful authentication. For more details or specific use cases, refer to the API documentation.