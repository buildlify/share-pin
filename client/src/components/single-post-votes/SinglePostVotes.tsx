import { getVotePercent } from '../../utils/get-vote-percent';

type Props = {
  agreeNum: number;
  disagreeNum: number;
};

const SinglePostVotes = ({ agreeNum, disagreeNum }: Props) => {
  const { agreePercent, disagreePercent } = getVotePercent(agreeNum, disagreeNum);
  const totalVotes = agreeNum + disagreeNum;

  return (
    <div className="bg-white py-8 w-full max-w-4xl rounded-b-lg relative">
      <div className=" w-full border-[1px] border-gray-100"></div>
      <p className="text-black text-center mt-4">
        {totalVotes} total vote{totalVotes === 1 ? '' : 's'}
      </p>
      <div className="w-full flex mt-4">
        {agreeNum > 0 && (
          <div className="text-center" style={{ flex: agreePercent }}>
            {agreeNum} for
          </div>
        )}
        {disagreeNum > 0 && (
          <div className="text-center" style={{ flex: disagreePercent }}>
            {disagreeNum} against
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full flex">
        <div
          className={`h-8 rounded-bl-lg bg-lightGreen`}
          style={{ flex: agreePercent }}
        ></div>
        <div
          className={`h-8 rounded-br-lg bg-lightRed`}
          style={{ flex: disagreePercent }}
        ></div>
      </div>
    </div>
  );
};

export default SinglePostVotes;
