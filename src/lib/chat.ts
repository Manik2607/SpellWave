import Groq from "groq-sdk";

// Initialize Groq client with API key from environment variables
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface Message {
  role: "user" | "assistant";
  content: string;
}

class Chat {
  private messages: Message[];

  constructor() {
    this.messages = [];
  }

  public async ask(prompt: string): Promise<string> {
    // Add the user message to the chat history
    const userMessage: Message = { role: "user", content: prompt };
    this.messages.push(userMessage);

    // Get the response from Groq
    const response = await this.getChatCompletion(this.messages);
    this.messages.push({ role: "assistant", content: response }); // Store the assistant's response
    return response; // Return the response
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
