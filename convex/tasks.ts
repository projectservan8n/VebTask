import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx: any, { title, description }: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const taskId = await ctx.db.insert("tasks", {
      title,
      description,
      completed: false,
      userId: identity.subject,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return taskId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx: any) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q: any) => q.eq("userId", identity.subject))
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
  handler: async (ctx: any, { id, ...updates }: any) => {
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx: any, { id }: any) => {
    await ctx.db.delete(id);
  },
});