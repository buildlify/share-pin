import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginUser } from '../../hooks/useApiAuth';
import { useEffect } from 'react';
import useStore from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

const LoginBox = () => {
  const { updateUser } = useStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading, data } = useLoginUser();
  const onSubmit: SubmitHandler<Inputs> = (input) => {
    mutate(input);
  };

  useEffect(() => {
    if (data) {
      // data means login was successful
      updateUser(data.data.user);
      navigate('/posts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="card bg-white p-8 w-full max-w-md">
      <h1 className="text-xl font-bold text-dark">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register('email')}
          className="input input-bordered input-md w-full bg-transparent mt-6"
        />
        {errors.email && (
          <span className="text-red-600 block mt-2">Please enter a valid email</span>
        )}
        <input
          placeholder="Password"
          type="password"
          {...register('password')}
          className="input input-bordered input-md w-full bg-transparent mt-6"
        />
        {errors.email && (
          <span className="text-red-600 block mt-2">Please enter a password</span>
        )}
        <button type="submit" disabled={isLoading} className="btn btn-primary mt-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginBox;
