const _ = require('lodash');
const path = require('path');

const root = __dirname;

const envConfig = {
  baseUrl: process.env.BASE_URL,
  bcryptRounds: process.env.BCRYPT_ROUNDS,
  db: process.env.DATABASE_URL || process.env.MONGODB_URI,
  port: process.env.PORT,
  secret: process.env.SECRET
};

const defaultConfig = {
  bcryptRounds: 10,
  db: 'mongodb://localhost/hexagon',
  port: 3005,
  secret: "letmein"
};

const fixedConfig = {
  root: root
};

const config = _.defaults({}, fixedConfig, envConfig, defaultConfig);

if (!config.port) {
  throw new Error('Port must be specified');
} else if (!config.db) {
  throw new Error('Database URL must be specified');
} else if (!config.bcryptRounds) {
  throw new Error('BCrypt rounds must be specified (at least 10 is recommended)');
}

config.baseUrl = config.baseUrl || `http://localhost:${config.port}`;

module.exports = config;

// Résumé du TB, Besoin de la Vaudoise, interets personnels: 
