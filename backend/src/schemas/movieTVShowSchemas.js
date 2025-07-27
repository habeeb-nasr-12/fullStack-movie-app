import { z } from 'zod';

export const createMovieTVShowSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),

  type: z.enum(['Movie', 'TV Show'], {
    errorMap: () => ({ message: 'Type must be either "Movie" or "TV Show"' })
  }),

  director: z.string()
    .min(1, 'Director is required')
    .max(255, 'Director name must be less than 255 characters'),

  budget: z.number()
    .positive('Budget must be a positive number')
    .optional(),

  location: z.string()
    .max(255, 'Location must be less than 255 characters')
    .transform(val => val === '' ? undefined : val)
    .optional(),

  duration: z.number()
    .int('Duration must be an integer')
    .positive('Duration must be positive')
    .optional(),

  year: z.number()
    .int('Year must be an integer')
    .min(1880, 'Year must be after 1880')
    .max(new Date().getFullYear() + 10, 'Year cannot be more than 10 years in the future'),

  genre: z.string()
    .max(100, 'Genre must be less than 100 characters')
    .transform(val => val === '' ? undefined : val)
    .optional(),

  rating: z.number()
    .min(0, 'Rating should be between 0 and 10')
    .max(10, 'Rating must be between 0 and 10')
    .optional(),

  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .transform(val => val === '' ? undefined : val)
    .optional(),

  poster_url: z.string()
    .refine((val) => !val || val.trim() === '' || /^https?:\/\/.+/.test(val), {
      message: 'Must be a valid URL'
    })
    .transform(val => val === '' ? undefined : val)
    .optional(),

  status: z.enum(['Watched', 'Want to Watch', 'Currently Watching'], {
    errorMap: () => ({ message: 'Status must be one of: Watched, Want to Watch, Currently Watching' })
  }).default('Want to Watch')
});

export const updateMovieTVShowSchema = createMovieTVShowSchema.partial();

export const paginationSchema = z.object({
  page: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Page must be a positive number')
    .default('1'),

  limit: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100')
    .default('10'),

  search: z.string()
    .optional(),

  type: z.enum(['Movie', 'TV Show'])
    .optional(),

  status: z.enum(['Watched', 'Want to Watch', 'Currently Watching'])
    .optional(),

  rating: z.string()
    .optional(),

  sort_by: z.enum(['title', 'year', 'rating', 'created_at'])
    .default('created_at'),

  sort_order: z.enum(['ASC', 'DESC'])
    .default('DESC')
});

export const idParamSchema = z.object({
  id: z.string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, 'ID must be a positive number')
}); 