"use client"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { useEffect, useState } from 'react'

import { File } from 'lucide-react'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useSearch } from '@/hooks/use-search'
import { useUser } from '@clerk/clerk-react'

export const SearchCommand = () => {
    const { user } = useUser();
    const router = useRouter();
    const documets = useQuery(api.documents.getSearch)
}