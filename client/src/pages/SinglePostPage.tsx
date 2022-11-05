import { useParams } from 'react-router-dom';
import SinglePostView from '../components/single-post-view/SinglePostView';
import SinglePostVotes from '../components/single-post-votes/SinglePostVotes';
import VoteActions from '../components/vote-actions/VoteActions';
import { useGetSinglePost } from '../hooks/useApiPost';
import useStore from '../hooks/useStore';

const SinglePostPage = () => {
  const { user } = useStore();
  const { id } = useParams();
  const { data, refetch } = useGetSinglePost(id ?? '');
  if (!data) return <>todo</>; // todo

  const isOwnPost = user.id === data.userId;
  const alreadyVoted = [...data.agree, ...data.disagree].includes(user.id);

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center">
      <SinglePostView body={data.body} />
      <SinglePostVotes
        agreeNum={data.agree.length}
        disagreeNum={data.disagree.length}
      />
      {/* // todo fix change this back to isn't own post! */}
      {isOwnPost && (
        <VoteActions
          postId={id ?? ''}
          refetchPost={refetch}
          alreadyVoted={alreadyVoted}
        />
      )}
    </main>
  );
};
export default SinglePostPage;
