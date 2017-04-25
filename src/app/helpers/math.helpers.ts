export const restrictRange = (value: number, min: number, max: number): number => {
  if (value > max) {
    value = max;
  };

  if (value < min) {
    value = min;
  };

  return value;
};

export const generateUUID = (): string => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}