"use client";

import { CompassIcon, MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";

interface NavbarExploreProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

const NavbarExplore = ({ isCollapsed, onResetWidth }: NavbarExploreProps) => {
    const scrolled = useScrollTop();

    return (
        <div
            className={cn(
                "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full px-5 py-4",
                scrolled && "border-b shadow-sm"
            )}
        >
            {isCollapsed && (
                <MenuIcon
                    role="button"
                    onClick={onResetWidth}
                    className="w-6 h-6 text-muted-foreground"
                />
            )}
            <div className={cn(
                "flex justify-center items-center",
                isCollapsed && "ml-5"
            )}>
                <CompassIcon className="w-6 h-6 mr-2" />
                <h1 className="text-xl font-semibold">Explore Jotion</h1>
            </div>
        </div>
    );
};

export default NavbarExplore;
