"use client";

import { ArrowLeft, CompassIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/clerk-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useScrollTop } from "@/hooks/use-scroll-top";

const Navbar = () => {
    const router = useRouter();
    const scrolled = useScrollTop();

    return (
        <div
            className={cn(
                "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4",
                scrolled && "border-b shadow-sm"
            )}
        >
            <div className="md:ml-auto w-full flex items-center justify-between space-x-2">
                <Button variant="ghost" size="sm" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center">
                    <CompassIcon className="w-6 h-6 mr-2" />
                    <h1 className="text-xl font-semibold">Explore Jotion</h1>
                </div>
                <div className="flex items-center gap-x-2">
                    <UserButton />
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
