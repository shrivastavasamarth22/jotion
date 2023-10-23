"use client";

import { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { IconPicker } from "./icon-picker";
import TextAreaAutoSize from "react-textarea-autosize";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

interface ToolbarProps {
    initialData: Doc<"documents">;
    preview?: boolean;
}

export const Toolbar = ({
    initialData,
    preview
}: ToolbarProps) => {

    const inputRef = useRef<ElementRef<"textarea">>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialData.title)

    const update = useMutation(api.documents.update)

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true)
        setTimeout(() => {
            setValue(initialData.title)
            inputRef.current?.focus()
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onInput = (value: string) => {
        setValue(value)
        update({
            id: initialData._id,
            title: value || "Untitled"
        })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            disableInput()
        }
    }

    return(
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="flex items-center gap-x-2 group/icon pt-6">
                    <IconPicker
                        onChange={() => {}}
                    >
                        <p className="text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={() => {}}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
                        variant="outline"
                        size="icon"
                    >
                        <X 
                            className="h-4 w-4"
                        />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && (
                <p className="text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <IconPicker
                        asChild
                        onChange={() => {}}
                    >
                        <Button 
                            className="text-muted-foreground text-xs"
                            variant='outline'
                            size='sm'
                        >
                            <Smile className="h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button
                        className="text-muted-foreground text-xs"
                        variant='outline'
                        size='sm'
                        onClick={() => {}}
                    >
                        <ImageIcon 
                            className="h-4 w-4 mr-2"
                        />
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <TextAreaAutoSize 
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)}
                    className="text-5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
                />
            ): (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    )
}