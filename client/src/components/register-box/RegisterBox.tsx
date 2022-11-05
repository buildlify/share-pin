import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useVerifyEmail } from '../../hooks/useApiAuth';
import { useEffect, useState } from 'react';

type Inputs = {
  email: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
});

const RegisterBox = () => {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading, data } = useVerifyEmail();
  const onSubmit: SubmitHandler<Inputs> = (input) => {
    mutate(input.email);
  };

  useEffect(() => {
    if (data) {
      // data means email was sent
      setStep(2);
    }
  }, [data]);

  return (
    <div className="card bg-white p-8 w-full max-w-md">
      {step === 1 && (
        <>
          <h1 className="text-xl font-bold text-dark">Verify Email</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="johndoe@gmail.com"
              {...register('email')}
              className="input input-bordered input-md w-full bg-transparent mt-6"
            />
            {errors.email && (
              <span className="text-red-600 block mt-2">
                Please enter a valid email
              </span>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary mt-6"
            >
              Next
            </button>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <h1 className="text-xl font-bold text-dark">Email sent!</h1>
          <p>Please check your inbox to verify your email address.</p>
        </>
      )}
    </div>
  );
};

export default RegisterBox;
