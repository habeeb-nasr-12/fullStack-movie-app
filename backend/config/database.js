import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const developmentConfig = {
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || null, 
  database: process.env.DB_NAME || 'movies_db',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: console.log,
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    ssl: false,
    connectTimeout: 60000,
    acquireTimeout: 60000,
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const productionConfig = {
  host: process.env.MYSQLHOST || 'localhost',
  username: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'movies_db',
  port: process.env.MYSQLPORT || 3306,
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const config = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    define: config.define,
    dialectOptions: config.dialectOptions,
    pool: config.pool,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    return false;
  }
};

const initializeDatabase = async () => {
  try {   
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Failed to establish database connection');
    }

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      console.log('✅ Database synchronized successfully.');
    }

    return sequelize;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
  };

export default {
  development: developmentConfig,
  production: productionConfig,
};

export { sequelize, testConnection, initializeDatabase }; 