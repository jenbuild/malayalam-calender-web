export type CalendarDay = {
	date: Date;
	day: number;
	isCurrentMonth: boolean;
};

export function getMonthDays(year: number, month: number): CalendarDay[] {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);

	const startDay = firstDay.getDay();
	const daysInMonth = lastDay.getDate();

	const days: CalendarDay[] = [];

	const today = new Date();

	// Previous month's trailing days
	for (let i = startDay - 1; i >= 0; i--) {
		const date = new Date(year, month, -i);

		days.push({
			date,
			day: date.getDate(),
			isCurrentMonth: false,
		});
	}

	// Current month
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);

		days.push({
			date,
			day,
			isCurrentMonth: true,
		});
	}

	// Next month's leading days
	const remainingDays = (7 - (days.length % 7)) % 7;

	for (let i = 1; i <= remainingDays; i++) {
		const date = new Date(year, month + 1, i);

		days.push({
			date,
			day: date.getDate(),
			isCurrentMonth: false,
		});
	}

	return days;
}

export type CalendarMonth = {
	year: number;
	month: number;
};

export function addMonths(
	year: number,
	month: number,
	amount: number,
): CalendarMonth {
	const date = new Date(year, month + amount, 1);

	return {
		year: date.getFullYear(),
		month: date.getMonth(),
	};
}
