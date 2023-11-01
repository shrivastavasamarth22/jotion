"use client";

import Navbar  from "./_components/Navbar";
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { useConvexAuth } from "convex/react";

const SocialLayout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size={"lg"} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return redirect("/");
    }

    return (
        <div className="h-full dark:bg-[#1f1f1f]">
            <Navbar />
            {children}
        </div>
    );
};

export default SocialLayout;
