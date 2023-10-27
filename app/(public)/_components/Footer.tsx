"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";

interface FooterProps {
    userName?: string;
    date: number;
}

export const Footer = ({ userName, date }: FooterProps) => {
    const router = useRouter();

    const { isAuthenticated } = useConvexAuth();

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

    const onClick = () => {
        if (isAuthenticated) {
            router.push("/documents");
        } else {
            router.push("/");
        }
    }

    return (
        <div className="flex w-full justify-between dark:bg-[#1f1f1f] text-xs text-muted-foreground font-medium pb-4 px-10">
            <div className="flex items-center gap-x-2">
                <Button
                    onClick={onClick}
                    className="text-muted-foreground text-xs"
                    variant="ghost"
                    size="sm"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
            </div>
            <div className="flex flex-col items-end">
                <p className="mb-1.5">
                    By: <span className="font-semibold italic">{userName}</span>
                </p>
                <p>
                    Created at:{" "}
                    <span className="font-semibold italic">
                        {formatDate(creationDate)}
                    </span>
                </p>
            </div>
        </div>
    );
};
