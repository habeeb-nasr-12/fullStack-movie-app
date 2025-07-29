import { sequelize } from '../../config/database.js';
import { Sequelize } from 'sequelize';

// Import model definitions
import createMovieTVShow from './MovieTVShow.model.js';
import createUser from './User.model.js';

// Initialize models
const MovieTVShow = createMovieTVShow(sequelize, Sequelize.DataTypes);
const User = createUser(sequelize, Sequelize.DataTypes);

// Create database object
const db = {
  MovieTVShow,
  User,
  sequelize,
  Sequelize,
};



export default db; 