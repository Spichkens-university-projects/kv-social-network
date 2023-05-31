import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale(ru);
dayjs.extend(relativeTime);

export const getRelativeTime = (date: Date | undefined) =>
	dayjs(date).fromNow();

export const absoluteTime = (date: Date | undefined) =>
	dayjs(date).format('HH:mm');
