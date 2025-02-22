import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.optional(v.union(v.string(), v.null())), // `null` değerini kabul et
    email: v.string(),
    imageUrl: v.optional(v.union(v.string(), v.null())), // `null` değerini kabul et
  }),
  pdfFiles: defineTable({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
    
  }),
});