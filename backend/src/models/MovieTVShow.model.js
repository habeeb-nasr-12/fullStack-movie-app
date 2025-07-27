export default (sequelize, DataTypes) => {
  const MovieTVShow = sequelize.define('MovieTVShow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    type: {
      type: DataTypes.ENUM('Movie', 'TV Show'),
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    budget: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 255],
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1880,
        max: new Date().getFullYear() + 10,
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 100],
      },
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
      validate: {
        min: 0,
        max: 10,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidUrl(value) {
          if (value && value.trim() !== '') {
            const urlPattern = /^https?:\/\/.+/;
            if (!urlPattern.test(value)) {
              throw new Error('Must be a valid URL');
            }
          }
        }
      },
    },
    status: {
      type: DataTypes.ENUM('Watched', 'Want to Watch', 'Currently Watching'),
      allowNull: false,
      defaultValue: 'Want to Watch',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'movie_tv_shows',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return MovieTVShow;
}; 