import { defineSchema, defineTable } from 'convex/server';

import { v } from 'convex/values';

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        userId: v.string(),
        userName: v.optional(v.string()),
        isArchived: v.boolean(),
        parentDocument: v.optional(v.id('documents')),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        tags: v.array(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.boolean(),
    })
    .index("by_user", ["userId"])
    .index("by_user_parent", ["userId", "parentDocument"])
    .index("by_tags", ["tags"])
    .index("by_published", ["isPublished"])
})