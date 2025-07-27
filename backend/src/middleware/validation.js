import { ZodError } from 'zod';

export const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      const data = source === 'body' ? req.body 
                 : source === 'query' ? req.query 
                 : source === 'params' ? req.params 
                 : req[source];
      
      const validatedData = schema.parse(data);
      
      if (source === 'body') {
        req.body = validatedData;
      } else if (source === 'query') {
        req.query = validatedData;
      } else if (source === 'params') {
        req.params = validatedData;
      } else {
        req[source] = validatedData;
      }
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));
        
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors
        });
      }
      
      next(error);
    }
  };
}; 