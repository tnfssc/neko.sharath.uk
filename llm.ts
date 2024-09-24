import { ChatZhipuAI } from "@langchain/community/chat_models/zhipuai";

export const llm = new ChatZhipuAI({
  model: Deno.env.get("OPENAI_MODEL"),
  zhipuAIApiKey: Deno.env.get("OPENAI_API_KEY"),
  streaming: true,
});
