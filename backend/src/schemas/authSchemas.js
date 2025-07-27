import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .email('Must be a valid email address')
    .min(1, 'Email is required'),
  
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be less than 255 characters')
});

export const signinSchema = z.object({
  email: z.string()
    .email('Must be a valid email address')
    .min(1, 'Email is required'),
  
  password: z.string()
    .min(1, 'Password is required')
}); 