"use client";

interface FooterProps {
    userName?: string;
    date?: number;
}

export const Footer = ({
    userName,
    date
}: FooterProps) => {
    return (
        <div className="flex flex-col w-full items-end dark:bg-[#1f1f1f] pr-40">
            <p className="text-sm text-muted-foreground font-medium">
                By: <span className="font-semibold italic">Samarth Shrivastava</span>
            </p>
            <p className="text-sm text-muted-foreground font-medium">
                Created at: 2021-10-10
            </p>
        </div>
    )
}