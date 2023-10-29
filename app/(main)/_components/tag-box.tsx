"use client";

import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";

import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface TagBoxProps {
    documentId: Id<"documents">
}

const TagBox = ({
    documentId
}: TagBoxProps) => {
    const addTag = useMutation(api.documents.addTag);
    const [tag, setTag] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === "Tab") {
            event.stopPropagation();
            event.preventDefault();
            const promise = addTag({
                id: documentId,
                tag: tag.toLowerCase()
            });
            
            toast.promise(promise, {
                loading: "Adding tag...",
                success: "Tag added!",
                error: "Failed to add tag"
            });

            setTag("");

            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }

    return (
        <div className="text-sm bg-popover rounded-md border">
            <div className="p-2">
                <Input
                    ref={inputRef}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                    placeholder="Enter or tab to add tag"
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>
    );
};

export default TagBox;