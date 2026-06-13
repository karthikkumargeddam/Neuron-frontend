import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { code } = await request.json();

    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate analysis

    // Simple static analysis logic to mock the LLM
    let timeComplexity = "O(1)";
    let spaceComplexity = "O(1)";
    let explanation = "Your code executes in constant time. Great job on efficiency!";

    if (!code) {
      return NextResponse.json({ timeComplexity, spaceComplexity, explanation });
    }

    const lowerCode = code.toLowerCase();
    
    // Check for nested loops
    const loopRegex = /(for|while).*:/g;
    const loops = code.match(loopRegex) || [];
    
    if (loops.length >= 2 && lowerCode.includes('    for') || lowerCode.includes('    while')) {
      timeComplexity = "O(N²)";
      spaceComplexity = "O(N)";
      explanation = "We detected nested loops in your code. While this works for small inputs, it scales quadratically (O(N²)). Consider using a hash map or sorting the array first to reduce time complexity to O(N log N) or O(N).";
    } else if (loops.length === 1) {
      timeComplexity = "O(N)";
      spaceComplexity = "O(1)";
      explanation = "Your code has a single linear scan, which is highly efficient. Time complexity is O(N). Space complexity is optimal at O(1) unless you are storing the results in a new array.";
    } else if (lowerCode.includes('def') && lowerCode.includes('return') && lowerCode.includes(code.split('def ')[1]?.split('(')[0])) {
      timeComplexity = "O(2^N) or O(N)";
      spaceComplexity = "O(N)";
      explanation = "We detected recursion. Be careful with deep recursion as it can lead to a StackOverflow error. Consider using memoization to optimize the overlapping subproblems.";
    }

    return NextResponse.json({ timeComplexity, spaceComplexity, explanation });
  } catch (err) {
    console.error("Code Profiler Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
