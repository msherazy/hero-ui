import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
});

const signInSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const ValidationRules = {
  SignUp: {
    schema: signUpSchema,
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
  },
  SignIn: {
    schema: signInSchema,
    initialValues: {
      email: '',
      password: '',
    },
  },
};

export type SignInSchema = Yup.InferType<typeof signInSchema>;
export type SignUpSchema = Yup.InferType<typeof signUpSchema>;
