import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: { 
    email: v.string(),
    userName: v.optional(v.union(v.string(), v.null())), // `null` destekleniyor
    imageUrl: v.optional(v.union(v.string(), v.null())), // `null` destekleniyor
  },
  handler: async (ctx, args) => {
    // Kullanıcı zaten var mı kontrol et
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user.length === 0) {
      // Veritabanına ekle (undefined olanlar null olarak kaydedilecek)
      await ctx.db.insert("users", {
        email: args.email,
        userName: args.userName,  // undefined olarak kaydedilecek
        imageUrl: args.imageUrl,  // undefined olarak kaydedilecek
      });

      return "Inserted New User ....";
    }

    return "User Already Exists";
  },
});
