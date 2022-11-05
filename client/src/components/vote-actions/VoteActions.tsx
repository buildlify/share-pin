import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUpdateVotes } from '../../hooks/useApiPost';
import useStore from '../../hooks/useStore';
import { IPost } from '../../types';

type Props = {
  postId: string;
  refetchPost: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<IPost | undefined, unknown>>;
  alreadyVoted: boolean;
};

const VoteActions = ({ postId, refetchPost, alreadyVoted }: Props) => {
  const { user } = useStore();
  const { data, mutate } = useUpdateVotes();

  const handleVote = (agree: boolean) => {
    const data = {
      userId: user.id,
      postId,
      agree,
    };
    mutate(data);
  };

  useEffect(() => {
    if (data) {
      // data means vote was successful
      toast.success('Vote Count Updated');
      refetchPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {alreadyVoted ? (
        <p className="text-dark">You already voted on this post</p>
      ) : (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => handleVote(true)}
            className="btn  bg-lightGreen text-black border-none"
          >
            Agree
          </button>
          <button
            onClick={() => handleVote(false)}
            className="btn bg-lightRed text-black border-none"
          >
            Disagree
          </button>
        </div>
      )}
    </>
  );
};

export default VoteActions;
