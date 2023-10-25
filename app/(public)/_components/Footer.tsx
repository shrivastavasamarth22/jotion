"use client";

interface FooterProps {
    userName?: string;
    date: number;
}

export const Footer = ({ userName, date }: FooterProps) => {
    const creationDate = new Date(date);

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        const hours = String(date.getHours() % 12).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = date.getHours() >= 12 ? "PM" : "AM";

        const dayStr =
            day +
            (day === 1 || day === 21 || day === 31
                ? "st"
                : day === 2 || day === 22
                ? "nd"
                : day === 3 || day === 23
                ? "rd"
                : "th");

        return `${dayStr} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    };

    return (
        <div className="flex flex-col w-full h-[100%] items-end dark:bg-[#1f1f1f] pr-10 text-xs text-muted-foreground font-medium pb-4">
            <p className="mb-1.5">
                By: <span className="font-semibold italic">{userName}</span>
            </p>
            <p>Created at: <span className="font-semibold italic">{formatDate(creationDate)}</span></p>
        </div>
    );
};
