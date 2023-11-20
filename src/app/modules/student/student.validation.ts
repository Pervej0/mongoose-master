import Joi from 'joi'

const studentNameSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.empty': 'First Name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.base': 'Please use a proper name',
    }),
  lastName: Joi.string()
    .required()
    .max(20)
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'string.empty': 'Last Name is required',
      'string.max': 'Last name cannot be more than 20 characters',
      'string.pattern.base': '{#label} is not valid',
    }),
  middleName: Joi.string(),
})

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father occupation is required',
  }),
  fatherContact: Joi.string().required().messages({
    'string.empty': 'Father Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother occupation is required',
  }),
  motherContact: Joi.string().required().messages({
    'string.empty': 'Mother Contact number is required',
  }),
})

const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local Guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local Guardian Contact No is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local Guardian Address is required',
  }),
})

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: studentNameSchema.required().messages({
    'any.required': 'Name is required to submit',
  }),
  studentProfile: Joi.string(),
  gender: Joi.string().valid('male', 'female', 'others').required(),
  dob: Joi.string().required().messages({
    'string.empty': 'Date of Birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email is not a valid email',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  emergencyContact: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAdd: Joi.string().required().messages({
    'string.empty': 'Present Address is required',
  }),
  permanentAdd: Joi.string().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian Details is required',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local Guardian details is required',
  }),
  isActive: Joi.string().valid('active', 'block').default('active'),
})

export default studentValidationSchema
