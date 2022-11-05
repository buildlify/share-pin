import { useState } from 'react';
import { Link } from 'react-router-dom';
import UsernameModal from '../components/username-modal/UsernameModal';
import useStore from '../hooks/useStore';

const ProfilePage = () => {
  const { user } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <div className="max-w-5xl w-full mx-auto">
        <div className="bg-white rounded-lg p-4 w-full flex justify-between items-center">
          <div className="flex items-center">
            <h2>{user?.username}</h2>
            <img
              src={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
              alt="Username Profile Icon"
              className="w-6 h-6 object-cover ml-2"
            />
          </div>

          <button className="btn" onClick={() => setIsOpen(true)}>
            Change
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 w-full flex justify-between items-center mt-8">
          <div className="flex items-center">
            <h2>logged in as {user?.email}</h2>
          </div>

          <Link to="/logout" className="btn">
            Logout
          </Link>
        </div>
      </div>
      <UsernameModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  );
};

export default ProfilePage;
