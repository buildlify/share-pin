import { Dispatch, SetStateAction } from 'react';

type Props = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setBody: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
};

const CreatePostTitle = ({ title, setTitle, setBody, setStep }: Props) => {
  const isTitle = title === '' ? true : false;

  const handleNext = () => {
    setBody(`<h1>${title}</h1>`);
    setStep(2);
  };

  return (
    <div className="w-full max-w-lg">
      <h1 className="text-dark text-2xl">What are you arguing?</h1>
      <input
        type="text"
        placeholder="..."
        onChange={(e) => setTitle(e.target.value)}
        className="input bg-white w-full"
      />
      <button
        disabled={isTitle}
        onClick={handleNext}
        className="btn bg-primary mt-2"
      >
        Next
      </button>
    </div>
  );
};

export default CreatePostTitle;
