import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const { title, description, userId } = args as any;
    const taskId = await ctx.db.insert("tasks", {
      title,
      description,
      completed: false,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return taskId;
  },
});

export const list = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args as any;
    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q: any) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args as any;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const { id } = args as any;
    await ctx.db.delete(id);
  },
});