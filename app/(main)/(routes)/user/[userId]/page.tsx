"use client";

import { useMutation, useQuery } from "convex/react";

import { ArrowLeft } from "lucide-react";
import { Article } from "@/app/(main)/_components/article";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Spinner } from "@/components/spinner";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

interface UserPageProps {
    params: {
        userId: string;
    };
}


const UserPage = ({ params }: UserPageProps) => {

    const documents = useQuery(api.documents.getByUserId, {
        userId: params.userId,
    })
    const router = useRouter();

    const isMobile = useMediaQuery("(max-width: 768px)");

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
                <Button onClick={() => router.back}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                </Button>
            </div>
        );
    };

    if (isMobile) {
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
    }

    return (
        <div className="dark:bg-[#1f1f1f] flex flex-col items-center px-5 min-h-[100%] pt-20 pb-10">
            <div className="grid grid-cols-2 gap-10 w-full">
                {
                    documents.map(doc => (
                        <Article
                            key={doc._id}
                            document={doc}
                        />
                    ))
                }
            </div>
        </div>
    )
};

export default UserPage;
