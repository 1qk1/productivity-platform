const colors = [
  "#E04E8D",
  "#FF8080",
  "#C4766D",
  "#E2D84D",
  "#27AE60",
  "#33AAA8",
  "#537EC5",
  "#AA70E0",
  "#63707E"
];

const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

const isValidColor = color => /^#([0-9A-F]{3}){1,2}$/i.test(color);

module.exports = { colors, randomColor, isValidColor };
