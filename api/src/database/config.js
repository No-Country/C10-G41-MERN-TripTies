'use strict'
require('dotenv').config()
module.exports = {
  development: {
    use_env_variable: 'DATABASE_URI_DEV',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    dialect: 'mongodb',
    dialectOptions: {
      ssl: true,
      retryWrites: true,
      w: 'majority'
    },
    poolSize: 10
  },
  test: {
    use_env_variable: 'DATABASE_URI_TEST',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    dialect: 'mongodb',
    dialectOptions: {
      ssl: true,
      retryWrites: true,
      w: 'majority'
    },
    poolSize: 10
  },
  production: {
    use_env_variable: 'DATABASE_URI_PROD',
    dialect: 'mongodb',
    dialectOptions: {
      ssl: true,
      retryWrites: true,
      w: 'majority'
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    poolSize: 10
  }
}

