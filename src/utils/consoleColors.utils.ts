const reqguralText = {
  RED: '\x1b[31m%s\x1b[0m',
  GREEN: '\x1b[32m%s\x1b[0m',
};

const boldText = {
  RED: '\x1b[1;31m%s\x1b[0m',
  GREEN: '\x1b[1;32m%s\x1b[0m',
};

const consoleLogColors = {
  reguralText: { ...reqguralText },
  boldText: { ...boldText },
};

export default consoleLogColors;
