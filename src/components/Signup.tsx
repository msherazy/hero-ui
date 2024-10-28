import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input.tsx';

import api from '../services/api';
import { Button } from './ui/button.tsx';
import { Endpoints } from '@/utils/enpoints.ts';
import { SignupData } from '@/types/index.ts';
import logo from '@/assets/herogram.webp';

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupData>();

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => api.post(Endpoints.register, data, { withCredentials: true }),
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        alert('Signup successful!');
        reset();
      },
      onError: (error: any) => {
        alert(`Signup failed: ${error.response?.data?.message || error.message}`);
      },
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <img src={logo} alt="Herogram Logo" className="w-24 h-24" />
      <h1 className="text-2xl font-bold">Register with Herogram</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full max-w-md">
        <Input
          type="text"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
          className="p-2 border rounded w-64"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <Input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          })}
          className="p-2 border rounded w-64"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
              message:
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            },
          })}
          className="p-2 border rounded w-64"
        />
        {errors.password && <p className="text-red-500 w-64">{errors.password.message}</p>}

        <Button type="submit" className="bg-blue-500 text-white p-3 rounded">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
