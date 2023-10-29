"use client";

import { Article } from "../../_components/article";
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

    if (documents === null) return null;

    return (
        <div className="dark:bg-[#1f1f1f] flex flex-col items-center min-h-[100%] pt-20 pb-10">
            {
                documents.map(doc => (
                   <Article
                        key={doc._id}
                        document={doc}
                   />
                ))
            }
        </div>
    );
};

export default ExplorePage;
