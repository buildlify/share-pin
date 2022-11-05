import Post from '../components/post/Post';
import { useGetUsersPosts } from '../hooks/useApiPost';
import useStore from '../hooks/useStore';

const MyPostsPage = () => {
  const { user } = useStore();
  const { data } = useGetUsersPosts(user?.id ?? '');

  return (
    <main className="w-[95%] mx-auto max-w-7xl">
      <h1 className="text-center text-3xl text-black">
        You have {data?.length} post{data?.length === 1 ? '' : 's'}
      </h1>
      <div className="flex justify-center gap-4 flex-wrap">
        {data?.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </main>
  );
};

export default MyPostsPage;
