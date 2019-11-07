import { isLength, isEmpty, isEmail } from "validator";

export const returnDoubleNumber = num => (num < 10 ? `0${num}` : String(num));

export const secondsToTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${returnDoubleNumber(minutes)}:${returnDoubleNumber(seconds)}`;
};

export const validate = (value, rules) => {
  const errors = [];

  if (rules.required && isEmpty(value)) {
    errors.push("This field is required");
  }

  if (rules.isEmail && !isEmail(value)) {
    errors.push("Please enter a valid email address");
  }

  if (rules.minLength && !isLength(value, rules.minLength)) {
    errors.push(
      `This field should be more than ${rules.minLength} characters long`
    );
  }
  return errors;
};

export const validateBoards = value =>
  !isEmpty(value, { ignore_whitespace: true });
