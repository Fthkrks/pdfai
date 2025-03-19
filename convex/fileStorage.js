import { mutation, query } from "./_generated/server";
import { v } from "convex/values"; // Convex'in tip tanımlamalarını kullanmak için

// Dosya yükleme URL'si oluşturma fonksiyonu
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Dosya bilgilerini veritabanına ekleme fonksiyonu
export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(), // Dosya kimliği (manuel olarak oluşturulacak)
    storageId: v.string(), // Dosyanın storage'daki ID'si
    fileName: v.string(), // Dosya adı
    fileUrl: v.string(), // Dosya URL'si
    createdBy: v.string(), // Dosyayı oluşturan kullanıcı
  },
  handler: async (ctx, args) => {
    // Veritabanına yeni bir dosya kaydı ekle
    const result = await ctx.db.insert("pdfFiles", {
      fileId: args.fileId, // Manuel olarak oluşturulan fileId
      storageId: args.storageId,
      fileName: args.fileName,
      fileUrl: args.fileUrl,
      createdBy: args.createdBy,
    });

    return result; // Convex'in oluşturduğu _id'yi döndür
  },
});

// Dosya URL'sini alma fonksiyonu
export const getFileUrl = query({
  args: {
    storageId: v.string(), // Dosyanın storage'daki ID'si
  },
  handler: async (ctx, args) => {
    // Dosya URL'sini al
    const fileUrl = await ctx.storage.getUrl(args.storageId);

    if (!fileUrl) {
      throw new Error("Dosya bulunamadı");
    }

    return fileUrl; // Dosya URL'sini döndür
  },
});

export const GetFileRecord = query({
  args:{
    fileId: v.string()
  },
  handler:async(ctx,args)=>{
    const result = await ctx.db.query("pdfFiles").filter((q) => q.eq(q.field("fileId"), args.fileId)).collect();
    console.log(result);
    
    return result[0];
  }
})