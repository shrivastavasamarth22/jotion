"use client";

import { ElementRef, useRef, useState } from "react";
import { ImageIcon, PlusIcon, Smile, X } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@radix-ui/react-popover";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import TagBox from "@/app/(main)/_components/tag-box";
import TextAreaAutoSize from "react-textarea-autosize";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);
    const removeTag = useMutation(api.documents.removeTag);

    const coverImage = useCoverImage();

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const onInput = (value: string) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || "Untitled",
        });
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id,
        });
    };

    const onRemoveTag = (tag: string) => {
        const promise = removeTag({
            id: initialData._id,
            tag
        })

        toast.promise(promise, {
            loading: "Removing tag...",
            success: "Tag removed!",
            error: "Failed to remove tag"
        });
    }

    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant="outline"
                        size="icon"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">{initialData.icon}</p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button
                            className="text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                        onClick={coverImage.onOpen}
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add cover
                    </Button>
                )}
                {!preview && initialData.tags.length < 5 && (
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                className="text-muted-foreground text-xs"
                                variant="outline"
                                size="sm"
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Tags
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="p-0 lg:w-72 md:w-64"
                            side="right"
                            sideOffset={8}
                        >
                            <TagBox documentId={initialData._id} />
                        </PopoverContent>
                    </Popover>
                )}
            </div>
            {isEditing && !preview ? (
                <TextAreaAutoSize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)}
                    className="text-5xl md:pr-[15px] bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] md:pr-[15px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
                >
                    {initialData.title}
                </div>
            )}
            <div className="flex items-center gap-x-2">
                {!preview
                    ? initialData.tags.map((tag) => (
                          <div
                              key={tag}
                              className="p-2 border text-sm font-medium text-muted-foreground flex items-center justify-center rounded-sm"
                          >
                              <span className="truncate">{tag}</span>
                              <X className="ml-2 h-4 w-4" role="button" onClick={() => onRemoveTag(tag)} />
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};
