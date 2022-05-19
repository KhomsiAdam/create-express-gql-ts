import Joi from 'joi';

export const adminSchema = Joi.object({
  firstname: Joi.string().alphanum().trim(),
  lastname: Joi.string().alphanum().trim(),
});
