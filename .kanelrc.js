const path = require('path');

/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'food-oil-company',
  },

  preDeleteOutputFolder: true,
  outputPath: './src/schemas',

  customTypeMap: {
    'pg_catalog.tsvector': 'string',
    'pg_catalog.bpchar': 'string',
  },
};
