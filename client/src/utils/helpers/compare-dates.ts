import dayjs from 'dayjs';

export const sentAtDifferentMinutes = (date1: Date, date2: Date) => dayjs(date1).minute() === dayjs(date2).minute();
