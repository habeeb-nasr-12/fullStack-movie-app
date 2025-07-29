import { sequelize } from '../../config/database.js';
import { Sequelize } from 'sequelize';
import createMovieTVShow from './MovieTVShow.model.js';
import createUser from './User.model.js';
const MovieTVShow = createMovieTVShow(sequelize, Sequelize.DataTypes);
const User = createUser(sequelize, Sequelize.DataTypes);

const db = {
  MovieTVShow,
  User,
  sequelize,
  Sequelize,
};



export default db; 