import express from 'express';
import movieTVShowController from '../controllers/movieTVShowController.controller.js';
import { validateRequest } from '../middleware/validation.js';
import {
  createMovieTVShowSchema,
  updateMovieTVShowSchema,
  paginationSchema,
  idParamSchema
} from '../schemas/movieTVShowSchemas.js';

const router = express.Router();

router.get('/',
  validateRequest(paginationSchema, 'query'),
  movieTVShowController.getAll
);

router.get('/stats',
  movieTVShowController.getStats
);

router.get('/:id',
  validateRequest(idParamSchema, 'params'),
  movieTVShowController.getById
);

router.post('/',
  validateRequest(createMovieTVShowSchema, 'body'),
  movieTVShowController.create
);

router.put('/:id',
  validateRequest(idParamSchema, 'params'),
  validateRequest(updateMovieTVShowSchema, 'body'),
  movieTVShowController.update
);

router.delete('/:id',
  validateRequest(idParamSchema, 'params'),
  movieTVShowController.delete
);

export default router; 