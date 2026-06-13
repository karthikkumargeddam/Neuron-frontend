import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { code, answer } = await request.json();

    // Mock realistic interview responses
    await new Promise(resolve => setTimeout(resolve, 1200)); 

    let reply = "";

    if (!answer) {
      // First question based on code context
      if (code && code.toLowerCase().includes('for')) {
        reply = "I see you used a for loop in your code. Can you explain the time complexity of your approach, and whether there's a more efficient way to structure it?";
      } else if (code && code.toLowerCase().includes('quantum')) {
        reply = "Looking at your quantum simulation, could you explain the significance of the Hadamard gate you applied to the initial qubit state?";
      } else {
        reply = "I've reviewed your code. Can you walk me through your overall logic and explain the main bottleneck in your current implementation?";
      }
    } else {
      // Follow-up based on user answer
      const a = answer.toLowerCase();
      if (a.includes('o(n)') || a.includes('linear')) {
        reply = "That's correct, linear time complexity is solid here. But what if we needed to run this across a massive distributed dataset? How would you modify your approach?";
      } else if (a.includes('superposition')) {
        reply = "Exactly, superposition allows the qubit to exist in multiple states. Follow up question: how does entanglement play a role in scaling this simulation?";
      } else {
        reply = "Interesting perspective. In a real-world technical interview, I'd want you to dive deeper into memory constraints. Can you think of any edge cases where your code might crash with a large input?";
      }
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Mock Interview Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
