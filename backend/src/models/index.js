import { Sequelize } from 'sequelize';
import config from '../../config/database.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    define: dbConfig.define,
    pool: dbConfig.pool,
  }
);

const db = {};

import createMovieTVShow from './MovieTVShow.model.js';
import createUser from './User.model.js';

const MovieTVShow = createMovieTVShow(sequelize, Sequelize.DataTypes);
const User = createUser(sequelize, Sequelize.DataTypes);

db.MovieTVShow = MovieTVShow;
db.User = User;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db; 