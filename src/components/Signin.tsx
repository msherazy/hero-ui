import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { useUserContext } from '@/hooks';
import { type SignInSchema, ValidationRules } from '@/schemas';

import api from '../services/api';
import { Button } from './ui/button';
import { Endpoints } from '@/utils/enpoints.ts';
import { SigninData } from '@/types/index.ts';
import logo from '@/assets/herogram.webp';

const Signin = () => {
  const { register, handleSubmit, reset } = useForm<SignInSchema>({
    resolver: yupResolver(ValidationRules.SignIn.schema),
    defaultValues: ValidationRules.SignIn.initialValues,
  });

  const { updateUserData } = useUserContext();

  const signinMutation = useMutation({
    mutationFn: (data: SigninData) => api.post(Endpoints.login, data, { withCredentials: true }),
  });

  const onSubmit: SubmitHandler<SigninData> = (data) => {
    signinMutation.mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem('token', data.data.token);
        const { name, email } = data.data.user;
        updateUserData({ name, email });
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
      <h1 className="text-2xl font-bold">Signin</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <Input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="p-2 border rounded w-64"
        />
        <Input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="p-2 border rounded w-64"
        />
        <Button type="submit" className="bg-green-500 text-white p-2 rounded">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Signin;
