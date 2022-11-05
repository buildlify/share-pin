import { useParams } from 'react-router-dom';
import RegisterDataForm from '../components/register-data-form/RegisterDataForm';
import { useValidateRegisterToken } from '../hooks/useApiAuth';
import useCheckIfLoggedIn from '../hooks/useCheckIfLoggedIn';

const RegisterDataPage = () => {
  useCheckIfLoggedIn();
  const { token } = useParams();
  const { data: email, error } = useValidateRegisterToken(token as string);

  if (error || !email) return <>error invalid link</>;
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <RegisterDataForm tokenEmail={email} />
    </main>
  );
};

export default RegisterDataPage;
