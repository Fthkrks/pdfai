import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";

export const ingest = action({
  args: {},
  handler: async (ctx) => {
    await ConvexVectorStore.fromTexts(
      ["Hello world", "Bye bye", "What's this?"],
      [{ prop: 2 }, { prop: 1 }, { prop: 3 }],
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_AI_API_KEY,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});
