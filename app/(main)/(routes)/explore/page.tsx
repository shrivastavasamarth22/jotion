"use client";

import { useMutation, useQuery } from "convex/react";

import { Article } from "../../_components/article";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

const ExplorePage = () => {
    const documents = useQuery(api.documents.getPublished)

    const create = useMutation(api.documents.create);
    const router = useRouter();

    const isMobile = useMediaQuery("(max-width: 768px)");

    const onCreate = () => {
        const promise = create({ title: "Untitled" })
            .then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note.",
        });
    };

    if (documents === undefined) {
        return (
            <div className="flex min-h-[100%] items-center justify-center">
                <Spinner
                    size="icon"
                />
        </div>
        )
    }

    if (documents.length === 0) {
        return (
            <div className="h-full flex flex-col space-y-4">
                <Image
                    src="/empty.png"
                    height="300"
                    width="300"
                    alt="Empty"
                    className="dark:hidden"
                />
                <Image
                    src="/empty-dark.png"
                    height="300"
                    width="300"
                    alt="Empty"
                    className="dark:block hidden"
                />
                <h2 className="text-lg font-medium">
                    No published notes found!
                </h2>
                <Button onClick={onCreate}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create a note
                </Button>
            </div>
        );
    };

    return (
        <div className="dark:bg-[#1f1f1f] flex flex-col items-center px-5 min-h-[100%] pt-20 pb-10">
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
