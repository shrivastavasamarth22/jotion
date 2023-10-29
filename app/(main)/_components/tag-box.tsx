"use client";

import { PlusIcon, Search } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";

interface TagBoxProps {
    documentId: Id<"documents">
}

const TagBox = ({
    documentId
}: TagBoxProps) => {
    const router = useRouter();
    const params = useParams();
    const addTag = useMutation(api.documents.addTag);
    const documents = useQuery(api.documents.getTrash);

    const [tag, setTag] = useState("");

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === "Tab") {
            event.stopPropagation();
            event.preventDefault();
            const promise = addTag({
                id: documentId,
                tag
            });
            
            toast.promise(promise, {
                loading: "Adding tag...",
                success: "Tag added!",
                error: "Failed to add tag"
            });
        }
    }

    return (
        <div className="text-sm bg-popover rounded-md pt-1 border">
            <div className="p-2">
                <Input
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Press enter or tab to add tag"
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>
    );
};

export default TagBox;
