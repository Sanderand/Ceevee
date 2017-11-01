import { Pipe, PipeTransform } from '@angular/core';
import {
	differenceInYears,
	differenceInMonths,
	differenceInWeeks,
	differenceInDays,
	differenceInHours,
	differenceInMinutes
} from 'date-fns';

@Pipe({
	name: 'when'
})
export class WhenPipe implements PipeTransform {
	public transform(timestamp: number): string {
		if (!timestamp) {
			return '';
		}

		const now = Date.now();
		const years = Math.abs(differenceInYears(timestamp, now));
		const months = Math.abs(differenceInMonths(timestamp, now));
		const weeks = Math.abs(differenceInWeeks(timestamp, now));
		const days = Math.abs(differenceInDays(timestamp, now));
		const hours = Math.abs(differenceInHours(timestamp, now));
		const minutes  = Math.abs(differenceInMinutes (timestamp, now));

		if (years) {
			return `${ years } ${ this.pluralize('year', years) } ago`;
		} else if (months) {
			return `${ months } ${ this.pluralize('month', months) } ago`;
		} else if (weeks) {
			return `${ weeks } ${ this.pluralize('week', weeks) } ago`;
		} else if (days) {
			return `${ days } ${ this.pluralize('day', days) } ago`;
		} else if (hours) {
			return `${ hours } ${ this.pluralize('hour', months) } ago`;
		} else if (minutes) {
			return `${ minutes } ${ this.pluralize('minute', minutes) } ago`;
		} else {
			return `just now`;
		}
	}

	private pluralize (noun: string, count: number): string {
		return count === 1 ? noun : noun + 's';
	}
}
