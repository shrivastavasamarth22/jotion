"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import useDate from "@/hooks/use-date";
import { useRouter } from "next/navigation";

interface FooterProps {
    userName?: string;
    date: number;
}

export const Footer = ({ userName, date }: FooterProps) => {
    const router = useRouter();

    const { isAuthenticated } = useConvexAuth();

    const creationDate = new Date(date);

    const onClick = () => {
        if (isAuthenticated) {
            router.back();
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
                        {useDate(creationDate)}
                    </span>
                </p>
            </div>
        </div>
    );
};
