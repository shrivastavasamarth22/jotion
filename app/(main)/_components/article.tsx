"use client";

import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

interface ArticleProps {
    document: Doc<"documents">;
}

export const Article = ({ document }: ArticleProps) => {
    const router = useRouter();

    const creationDate = new Date(document._creationTime);

    const isMobile = useMediaQuery("(max-width: 768px)");

    const useDate = (date: Date) => {
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

    return (
        <div
            className={cn(
                "w-full flex justify-between bg-gray-50 dark:bg-muted rounded-lg px-5 shadow-md",
                document.tags.length > 0 ? "py-4" : "h-28 py-4",
                isMobile && "mb-10"
            )}
        >
            <div className="flex flex-col w-[60%] justify-center">
                <h2 className="text-xs text-muted-foreground mb-0.5">
                    By:{" "}
                    <Link
                        href={`/user/${document.userId}`}
                    >
                        <span className="font-semibold italic truncate">
                            {document.userName
                                ? document.userName
                                : "Jotion User"}
                        </span>
                    </Link>
                </h2>
                <h1
                    role="button"
                    className="text-2xl font-semibold truncate"
                    onClick={() => router.push(`/preview/${document._id}`)}
                >
                    {document.title}
                </h1>
                {document.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 mt-2">
                        {document.tags.length > 0 &&
                            document.tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="p-1 border border-muted-foreground text-xs font-medium text-muted-foreground flex items-center justify-center rounded-sm max-w-xs"
                                >
                                    <span className="truncate">
                                        {tag.charAt(0).toUpperCase() +
                                            tag.slice(1)}
                                    </span>
                                </div>
                            ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-between items-end">
                {!!document.icon ? (
                    <p className="text-2xl">{document.icon}</p>
                ) : (
                    <>
                        <Image
                            src="/logo.svg"
                            height="20"
                            width="20"
                            alt="Empty"
                            className="dark:hidden"
                        />
                        <Image
                            src="/logo-dark.svg"
                            height="20"
                            width="20"
                            alt="Empty"
                            className="dark:block hidden"
                        />
                    </>
                )}
                <div className="flex flex-col items-end justify-end text-[9px]">
                    <p>Created at:</p>
                    <span className="font-semibold italic">
                        {useDate(creationDate)}
                    </span>
                </div>
            </div>
        </div>
    );
};

Article.Skeleton = function ArticleSkeleton () {
    return (
        <Skeleton className="w-full h-28" />
    )
}
