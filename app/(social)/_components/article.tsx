"use client";

import { Doc } from "@/convex/_generated/dataModel";
import useDate from "@/hooks/use-date";
import { useRouter } from "next/navigation";

interface ArticleProps {
    document: Doc<"documents">;
}

export const Article = ({ document }: ArticleProps) => {
    const router = useRouter();

    const creationDate = new Date(document._creationTime);

    return (
        <div className="w-[90%] flex flex-col justify-between py-4 bg-muted rounded-lg px-5 mb-10">
            <h2 className="text-sm text-muted-foreground">
                By:{" "}
                <span className="font-medium italic">{document.userName}</span>
            </h2>
            <div className="flex flex-col max-w-[70%]">
                <h1
                    role="button"
                    className="text-2xl font-semibold truncate mb-2"
                    onClick={() => router.push(`/preview/${document._id}`)}
                >
                    {document.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 max-w-[80%]">
                    {document.tags.length > 0 &&
                        document.tags.map((tag) => (
                            <div
                                key={tag}
                                className="p-2 border border-muted-foreground text-xs font-medium text-muted-foreground flex items-center justify-center rounded-sm max-w-xs"
                            >
                                <span className="truncate">
                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex flex-col items-end justify-end text-[8px]">
                <p>Created at: </p>
                <span className="font-semibold italic">
                    {useDate(creationDate)}
                </span>
            </div>
        </div>
    );
};
