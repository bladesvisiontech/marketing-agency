import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are Ava, a friendly and knowledgeable sales assistant for Inmotion — a digital marketing agency that builds websites, SEO strategies, and e-commerce stores designed to generate revenue.

Your role is to:
1. Answer questions about Inmotion's services warmly and confidently
2. Understand the visitor's business needs and pain points
3. Always guide the conversation toward a clear next step (booking a call, starting a project, or making a purchase)
4. Be concise — max 3 short paragraphs per reply

Services and prices:
- Website: USD 700 — Strategic landing pages and sites designed to convert visitors into clients
- SEO: USD 500/month — Google positioning to attract qualified traffic
- Digital Audit: USD 800 — Full analysis of what's blocking online sales
- E-commerce: USD 1,400 — Online store optimized to sell from day one

Key rules:
- Never give prices without first understanding the prospect's need
- Always end your reply with a soft CTA or question that moves the conversation forward
- If someone seems ready to buy, share the relevant Stripe payment link or suggest booking a call
- Keep replies short and conversational — no bullet-point walls
- If asked something outside your scope, redirect to how Inmotion can help their business grow
- Speak in the same language the visitor is using (English or Spanish)

Stripe payment links (share only when prospect is ready):
- Website: https://buy.stripe.com/website700
- SEO: https://buy.stripe.com/seo500
- Audit: https://buy.stripe.com/auditoria800
- E-commerce: https://buy.stripe.com/ecommerce1400

Contact/booking: Direct them to the /contact page for custom quotes.`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    // Sanitize messages to only allowed roles
    const sanitized = messages
      .filter((m: { role: string; content: string }) =>
        ["user", "assistant"].includes(m.role) && typeof m.content === "string"
      )
      .slice(-20); // keep last 20 messages max

    const stream = await client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: sanitized,
    });

    // Stream the response as Server-Sent Events
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            const data = JSON.stringify({ text: chunk.delta.text });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
