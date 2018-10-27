export const doubleOrNothing = num => (num < 10 ? `0${num}` : num);

export const secondsToTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${doubleOrNothing(minutes)}:${doubleOrNothing(seconds)}`;
};
