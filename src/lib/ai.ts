import Groq from "groq-sdk";

// this is not safe but i am lazy...
const groq = new Groq({ apiKey: "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",dangerouslyAllowBrowser: true });

interface Message {
  role: "user" | "assistant";
  content: string;
}

class Chat {
  public async ask(prompt: string): Promise<string> {
    const response = await this.getChatCompletion([{ role: "user", content: prompt }]);
    return response;
  }
  private async getChatCompletion(chatMessages: Message[]): Promise<string> {
    const chatCompletion = await groq.chat.completions.create({
      messages: chatMessages,
      model: "llama3-8b-8192",
    });

    return chatCompletion.choices[0]?.message?.content || "";
  }
}

// Export an instance of Chat for use
const chatInstance = new Chat();
export const ask = async (prompt: string): Promise<string> => {
  return await chatInstance.ask(prompt);
};
