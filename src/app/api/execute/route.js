import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { language, code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    // Map language identifiers to Piston equivalents if needed
    let pistonLang = language;
    if (language === 'cpp') pistonLang = 'c++';

    // Call Piston API for secure remote code execution
    const pistonRes = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: pistonLang,
        version: '*',
        files: [{ content: code }]
      })
    });

    if (!pistonRes.ok) {
      const errorText = await pistonRes.text();
      return NextResponse.json({ error: `Execution engine error: ${errorText}` }, { status: 500 });
    }

    const data = await pistonRes.json();
    
    // Check if compilation failed
    if (data.compile && data.compile.code !== 0) {
      return NextResponse.json({ output: '', error: data.compile.stderr || data.compile.output });
    }

    // Return runtime output
    if (data.run) {
      return NextResponse.json({ output: data.run.stdout || '', error: data.run.stderr || '' });
    }

    return NextResponse.json({ error: "Unknown execution error" }, { status: 500 });

  } catch (err) {
    console.error("Execution error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
