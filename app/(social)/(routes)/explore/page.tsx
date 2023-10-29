"use client";

import { ArrowLeft, CompassIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ExplorePage = () => {
    const router = useRouter();

    return (
        <>
            <nav className="bg-background dark:bg-[#1f1f1f] p-3 w-full flex items-center  gap-x-2">
                
                <div className="flex items-center">
                    <Button
                        className="text-sm"
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center">
                    <CompassIcon className="h-6 w-6 mr-2" />
                    <h1 className="text-2xl font-semibold">Explore Jotion</h1>
                </div>
            </nav>

            <div className="flex flex-col min-h-[100%] px-3"></div>
        </>
    );
};

export default ExplorePage;
