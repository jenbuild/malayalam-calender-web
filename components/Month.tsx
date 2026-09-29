import { getMonthDays } from "@/lib/calendar";

type MonthProps = {
    year: number;
    month: number;
};

export default function Month({
    year,
    month,
}: MonthProps) {
    const days = getMonthDays(year, month);

    const today = new Date();

    const isCurrentMonth =
        today.getFullYear() === year &&
        today.getMonth() === month;

    const monthName = new Date(
        year,
        month,
        1
    ).toLocaleString("en-US", {
        month: "long",
    });

    return (
        <section className="mb-10">
            <h2 className={`mb-4 text-xl font-semibold ${isCurrentMonth ? "text-red-500" : "text-black"}`}>
                {monthName} {year}
            </h2>

            <div className="grid grid-cols-7 text-center">
                {/* {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                        <div
                            key={day}
                            className="py-2 text-sm font-medium text-gray-500"
                        >
                            {day}
                        </div>
                    )
                )} */}

                {days.map((day) => {
                    const isToday =
                        day.date.getFullYear() === today.getFullYear() &&
                        day.date.getMonth() === today.getMonth() &&
                        day.date.getDate() === today.getDate();

                    return (
                        <div
                            key={day.date.toISOString()}
                            className={`p-3 ${!day.isCurrentMonth
                                ? "text-white"
                                : isToday ? "text-red-500" : "text-black"
                                }`}
                            onClick={() => { console.log({ day }) }}
                        >
                            {day.day}
                        </div>
                    )
                })}
            </div>
        </section>
    );
}