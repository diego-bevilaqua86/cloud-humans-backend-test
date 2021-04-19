import { DateTime } from 'luxon';

export function eventTimestamp(eventName: string) {
  return `[ ${ DateTime.utc().toISO() } - ${ eventName } ]`
}
