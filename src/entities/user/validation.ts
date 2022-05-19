import Joi from 'joi';

export const userSchema = Joi.object({
  firstname: Joi.string().alphanum().trim(),
  lastname: Joi.string().alphanum().trim(),
});
