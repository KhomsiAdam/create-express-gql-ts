import Joi from 'joi';

export const {{lowercaseName}}Schema = Joi.object({
  firstname: Joi.string().alphanum().trim(),
  lastname: Joi.string().alphanum().trim(),
});
