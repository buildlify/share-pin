import { Link } from 'react-router-dom';
import { IPost } from '../../types';
import { getVotePercent } from '../../utils/get-vote-percent';

type Props = {
  post: IPost;
};

const Post = ({ post }: Props) => {
  const { agreePercent, disagreePercent } = getVotePercent(
    post.agree.length,
    post.disagree.length,
  );

  const totalVotes = post.agree.length + post.disagree.length;

  return (
    <Link
      to={`/post/${post.id}`}
      className="card bg-white p-4 w-full max-w-xs text-black text-center relative mx-2 my-4 cursor-pointer transition-transform hover:scale-105"
    >
      <h3 className="text-xl font-bold leading-6 py-2">{post.title}</h3>
      <p className="pt-6 pb-3 text-sm">
        {totalVotes} Total Vote{totalVotes === 1 ? '' : 's'}
      </p>
      <div className="absolute bottom-0 left-0 w-full flex">
        <div className={`h-6 bg-lightGreen`} style={{ flex: agreePercent }}></div>
        <div className={`h-6 bg-lightRed`} style={{ flex: disagreePercent }}></div>
      </div>
    </Link>
  );
};

export default Post;
