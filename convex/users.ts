import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx: any, { clerkId, email, name }: any) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
      .first();
    
    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      clerkId,
      email,
      name,
      createdAt: Date.now(),
    });
    return userId;
  },
});

export const getUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx: any, { clerkId }: any) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
      .first();
  },
});