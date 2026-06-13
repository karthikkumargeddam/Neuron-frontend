import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { code, language, error, question } = await request.json();

    // In a production environment with an API key, you would call OpenAI here:
    /*
    import OpenAI from 'openai';
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are an expert programming tutor.' }, ...],
      model: 'gpt-4-turbo',
    });
    return NextResponse.json({ reply: completion.choices[0].message.content });
    */

    // For demonstration, we provide highly realistic mocked responses based on context.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency

    let reply = "";

    if (error) {
      reply = `I noticed you're encountering an error in your ${language} code:\n\n\`\`\`\n${error}\n\`\`\`\n\nThis usually means there is a syntax issue or an undefined variable nearby. Could you check the line where the error occurred? Remember that in ${language}, strict typing or missing semicolons can often trigger this.`;
    } else if (question) {
      const q = question.toLowerCase();
      if (q.includes("loop") || q.includes("for") || q.includes("while")) {
        reply = `Loops are essential for iteration! In ${language}, you can use a \`for\` loop to iterate over arrays, or a \`while\` loop if you're waiting for a specific condition to become false. Would you like an example?`;
      } else if (q.includes("function") || q.includes("def")) {
        reply = `Functions help keep your code modular. In ${language}, you declare a function to encapsulate reusable logic. Make sure to return a value if you need to use the result elsewhere!`;
      } else {
        reply = `That's a great question about ${language}! Based on your current code snippet, I'd recommend reviewing the official documentation or breaking the problem down into smaller, testable chunks. What specific part is confusing you?`;
      }
    } else {
      reply = `Hello! I'm your NeuronLabs AI Tutor. I'm currently analyzing your ${language} code. How can I help you today?`;
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("AI Tutor Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
