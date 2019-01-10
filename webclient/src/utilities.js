export const returnDoubleNumber = num => (num < 10 ? `0${num}` : String(num));

export const secondsToTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${returnDoubleNumber(minutes)}:${returnDoubleNumber(seconds)}`;
};
