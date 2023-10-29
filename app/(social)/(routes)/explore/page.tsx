"use client";

import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const ExplorePage = () => {
    const documents = useQuery(api.documents.getPublished)

    if (documents === undefined) {
        return (
            <div className="flex min-h-[100%] items-center justify-center">
                <Spinner
                    size="icon"
                />
        </div>
        )
    }

    return (
        <div className="flex flex-col min-h-[100%] px-3 pt-20">
            {documents?.map((document) => (
                <p key={document._id}>
                    {document.title}
                </p>
            ))}
        </div>
    );
};

export default ExplorePage;
