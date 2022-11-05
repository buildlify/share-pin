import { PlusIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import useStore from '../hooks/useStore';

const Header = () => {
  const { user } = useStore();
  return (
    <nav className="-ml-40 top-0 z-50 py-2 bg-white w-80 flex justify-around items-center rounded-b-lg fixed left-1/2">
      <Link to="/posts">
        <ChatBubbleBottomCenterIcon className="w-6 h-6" />
      </Link>
      <Link to="/create">
        <PlusIcon className="w-6 h-6" />
      </Link>
      <Link to="/profile" className="w-10 h-10 border-2 p-2 rounded-full">
        <img
          src={`https://avatars.dicebear.com/api/identicon/${user?.username}.svg`}
          alt="Username Profile Icon"
          className="object-cover"
        />
      </Link>
    </nav>
  );
};

export default Header;
