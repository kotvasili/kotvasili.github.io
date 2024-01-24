import { DateTime } from 'luxon';

const INPUT_DATE_FORMAT = 'yyyy-MM-dd';
export const isoToDateInput = (date: string) =>
	DateTime.fromISO(date).toFormat(INPUT_DATE_FORMAT);

export const jsDateToIso = (date: Date): string =>
	DateTime.fromJSDate(date).toISO({
		suppressSeconds: true,
		includeOffset: false,
	}) as string;
export const jsDateToInput = (date: Date): string =>
	DateTime.fromJSDate(date).toFormat(INPUT_DATE_FORMAT);
export const dateNowInput = DateTime.now().toFormat(INPUT_DATE_FORMAT);
