import RegisterBox from '../components/register-box/RegisterBox';
import useCheckIfLoggedIn from '../hooks/useCheckIfLoggedIn';

const RegisterPage = () => {
  useCheckIfLoggedIn();
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <RegisterBox />
    </main>
  );
};

export default RegisterPage;
