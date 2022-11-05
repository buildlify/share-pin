import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRegisterUserInfo } from '../../hooks/useApiAuth';
import useStore from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

type RegisterUserInputs = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

const schema = yup.object({
  username: yup.string().required().min(3),
  password: yup.string().required().min(8),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords Must Match'),
});

type Props = {
  tokenEmail: string;
};

const RegisterDataForm = ({ tokenEmail }: Props) => {
  const [email] = useState(tokenEmail);
  const { updateUser } = useStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserInputs>({
    resolver: yupResolver(schema),
  });

  const { mutate, data } = useRegisterUserInfo();
  const onSubmit: SubmitHandler<RegisterUserInputs> = (input) => {
    // todo check profanity here
    const userData = { email, username: input.username, password: input.password };
    mutate(userData);
  };

  useEffect(() => {
    if (data) {
      updateUser(data.data.user);
      navigate('/posts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="card bg-white p-8 w-full max-w-md">
      <h1 className="text-xl font-bold text-dark">Your Info</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          value={email}
          readOnly
          className="input input-bordered input-md w-full bg-transparent mt-6"
        />
        <input
          placeholder="Username"
          {...register('username')}
          className="input input-bordered input-md w-full bg-transparent mt-2"
        />
        {errors.username && (
          <span className="text-red-600 block mt-2">
            Please enter a username that is more then 2 characters
          </span>
        )}
        <input
          placeholder="Password"
          type="password"
          {...register('password')}
          className="input input-bordered input-md w-full bg-transparent mt-2"
        />
        {errors.password && (
          <span className="text-red-600 block mt-2">
            Please enter a password that is more then 7 characters
          </span>
        )}
        <input
          placeholder="Password Confirmation"
          type="password"
          {...register('passwordConfirmation')}
          className="input input-bordered input-md w-full bg-transparent mt-2"
        />
        {errors.passwordConfirmation && (
          <span className="text-red-600 block mt-2">
            {errors.passwordConfirmation.message}
          </span>
        )}
        <button type="submit" className="btn btn-primary mt-6">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterDataForm;
