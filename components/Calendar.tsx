"use client";

import {
    addMonths,
    CalendarMonth,
} from "@/lib/calendar";
import { useEffect, useRef, useState } from "react";
import Month from "./Month";

const INITIAL_MONTHS = 5;

function getInitialMonths(): CalendarMonth[] {
    const today = new Date();

    const months: CalendarMonth[] = [];

    // Start 2 months before current month
    for (let i = -2; i < INITIAL_MONTHS - 2; i++) {
        months.push(
            addMonths(
                today.getFullYear(),
                today.getMonth(),
                i
            )
        );
    }

    return months;
}

export default function Calendar() {
    const [months, setMonths] =
        useState<CalendarMonth[]>(getInitialMonths);

    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const currentMonthRef = useRef<HTMLDivElement>(null);

    // Add months to the bottom
    const loadMoreBottom = () => {
        setMonths((current) => {
            const last = current[current.length - 1];

            const newMonths = [
                ...current,
                addMonths(last.year, last.month, 1),
                addMonths(last.year, last.month, 2),
                addMonths(last.year, last.month, 3),
            ];

            return newMonths;
        });
    };

    // Add months to the top
    const loadMoreTop = () => {
        setMonths((current) => {
            const first = current[0];

            const newMonths = [
                addMonths(first.year, first.month, -3),
                addMonths(first.year, first.month, -2),
                addMonths(first.year, first.month, -1),
                ...current,
            ];

            return newMonths;
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    if (entry.target === bottomRef.current) {
                        loadMoreBottom();
                    }

                    if (entry.target === topRef.current) {
                        loadMoreTop();
                    }
                });
            },
            {
                rootMargin: "500px",
            }
        );

        if (topRef.current) {
            observer.observe(topRef.current);
        }

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        currentMonthRef.current?.scrollIntoView({
            behavior: "instant",
            block: "center",
        });
    }, []);

    return (
        <main className="mx-auto max-w-2xl px-4 py-8">
            <div ref={topRef} />

            {months.map((month) => {
                const today = new Date();

                const isCurrentMonth =
                    today.getFullYear() === month.year &&
                    today.getMonth() === month.month;

                return (
                    <div
                        key={`${month.year}-${month.month}`}
                        ref={isCurrentMonth ? currentMonthRef : undefined} >
                        <Month
                            key={`${month.year}-${month.month}`}
                            year={month.year}
                            month={month.month}
                        />
                    </div>
                )
            })}

            <div ref={bottomRef} />
        </main>
    );
}