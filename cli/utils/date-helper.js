import {
    getDay, getWeek, getMonth,
    startOfYear, endOfYear, isThisYear as isThisYearFns,
    subHours,
    differenceInDays as differenceInDaysFns
} from 'date-fns';
import { format as formatWithTimezone, utcToZonedTime } from 'date-fns-tz';
import {isFullOfNumbers} from './string-regex.js';

export const DEFAULT_TIMEZONE = 'Europe/Moscow';

const HOURS_FOR_DEFAULT = 3;

export const FULL_DATE_FORMAT     = 'yyyy-MM-dd';
export const FULL_DATETIME_FORMAT = 'yyyy-MM-dd_HH:mm:ss';
export const FULL_DATETIME_FILE_FORMAT = 'yyyy-MM-dd_HH-mm-ss';

export function getStartOfYear() {
    const currentDate = new Date();
    return startOfYear(currentDate);
}
export function getEndOfYear() {
    const currentDate = new Date();
    return endOfYear(currentDate);
}

export function differenceInDays(leftDate, rightDate = null) {
    return differenceInDaysFns(leftDate, rightDate || new Date());
}

export function isCurrentCalendarYearFrom(leftDate, rightDate = null) {
    rightDate = rightDate || new Date();
    return Math.abs(differenceInDaysFns(leftDate, rightDate)) < 365;
}

export function copyTime(fromDate, toDate, isUtc = false) {
    toDate.setHours(isUtc ? fromDate.getUTCHours() : fromDate.getHours());
    toDate.setMinutes(isUtc ? fromDate.getUTCMinutes() : fromDate.getMinutes());
    toDate.setSeconds(isUtc ? fromDate.getUTCSeconds() : fromDate.getSeconds());
    return toDate;
}

export function formatDate(
    date,
    dateFormat = 'dd MMMM yyyy',
    timeZone = DEFAULT_TIMEZONE
) {
    const preparedDate = timeZone ? prepareDate(date) : utcToZonedTime(prepareDate(date), 'UTC');
    timeZone = timeZone || 'UTC';
    return formatWithTimezone(preparedDate, dateFormat, { timeZone });
}

export function toUtcFromMoscow(date) {
    return subHours(prepareDate(date), HOURS_FOR_DEFAULT);
}

export function formatTime(
    date,
    dateFormat = 'HH:mm',
    timeZone = DEFAULT_TIMEZONE
) {
    return formatDate(date, dateFormat, timeZone);
}

export function isThisYear(date) {
    return isThisYearFns(date);
}

export function isThisMonth(date) {
    const currentMonth = getMonth(new Date());
    const compareMonth = getMonth(date);

    return currentMonth === compareMonth && isThisYear(date);
}

export function isThisWeek(date) {
    const mondayIndex = 1;
    const currentWeek = getWeek(new Date(), {weekStartsOn: mondayIndex});
    const compareWeek = getWeek(date, {weekStartsOn: mondayIndex});

    return (currentWeek === compareWeek) && isThisMonth(date) && isThisYear(date);
}

export function isWithinWeek(date) {
    return Math.abs(differenceInDays(date, new Date())) <= 7;
}

export function isToday(date) {
    const currentDay = getDay(new Date());
    const compareDay = getDay(date);

    return currentDay === compareDay;
}

function prepareDate(date) {
    let preparedDate = date;
    if (typeof date === 'string') {
        preparedDate = new Date(isFullOfNumbers(date) ? (+date) : date);
    }

    return preparedDate;
}