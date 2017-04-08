export const restrictRange = (value: number, min: number, max: number): number => {
  if (value > max) value = max;
  if (value < min) value = min;
	return value;
}
