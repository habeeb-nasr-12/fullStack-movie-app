import db from '../models/index.js';
import { Op } from 'sequelize';

const { MovieTVShow } = db;

class MovieTVShowController {
  async getAll(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        type,
        status,
        rating,
        sort_by = 'created_at',
        sort_order = 'DESC'
      } = req.query;
      const offset = (page - 1) * limit;
      const whereClause = {};

      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { director: { [Op.like]: `%${search}%` } },
          { genre: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ];
      }

      if (type) {
        whereClause.type = type;
      }

      if (status) {
        whereClause.status = status;
      }
      if (rating && rating !== '') {

        if (rating === '0' || rating === 'unrated') {
          whereClause.rating = null;
        } else if (rating.includes('-')) {

          const [minRating, maxRating] = rating.split('-').map(Number);

          if (!isNaN(minRating) && !isNaN(maxRating)) {
            whereClause.rating = {
              [Op.gte]: minRating,
              [Op.lte]: maxRating
            };
          }
        } else {
          const ratingValue = Number(rating);
          if (!isNaN(ratingValue)) {
            whereClause.rating = ratingValue;
          }
        }
      }

      const result = await MovieTVShow.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sort_by, sort_order.toUpperCase()]]
      });

      const totalPages = Math.ceil(result.count / limit);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      res.json({
        success: true,
        movies: result.rows,
        pagination: {
          current_page: parseInt(page),
          total_pages: totalPages,
          total_items: result.count,
          items_per_page: parseInt(limit),
          has_next_page: hasNextPage,
          has_prev_page: hasPrevPage
        }
      });
    } catch (error) {
      console.error('Error in getAll:', error);
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const movieTVShow = await MovieTVShow.findByPk(id);

      if (!movieTVShow) {
        return res.status(404).json({
          success: false,
          message: 'Movie/TV show not found'
        });
      }

      res.json({
        success: true,
        data: movieTVShow
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const movieTVShowData = req.body;
      const movieTVShow = await MovieTVShow.create(movieTVShowData);
      res.status(201).json({
        success: true,
        message: 'Movie/TV show created successfully',
        data: movieTVShow
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const movieTVShow = await MovieTVShow.findByPk(id);
      if (!movieTVShow) {
        return res.status(404).json({
          success: false,
          message: 'Movie/TV show not found'
        });
      }

      await movieTVShow.update(updateData);

      res.json({
        success: true,
        message: 'Movie/TV show updated successfully',
        data: movieTVShow
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const movieTVShow = await MovieTVShow.findByPk(id);

      if (!movieTVShow) {
        return res.status(404).json({
          success: false,
          message: 'Movie/TV show not found'
        });
      }

      await movieTVShow.destroy();

      res.json({
        success: true,
        message: 'Movie/TV show deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res, next) {
    try {
      const stats = await Promise.all([
        MovieTVShow.count(),
        MovieTVShow.count({ where: { type: 'Movie' } }),
        MovieTVShow.count({ where: { type: 'TV Show' } }),
        MovieTVShow.count({ where: { status: 'Watched' } }),
        MovieTVShow.count({ where: { status: 'Want to Watch' } }),
        MovieTVShow.count({ where: { status: 'Currently Watching' } })
      ]);

      const [totalCount, movieCount, tvShowCount, watchedCount, wantToWatchCount, currentlyWatchingCount] = stats;

      res.json({
        success: true,
        data: {
          total: totalCount,
          by_type: {
            movies: movieCount,
            tv_shows: tvShowCount
          },
          by_status: {
            watched: watchedCount,
            want_to_watch: wantToWatchCount,
            currently_watching: currentlyWatchingCount
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MovieTVShowController(); 