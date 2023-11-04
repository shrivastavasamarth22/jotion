"use client";

import { MenuIcon, UserIcon } from "lucide-react";

import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";

interface NavbarExploreProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

function capitalizeFirstName(fullName: string) {
    // Split the full name into words
    const words = fullName.split(" ");

    if (words.length > 0) {
        // Extract the first word (first name)
        const firstName = words[0];

        // Capitalize the first letter and make the rest of the word lowercase
        const capitalizedFirstName =
            firstName.charAt(0).toUpperCase() +
            firstName.slice(1).toLowerCase();

        return capitalizedFirstName;
    }
}

const NavbarUser = ({ isCollapsed, onResetWidth }: NavbarExploreProps) => {
    const scrolled = useScrollTop();
    const params = useParams();

    const username = useQuery(api.documents.getUserName, {
        userId: params.userId as string,
    });

    function renderName() {
        if (username === undefined) return <Spinner size="sm" />;

        if (username === null) {
            return (
                <h1 className="text-xl font-semibold">User&apos;s Jotion</h1>
            );
        }

        return (
            <h1 className="text-xl font-semibold">
                {capitalizeFirstName(username)}&apos;s Jotion
            </h1>
        );
    }

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
            <div
                className={cn(
                    "flex justify-center items-center",
                    isCollapsed && "ml-5"
                )}
            >
                <UserIcon className="w-6 h-6 mr-2" />
                {renderName()}
            </div>
        </div>
    );
};

export default NavbarUser;
