import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostBody from '../components/create-post-body/CreatePostBody';
import CreatePostTitle from '../components/create-post-title/CreatePostTitle';
import { useCreatePost } from '../hooks/useApiPost';
import useStore from '../hooks/useStore';
import { checkForProfanity } from '../utils/check-for-profanity';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const { user } = useStore();

  const { mutate, data } = useCreatePost();

  const createPost = () => {
    const clean = checkForProfanity(title + body);
    if (!clean) return; // todo open modal
    const data = {
      title,
      body,
      userId: user?.id,
    };
    mutate(data);
  };
  if (data) {
    navigate('/posts');
  }
  return (
    <main className="h-screen w-full flex items-center justify-center">
      {step === 1 && (
        <CreatePostTitle
          title={title}
          setTitle={setTitle}
          setBody={setBody}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <CreatePostBody body={body} setBody={setBody} createPost={createPost} />
      )}
    </main>
  );
};

export default CreatePostPage;
