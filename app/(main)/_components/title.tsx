"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";

interface TitleProps {
    initialData: Doc<"documents">;
}

export const Title = ({ initialData }: TitleProps) => {
    const update = useMutation(api.documents.update);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <Input className="h-7 px-2 focus-visible:ring-transparent" />
            ) : (
                <Button
                    onClick={() => {}}
                    variant={"ghost"}
                    size="sm"
                    className="font-normal h-auto p-1"
                >
                    <span className="truncate">{initialData.title}</span>
                </Button>
            )}
        </div>
    );
};
