import { TypographyStylesProvider } from '@mantine/core';

type Props = {
  body: string;
};

const SinglePostView = ({ body }: Props) => {
  return (
    <div className="bg-white p-8 w-full max-w-4xl rounded-t-lg">
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </TypographyStylesProvider>
    </div>
  );
};

export default SinglePostView;
