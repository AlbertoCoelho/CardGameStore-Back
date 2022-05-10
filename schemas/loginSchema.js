import joi from 'joi';

const loginSchema = joi.object({
  email: joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required(),

  password: joi.string()
  .pattern(/^[a-zA-Z0-9]{3,30}$/)
  .required()
});

export default loginSchema;