import { Dispatch, SetStateAction } from 'react';

import { RichTextEditor } from '@mantine/rte';

type Props = {
  body: string;
  setBody: Dispatch<SetStateAction<string>>;
  createPost: () => void;
};

const CreatePostBody = ({ body, setBody, createPost }: Props) => {
  return (
    <div className="card p-4 w-full bg-white overflow-scroll">
      <RichTextEditor
        className="w-full h-full max-w-4xl mx-auto"
        value={body}
        onChange={setBody}
        controls={[
          ['bold', 'italic', 'strike', 'underline'],
          ['h1', 'h2', 'h3', 'h4'],
          ['orderedList', 'unorderedList', 'blockquote', 'code', 'link'],
          ['sup', 'sub'],
          ['alignLeft', 'alignCenter', 'alignRight'],
          ['clean'],
        ]}
        id="rte"
      />

      <button onClick={createPost} className="btn bg-primary w-fit mx-auto mt-4">
        Create
      </button>
    </div>
  );
};

export default CreatePostBody;
