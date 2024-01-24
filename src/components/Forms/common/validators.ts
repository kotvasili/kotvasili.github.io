import { DateTime } from 'luxon';

export const validateDoB = (date: Date) => {
	const now = DateTime.now();
	const parsed = DateTime.fromJSDate(date);

	if (!parsed.isValid || parsed.year <= 1900) {
		return 'Invaid date';
	}
	if (now.minus({ year: 18 }).startOf('day') <= parsed.startOf('day')) {
		return 'You should be at least 18 to use this app';
	}
	return true;
};
