const { Pool } = require('pg');

const dbConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production') {
  dbConfig.ssl = { rejectUnauthorized: false };
}

const client = new Pool(dbConfig);

client.connect();

module.exports = client;
