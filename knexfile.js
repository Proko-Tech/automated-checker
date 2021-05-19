require('dotenv').config();

const sqlConnection = {
  host: process.env.HOST,
  port: process.env.DATAPORT,
  user: process.env.DATAUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

module.exports = {
  development: {
    client: 'mysql',
    version: '5.7',
    connection: sqlConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations'
    },
    seeds:{
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'mysql',
    version: '5.7',
    connection: sqlConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations'
    },
    seeds:{
      directory: './database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  production: {
    client: 'mysql',
    version: '5.7',
    connection: sqlConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations'
    },
    seeds:{
      directory: './database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  }

};
