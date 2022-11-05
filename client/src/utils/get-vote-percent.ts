const getVotePercent = (agree: number, disagree: number) => {
  if (agree === 0 && disagree === 0) return { agreePercent: 0, disagreePercent: 0 };
  const agreePercent = +(agree / (agree + disagree)).toFixed(2);
  const disagreePercent = +(1 - agreePercent).toFixed(2);

  return { agreePercent, disagreePercent };
};

export { getVotePercent };
