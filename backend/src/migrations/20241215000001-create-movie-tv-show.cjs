'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movie_tv_shows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('Movie', 'TV Show'),
        allowNull: false
      },
      director: {
        type: Sequelize.STRING,
        allowNull: false
      },
      budget: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      poster_url: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Watched', 'Want to Watch', 'Currently Watching'),
        allowNull: false,
        defaultValue: 'Want to Watch'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });


    await queryInterface.addIndex('movie_tv_shows', ['type']);
    await queryInterface.addIndex('movie_tv_shows', ['year']);
    await queryInterface.addIndex('movie_tv_shows', ['status']);
    await queryInterface.addIndex('movie_tv_shows', ['created_at']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('movie_tv_shows');
  }
}; 